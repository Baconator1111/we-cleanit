import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class AdminDash extends Component {
    render() {
        return (
            <div>
                <Link to='/admin/manage-services' ><button>Manage Services</button></Link>
            </div>
        )
    }
}