import React, { Component } from 'react'
import { connect } from 'react-redux'


class ThankYou extends Component {
    render() {
        let personalizedMessage
        if (this.props.clientType === 'residential') {
            personalizedMessage = <h2>You will be contacted soon for confirmation of appointment!</h2>
        } else if (this.props.clientType === 'commercial') {
            personalizedMessage = <h2>You will be contacted soon!</h2>
        }
        return (
            <div>
                <h1>Thank You for Your Business!</h1>
                {personalizedMessage}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        clientType: state.clientType
    }
}

export default connect(mapStateToProps, null)(ThankYou)