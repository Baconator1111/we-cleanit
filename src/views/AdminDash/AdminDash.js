import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getServices } from '../../ducks/reducer'

class AdminDash extends Component {

    componentDidMount() {
        this.props.getServices()
    }

    render() {
        return (
            <div>
                <Link to='/admin/manage-services' ><button>Manage Services</button></Link>
                <Link to='/admin/manage-open-times' ><button>Manage Open Times</button></Link>
            </div>
        )
    }
}

export default connect(null, { getServices })(AdminDash)