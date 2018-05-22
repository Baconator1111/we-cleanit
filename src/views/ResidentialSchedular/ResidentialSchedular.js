import React, { Component } from 'react'
import { socketConnect } from 'socket.io-react'
import { connect } from 'react-redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import { clearState } from '../../ducks/reducer'

import './residentialSchedular.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

class ResidentialSchedular extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            timeToClean: 0,
            appointmentDate: '',
            startTime: '',
            available: null,
            appointmentStartTime: '',
            appointmentEndTime: '',
            appointmentTimeSlots: []
        }
    }

    componentDidMount() {

        // Go get the current open time slots
        this.handleSockets()

        // setting appointment time
        let timeToClean = Math.ceil(this.props.state.timeToClean / 60)
        this.setState({ timeToClean: timeToClean })
    }

    handleSockets() {
        const { socket } = this.props
        const updateType = 0

        // Sets socket listening for time changes
        socket.on('get open times', data => {
            let newData = []
            data.forEach(time => {

                let startTime = time.open_start_time.split('')
                let year = +startTime.slice(0, 4).join('')
                let month = +startTime.slice(5, 7).join('') - 1
                let day = +startTime.slice(8, 10).join('')
                startTime = +startTime.slice(11, 13).join('')

                // console.log(year, month, day, startTime)

                //making title hours for both starting and ending times for calendar label

                let startTimeLabel
                if (startTime < 12) {
                    startTimeLabel = `${startTime} am`
                } else if (startTime === 12) {
                    startTimeLabel = `${startTime} noon`
                } else {
                    startTimeLabel = `${startTime - 12} pm`
                }

                let endTime = time.open_end_time.split('')
                endTime = +endTime.slice(11, 13).join('')

                let endTimeLabel
                if (endTime < 12) {
                    endTimeLabel = `${endTime} am`
                } else if (endTime === 12) {
                    endTimeLabel = `${endTime} noon`
                } else {
                    endTimeLabel = `${endTime - 12} pm`
                }

                // console.log('static date:',new Date(2018, 4, 7, 10))
                // console.log(new Date(+year, +month, +day, +startTime), +year, +month, +day, startTime )
                // making obejects for calander
                newData.push({
                    id: time.time_id,
                    title: `${startTimeLabel} to ${endTimeLabel}`,
                    start: new Date(year, month, day, startTime, 0),
                    end: new Date(year, month, day, endTime, 0),
                })
            })
            this.setState({ 
                events: newData 
            })
        })

        // Tells socket to run
        socket.emit('open slots', updateType)
    }

    handleInput(key, input) {
        this.setState({ [key]: input })
    }

    handleCheckAvailablity() {

        // Prep users input date
        let dateArr = this.state.appointmentDate.split('-')
        let timeArr = this.state.startTime.split(':')

        let appointmentStartDateTime = new Date(dateArr[0], +dateArr[1] - 1, dateArr[2], +timeArr[0], timeArr[1])
        let appointmentEndDateTime = new Date(dateArr[0], +dateArr[1] - 1, dateArr[2], +timeArr[0] + this.state.timeToClean, timeArr[1])

        console.log('start:', appointmentStartDateTime, 'end:', appointmentEndDateTime)
        let appointmentStart = false
        let appointmentStartId
        this.state.events.forEach(time => {
            // console.log('start time of event:', time.start, 'end time of event', time)
            if (time.start.getTime() === appointmentStartDateTime.getTime()) {
                // console.log('appointmentStart:', true)
                appointmentStart = true
                appointmentStartId = time.id
            }
        })

        let appointmentEnd = false
        let appointmentEndId
        this.state.events.forEach(time => {
            // console.log('start time of event:', time.end, 'end time of event', time)
            if (time.end.getTime() === appointmentEndDateTime.getTime()) {
                // console.log('appointmentEnd:', true)
                appointmentEndId = time.id
                appointmentEnd = true

            }
        })


        let timeSlots = []

        console.log(timeSlots)

        // console.log(appointmentStart, appointmentEnd)
        if (appointmentStart === true && appointmentEnd === true) {
            this.setState({ available: true })

            while (appointmentStartId <= appointmentEndId) {
                console.log('while loop ran')
                console.log('start id:', appointmentStartId, 'end id:', appointmentEndId)
                for (let i = 0; i < this.state.events.length; i++) {
                    console.log('event:', this.state.events[i].id, 'start id:', appointmentStartId)
                    if (this.state.events[i].id === appointmentStartId && appointmentStartId <= appointmentEndId) {
                        console.log('if statement met')
                        timeSlots.push(this.state.events[i])
                        appointmentStartId++
                    }
                }
            }
            timeSlots = timeSlots.map(time => time.id)
        } else {
            this.setState({ available: false })
        }

        this.setState({ 
            appointmentTimeSlots: timeSlots,
            appointmentStartTime: appointmentStartDateTime,
            appointmentEndTime: appointmentEndDateTime
        })
        console.log(timeSlots)
    }

    handleScheduleAppointment() {
        const { socket } = this.props,
            reduxState = this.props.state

        // socket.emit('make appointment', {
        //     client_name: reduxState.contactInfo.clientName,
        //     client_address: reduxState.contactInfo.clientAddress + ', ' + reduxState.contactInfo.city,
        //     client_phone: reduxState.contactInfo.clientPhone,
        //     client_email: reduxState.contactInfo.clientEmail,
        //     residential_sqft_carpet: reduxState.,
        //     residential_sqft_grout: reduxState.,
        //     residential_upholstery: reduxState.,
        //     residential_extras: reduxState.,
        //     start_time: reduxState.,
        //     end_time: reduxState.,
        //     clean_time: reduxState.,
        //     timesToDelete: reduxState.
        // })
    }

    render() {
        let availablility
        if (this.state.available === null) {
            availablility = <h3>Select a Date and Time</h3>
        } else if (this.state.available === false) {
            availablility = <h3>Not Available</h3>
        } else {
            availablility = <h3>Available</h3>
        }
        BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
        return (
            <div>
                <div className='calendar' >
                    <BigCalendar
                        events={this.state.events}
                        views={["month"]}
                        step={60}
                        defaultDate={new Date()}
                    />
                </div>
                <h4>Estimated Time: {this.state.timeToClean} hours</h4>
                Date<input type="date" onChange={e => this.handleInput('appointmentDate', e.target.value)} />
                Start Time<input type="time" onChange={e => this.handleInput('startTime', e.target.value)} />
                <button onClick={() => this.handleCheckAvailablity()} >Check Availablity</button>
                {availablility}
                {this.state.available === true ? <button onClick={() => this.handleScheduleAppointment()} >Schedule Now!</button> : <button>Schedule Now!</button>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { state }
}

export default socketConnect(connect(mapStateToProps, { clearState })(ResidentialSchedular))