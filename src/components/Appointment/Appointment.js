import React, { Component } from 'react'


export default class Appointment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        let appointment = this.props.appointment
        return (
            <div key={appointment.appointment_id} >
                <h3>confirmed</h3><input id="checkBox" type="checkbox" />
                <h3>contacted</h3><input id="checkBox" type="checkbox" />
                <h2>{appointment.client_name}</h2>
                <h2>{appointment.client_address}</h2>
                <h2>{appointment.client_phone}</h2>
                <h2>{appointment.start_time}</h2>
                <h2>Clean Time: {Math.ceil(appointment.clean_time / 60)} Hours</h2>
                <button>Details</button>
            </div>
        )
    }
}