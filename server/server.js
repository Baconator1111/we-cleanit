require('dotenv').config()

const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    Auth0Stragety = require('passport-auth0'),
    massive = require('massive'),
    socket = require('socket.io'),
    http = require('http'),
    bodyparser = require('body-parser'),
    initializeCtrl = require('./controllers/initializeCtrl'),
    servicesCtrl = require('./controllers/servicesCtrl'),
    app = express(),
    { SERVER_PORT, SESSION_SECRET, DOMAIN, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, DB_CONNECTION, LOGIN, LOGOUT } = process.env

app.use(express.static(`${__dirname}/../build`))

app.use(bodyparser.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

massive(DB_CONNECTION).then(db => app.set('db', db))

passport.use(new Auth0Stragety({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extreParams, profile, done) {
    const db = app.get('db'),
        { sub, name, picture } = profile._json

    db.find_user(sub)
        .then(resp => {
            if (resp[0]) {
                done(null, resp[0].user_id)
            } else {
                done(null, null)
            }
        })
}))

passport.serializeUser((id, done) => done(null, id))
passport.deserializeUser((id, done) => {
    const db = app.get('db')
    db.find_logged_in_user(id)
        .then(resp => done(null, resp[0]))
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', (req, res, next) => {
    const authCB = passport.authenticate('auth0', {
        successRedirect: LOGIN
    })
    authCB(req, res, next)
})

app.get('/auth/me', (req, res) => {
    if (!req.user) {
        res.status(404).send('User no longer Logged in')
    } else {
        res.status(200).send(req.user)
    }
})

app.get('/logout', (req, res) => {
    req.logOut()
    res.redirect(LOGOUT)
})

// api requests

app.get('/api/commercial', initializeCtrl.getCommercialRequests)
app.get('/api/appointments', initializeCtrl.getAppointments)
app.get('/api/open-times', initializeCtrl.getOpenTimes)

app.get('/api/allServices', servicesCtrl.getServices)

app.put('/api/admin/services/carpetPrice', servicesCtrl.updateCarpetPrice)
app.put('/api/admin/services/groutPrice', servicesCtrl.updateGroutPrice)
app.put('/api/admin/services/floorTime', servicesCtrl.updateTTC)

app.post('/api/admin/services/upholstery', servicesCtrl.addUpholstery)
app.put('/api/admin/services/upholstery', servicesCtrl.updateUpholstery)
app.delete('/api/admin/services/upholstery/:upholstery_id', servicesCtrl.deleteUpholstery)

app.post('/api/admin/services/extras', servicesCtrl.addExtraServices)
app.delete('/api/admin/services/extras/:extra_id', servicesCtrl.deleteExtraServices)

app.post('/api/admin/services/promotion', servicesCtrl.addPromotion)

// Socket connections
let connections = []
let users = []
const server = http.createServer(app),
    io = socket(server)

io.on('connection', function (socket) {
    connections.push(socket)
    console.log(`${socket.id} connected: ${connections.length} active connections.`)

    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1);
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == socket.id) {
                users.splice(i, 1);
                break;
            }
        }
        console.log(`Connection disconnected: ${connections.length} active connections.`)
        socket.emit('update users', { users: users });
        if (!connections.length) {
            messages = [];
        }
    })
    // on 'appointment' inserts appointment record, deletes the used time slots (takes in the appointment peramiters and an aaray of the slot ids) and then sends current: open slots and appointments

    socket.on('make appointment', async function (data) {
        const db = app.get('db'),
            { client_name,
                client_address,
                residential_sqft_carpet,
                residential_sqft_grout,
                residential_upholstery,
                residential_extras,
                start_time,
                end_time,
                clean_time,
                timesToDelete } = data
        const appointments = await db.create_appointment([client_name,
            client_address,
            residential_sqft_carpet,
            residential_sqft_grout,
            residential_upholstery,
            residential_extras,
            start_time,
            end_time,
            clean_time])

        await socket.emit('get appointments', appointments)
        for (let i = 0; i < timesToDelete.length; i++) {
            await db.delete_open_times(timesToDelete[i])
        }
        const times = await db.get_open_times()
        await socket.emit('get open times', times)

    })

    socket.on('make commercial request', async function (data) {
        const db = app.get('db'),
            { company_name,
                company_address,
                company_sqft_carpet,
                company_sqft_grout,
                company_upholstery,
                company_extras,
                frequency } = data
        const commercialRequest = await db.create_commercial_request([company_name,
            company_address,
            company_sqft_carpet,
            company_sqft_grout,
            company_upholstery,
            company_extras,
            start_time,
            frequency])

        await socket.emit('get commercial request', commercialRequest)

    })

    // on 'open slots' inserts open slots record and sends current: open slots and appointments

    socket.on('open slots', async function (data) {
        const db = app.get('db'),
            { updateType } = data

        //logic to seperate the times into 2 hour intervals dates come as "year-mo-dy"
        /* loop over date adding one to the day of the date each time until 31 then set to one and up the month number until 12 then set to one
            each loop creates a start and end date of 1 hour each 
    
            ex input {
                startDate: "2018-04-23",
                endDate: "2018-04-25",
                startTime: "14:00",
                endTime: "18:00"
            }
    
            ex output [
                {start: "Wed Apr 23 2018 14:00:00 GMT-0700 (PDT)", end: "Wed Apr 23 2018 15:00:00 GMT-0700 (PDT)"},
                {start: "Wed Apr 23 2018 15:00:00 GMT-0700 (PDT)", end: "Wed Apr 23 2018 16:00:00 GMT-0700 (PDT)"},
                {start: "Wed Apr 23 2018 16:00:00 GMT-0700 (PDT)", end: "Wed Apr 23 2018 17:00:00 GMT-0700 (PDT)"},
                {start: "Wed Apr 23 2018 17:00:00 GMT-0700 (PDT)", end: "Wed Apr 23 2018 18:00:00 GMT-0700 (PDT)"},
            ]
        */

        if (updateType == 'add') {
            const { startDate, endDate, startTime, endTime } = data
            let openTimes = []
            let startDateArr = startDate.split('-')
            let endDateArr = endDate.split('-')
            let startTimeArr = startTime.split(':')
            let startTimePlaceHolderArr = startTime.split(':')
            let endTimeArr = endTime.split(':')
            let days = +endDateArr[2] - +startDateArr[2] + 1
            for (let i = 0; i < days; i++) {
                while (startTimeArr[0] != endTimeArr[0]) {
                    openTimes.push({
                        open_start_time: new Date(startDateArr[0], +startDateArr[1] - 1, startDateArr[2], +startTimeArr[0], startTimeArr[1]),
                        open_end_time: new Date(startDateArr[0], +startDateArr[1] - 1, startDateArr[2], +startTimeArr[0] + 1, startTimeArr[1])
                    })
                    startTimeArr[0]++
                }
                startTimeArr[0] = startTimePlaceHolderArr[0]
                startDateArr[2]++
            }

            for (let i = 0; i < openTimes.length; i++) {
                await db.create_open_times([openTimes[i].open_start_time, openTimes[i].open_end_time])
            }
        } else if (updateType == 'remove') {
            const { timeId } = data
            await db.delete_open_times(timeId)
        }

        db.get_open_times()
            .then( times => socket.emit('get open times', times))

    })

})

server.listen(SERVER_PORT, () => console.log(`Server listing to port ${SERVER_PORT}`))