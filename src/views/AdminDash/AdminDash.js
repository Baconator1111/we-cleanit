import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import axios from 'axios'

import { getServices, updateAdminUser } from '../../ducks/reducer'

class AdminDash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authorized: true
        }
    }

    componentDidMount() {
        this.props.getServices()
        axios.get('/api/user')
            .then(({ data }) => {
                if (data === false) {
                    console.log('data is false met')
                    this.setState({ authorized: false })
                } else {
                    this.props.updateAdminUser(data)
                }
            })
    }

    render() {
        if (this.state.authorized === false) {
            return <Redirect push to='/admin' />
        } else if (this.props.adminUser === 'pending') {
            return (
                <div>
                    <h1>Authorizing</h1>
                </div>
            )
        } else if (this.props.adminUser) {
            return (
                <div>
                    <Link to='/admin/manage-services' ><button>Manage Services</button></Link>
                    <Link to='/admin/manage-open-times' ><button>Manage Open Times</button></Link>
                    <Link to='/admin/manage-appointments' ><button>Manage Open Times</button></Link>
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

export default connect(mapStateToProps, { getServices, updateAdminUser })(AdminDash)