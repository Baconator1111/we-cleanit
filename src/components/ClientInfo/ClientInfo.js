import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateContactInfo } from '../../ducks/reducer'
class ClientInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clientName: '',
            clientAddress: '',
            city: '',
            clientPhone: '',
            clientEmail: ''
        }

        this.handleInput = this.handleInput.bind(this)
    }

    componentDidMount() {
        console.log(this.props.contactInfo.clientName)
        const { contactInfo } = this.props
        this.setState({
            clientName: contactInfo.clientName,
            clientAddress: contactInfo.clientAddress,
            city: contactInfo.city,
            clientPhone: contactInfo.clientPhone,
            clientEmail: contactInfo.clientEmail
        })
    }

    handleInput(key, value) {
        this.setState({ [key]: value })
    }

    handleClear() {
        this.setState({
            clientName: '',
            clientAddress: '',
            city: '',
            clientPhone: '',
            clientEmail: ''
        })
    }

    handleSave() {
        this.props.updateContactInfo(this.state)
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h3>Contact Information</h3>
                <div>
                    <h6>Name:</h6>
                    <input onChange={e => this.handleInput('clientName', e.target.value)} type="text" value={this.state.clientName} />
                </div>
                <div>
                    <h6>Address:</h6>
                    <input onChange={e => this.handleInput('clientAddress', e.target.value)} type="text" value={this.state.clientAddress} />
                </div>
                <div>
                    <h6>City:</h6>
                    <input onChange={e => this.handleInput('city', e.target.value)} type="text" value={this.state.city} />
                </div>
                <div>
                    <h6>Phone:</h6>
                    <input onChange={e => this.handleInput('clientPhone', e.target.value)} type="text" value={this.state.clientPhone} />
                    <div>Your number will only be used to be contacted for this scheduled appointment. We do not share this information.</div>
                </div>
                <div>
                    <h6>Email:</h6>
                    <input onChange={e => this.handleInput('clientEmail', e.target.value)} type="text" value={this.state.clientEmail} />
                </div>
                <button onClick={() => this.handleSave()} >Save information</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        contactInfo: state.contactInfo
    }
}

export default connect(mapStateToProps, { updateContactInfo })(ClientInfo)