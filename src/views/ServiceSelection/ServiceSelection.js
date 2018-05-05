import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getServices, updateClientType } from '../../ducks/reducer'

class ServiceSelection extends Component {

    componentDidMount() {
        this.props.getServices()
    }

    handleClientType(type) {
        this.props.updateClientType(type)
    }

    render() {
        return (
            <div>
                <Link to='/residential-home-cleaning' ><button onClick={() => this.handleClientType('residential')} >Residential</button></Link>
                <Link to='/commercial-home-cleaning' ><button onClick={() => this.handleClientType('commercial')} >Commercial</button></Link>
            </div>
        )
    }
}

export default connect(null, { getServices, updateClientType })(ServiceSelection)