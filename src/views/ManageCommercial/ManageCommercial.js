import React, { Component } from 'react'
import { socketConnect } from 'socket.io-react'
// import BigCalendar from 'react-big-calendar'
// import moment from 'moment'

import { connect } from 'react-redux'

import { Redirect } from 'react-router'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Appointment from '../../components/Appointment/Appointment'

import './manageCommercial.css'
// import 'react-big-calendar/lib/css/react-big-calendar.css'

class ManageCommercial extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            commercialRequest: [],
            first: true
        }
    }

    componentDidMount() {
        const { socket } = this.props
        let data = { company_name: false }

        socket.on('get commercial request', data => {
            data.sort(function (a, b) {
                return b.commercial_id - a.commercial_id;
            })
            this.setState({ commercialRequest: data })
            if (!this.state.first) {
                toast.success('New commercial Request made!', { 
                    autoClose: false
                })
            }
            this.setState({ first: false })
        })
        socket.emit('make commercial request', data)
    }

    render() {
        console.log(this.state)
        let commercialRequest = this.state.commercialRequest.map(commercialRequest => {
            return <Appointment clientType='commercial' key={commercialRequest.commercial_id} commercialRequest={commercialRequest} />
        })
        if (this.props.adminUser === 'pending') {
            return <Redirect push to='/admin/dash' />
        } else if (this.props.adminUser) {
            return (
                <div>
                    <ToastContainer />
                    {commercialRequest}
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

export default socketConnect(connect(mapStateToProps, null)(ManageCommercial))