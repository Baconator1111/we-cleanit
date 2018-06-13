import React, { Component } from 'react'
import { socketConnect } from 'socket.io-react'
// import BigCalendar from 'react-big-calendar'
// import moment from 'moment'

import { connect } from 'react-redux'

import { Redirect } from 'react-router'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Appointment from '../../components/Appointment/Appointment'

import './manageAppointments.css'
// import 'react-big-calendar/lib/css/react-big-calendar.css'

class ManageAppointments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            appointments: [],
            first: true
        }
    }

    componentDidMount() {
        const { socket } = this.props
        let data = { start_time: false }

        socket.on('get appointments', data => {
            data.sort(function (a, b) {
                return b.appointment_id - a.appointment_id;
            })
            this.setState({ appointments: data })
            if (!this.state.first) {
                toast.success('New Appointment made!', { 
                    autoClose: false
                })
            }
            this.setState({ first: false })
        })
        socket.emit('make appointment', data)
    }

    render() {
        // console.log(this.state)
        let appointments = this.state.appointments.map(appointment => {
            return <Appointment clientType='residential' key={appointment.appointment_id} appointment={appointment} />
        })
        if (this.props.adminUser === 'pending') {
            return <Redirect push to='/admin/dash' />
        } else if (this.props.adminUser) {
            return (
                <div>
                    <ToastContainer />
                    {appointments}
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        adminUser: state.adminUser,
    }
}

export default socketConnect(connect(mapStateToProps, null)(ManageAppointments))