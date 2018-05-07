import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from 'material-ui/Button';


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
            <div className="app_verticalCenter">
                <Link to='/residential-home-cleaning' >
                  <Button  variant="raised" color="primary" className="app-resButton" onClick={() => this.handleClientType('residential')} >
                    Residential
                  </Button>
                </Link>
                <Link to='/commercial-home-cleaning' >
                  <Button  variant="raised" color="primary" onClick={() => this.handleClientType('commercial')} >
                    Commercial
                  </Button>
                </Link>
            </div>
        )
    }
}

export default connect(null, { getServices, updateClientType })(ServiceSelection)
