import React, { Component } from 'react'
import { socketConnect } from 'socket.io-react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import './manageOpenTimes.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

class ManageOpenTimes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: ''
        }
    }

    componentDidMount() {
        console.log('socket =', this.props)
        const { socket } = this.props
        const updateType = 0
        socket.on('get open times', data => {
            let newData = []
            data.forEach(time => {
                let startTime = time.open_start_time.split('')
                startTime = +startTime.slice(11, 13).join('')

                if (startTime < 12) {
                    startTime = `${startTime} am`
                } else if (startTime === 12) {
                    startTime = `${startTime} noon`
                } else {
                    startTime = `${startTime - 12} pm`
                }

                let endTime = time.open_end_time.split('')
                endTime = +endTime.slice(11, 13).join('')

                if (endTime < 12) {
                    endTime = `${endTime} am`
                } else if (endTime === 12) {
                    endTime = `${endTime} noon`
                } else {
                    endTime = `${endTime - 12} pm`
                }

                console.log('start:', startTime, 'end:', endTime)
                newData.push({
                    id: time.time_id,
                    title: `${startTime} to ${endTime}`,
                    start: time.open_start_time,
                    end: time.open_end_time,
                })
            })
            this.setState({ events: newData })
            console.log('newData:', newData)
        })
        socket.emit('open slots', updateType)
    }

    handleInput(key, input) {
        this.setState({ [key]: input })
    }

    handleAddTimes() {
        const updateType = 'add',
            startDate = this.state.startDate,
            endDate = this.state.endDate,
            startTime = this.state.startTime,
            endTime = this.state.endTime,
            { socket } = this.props

        socket.emit('open slots', { updateType, startDate, endDate, startTime, endTime })
    }

    render() {
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
                Start Date<input type="date" onChange={e => this.handleInput('startDate', e.target.value)} />
                End Date<input type="date" onChange={e => this.handleInput('endDate', e.target.value)} />
                Start Time<input type="time" onChange={e => this.handleInput('startTime', e.target.value)} />
                End Time<input type="time" onChange={e => this.handleInput('endTime', e.target.value)} />
                <button onClick={() => this.handleAddTimes()} >Add New Times</button>
            </div>
        )
    }
}

export default socketConnect(ManageOpenTimes)