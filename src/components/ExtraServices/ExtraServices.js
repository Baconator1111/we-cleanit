import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateOtherServices } from '../../ducks/reducer'

class ExtraServices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            servicesOffered: [],
            servicesSelected: []
        }
    }

    componentDidMount() {
        const { otherServices } = this.props
        if (otherServices.servicesOffered) {
            this.setState({
                servicesOffered: otherServices.servicesOffered,
                servicesSelected: otherServices.servicesSelected
            })
        } else {
            this.setState({ servicesOffered: this.props.servicesInfo.extras })
        }
    }

    handleSelectExtra(service) {
        let servicesSelected = this.state.servicesSelected
        let servicesOffered = this.state.servicesOffered
        servicesSelected.push(service)
        for (let i = 0; i < servicesOffered.length; i++) {
            if (servicesOffered[i].extra_id === service.extra_id) {
                servicesOffered.splice(i, 1)
            }
        }

        this.setState({
            servicesOffered: servicesOffered,
            servicesSelected: servicesSelected
        })
        this.props.updateOtherServices(this.state)

    }

    handleDeselectExtra(service) {
        let servicesSelected = this.state.servicesSelected
        let servicesOffered = this.state.servicesOffered
        servicesOffered.push(service)
        for (let i = 0; i < servicesSelected.length; i++) {
            if (servicesSelected[i].extra_id === service.extra_id) {
                servicesSelected.splice(i, 1)
            }
        }

        this.setState({
            servicesOffered: servicesOffered,
            servicesSelected: servicesSelected
        })
        this.props.updateOtherServices(this.state)

    }

    render() {
        let servicesOfferedJSX = []
        let servicesSelectedJSX = []
        if (this.state.servicesOffered[0]) {
            servicesOfferedJSX = this.state.servicesOffered.map(service => {
                return (
                    <div key={service.extra_id} >
                        <h6>{service.extra_name}</h6>
                        <p>{service.extra_description}</p>
                        <button onClick={() => this.handleSelectExtra(service)} >Select</button>
                    </div>
                )
            })
        }

        if (this.state.servicesSelected[0]) {
            servicesSelectedJSX = this.state.servicesSelected.map(service => {
                return (
                    <div key={service.extra_id} >
                        <h6>{service.extra_name}</h6>
                        <p>{service.extra_description}</p>
                        <button onClick={() => this.handleDeselectExtra(service)} >Deselect</button>
                    </div>
                )
            })
        }

        return (
            <div>
                {servicesOfferedJSX[0] ? servicesOfferedJSX : 'none offered at this time'}
                {servicesSelectedJSX[0] ? servicesSelectedJSX : 'none selected'}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        servicesInfo: state.servicesInfo,
        otherServices: state.otherServices
    }
}

export default connect(mapStateToProps, { updateOtherServices })(ExtraServices)