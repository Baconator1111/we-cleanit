module.exports = {
    getCommercialRequests: (req, res) => {
        const db = req.app.get('db')

        db.get_commercial_requests()
            .then(requests => res.status(200).send(requests))
    },
    getAppointments: (req, res) => {
        const db = req.app.get('db')

        db.get_appointments()
            .then(appointments => res.status(200).send(appointments))
    },
    getOpenTimes: (req, res) => {
        const db = req.app.get('db')

        db.get_open_times()
            .then(openTimes => res.status(200).send(openTimes))
    }
}