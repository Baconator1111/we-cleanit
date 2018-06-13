import React, { Component } from 'react'
import axios from 'axios'


export default class Appointment extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleChange(type, clientType, id, value) {
        console.log('type:', type, 'value:', value)
        let body = {
            [clientType]: id,
            status: value
        }
        console.log(body)
        axios.put(`/api/admin/${type}`, body)
    }

    render() {
        let appointment = this.props.appointment
        let commercialRequest = this.props.commercialRequest
        if (this.props.clientType === 'residential') {
            return (
                <div key={appointment.appointment_id} >
                    <h3>confirmed:</h3>
                    <h2>{appointment.residential_confirmed}</h2>
                    <h4>Select:</h4>
                    <select id="checkBox" type="checkbox" onChange={e => this.handleChange('confirmed/residential', 'appointment_id', appointment.appointment_id, e.target.value)} >
                        <option value='declined'>Declined</option>
                        <option value='set'>Set</option>
                        <option value='pending'>Pending</option>
                    </select>
                    <h3>contacted:</h3>
                    <h2>{appointment.residential_contacted}</h2>
                    <h4>Select:</h4>
                    {appointment.residential_confirmed ? <h2>{appointment.residential_confirmed}</h2> : null}
                    <h4>Select:</h4>
                    <select id="checkBox" type="checkbox" onChange={e => this.handleChange('contacted/residential', 'appointment_id', appointment.appointment_id, e.target.value)} >
                        <option value='phone'>Phone</option>
                        <option value='email'>Email</option>
                        <option value='not yet'>Not Yet</option>
                    </select>
                    <h2>{appointment.client_name}</h2>
                    <h2>{appointment.client_address}</h2>
                    <h2>{appointment.client_phone}</h2>
                    <h2>{appointment.start_time}</h2>
                    <h2>${appointment.price_estimate ? appointment.price_estimate : 'error'}</h2>
                    <h2>Clean Time: {Math.ceil(appointment.clean_time / 60)} Hours</h2>
                    <button>Details</button>
                </div>
            )
        } else if (this.props.clientType === 'commercial') {
            return (
                <div key={commercialRequest.commercialRequest_id} >
                    <h3>confirmed:</h3>
                    <h2>{commercialRequest.company_confirmed}</h2>
                    <h4>Select:</h4>
                    <select id="checkBox" type="checkbox" onChange={e => this.handleChange('confirmed/commercial', 'commercial_id', commercialRequest.commercial_id, e.target.value)} >
                        <option value='declined'>Declined</option>
                        <option value='set'>Set</option>
                        <option value='pending'>Pending</option>
                    </select>
                    <h3>contacted:</h3>
                    <h2>{commercialRequest.company_contacted}</h2>
                    <h4>Select:</h4>
                    <select id="checkBox" type="checkbox" onChange={e => this.handleChange('contacted/commercial', 'commercial_id', commercialRequest.commercial_id, e.target.value)} >
                        <option value='phone'>Phone</option>
                        <option value='email'>Email</option>
                        <option value='not yet'>Not Yet</option>
                    </select>
                    <h2>{commercialRequest.company_name}</h2>
                    <h2>{commercialRequest.company_address}</h2>
                    <h2>{commercialRequest.company_phone}</h2>
                    <h2>{commercialRequest.company_email}</h2>
                    <h2>${commercialRequest.price_estimate ? commercialRequest.price_estimate : 'error'}</h2>
                    <h2>Frequency: {commercialRequest.frequency}</h2>
                    <button>Details</button>
                </div>
            )
        }
    }
}