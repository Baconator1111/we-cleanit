import React, { Component } from 'react'
import { socketConnect } from 'socket.io-react'

class ManageOpenTimes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentOpenTimes: []
        }
    }

    componentDidMount() {
        console.log('socket =', this.props)
        const { socket } = this.props
        const updateType = 0
        socket.on('get open times', data => this.setState({ currentOpenTimes: data }))
        socket.emit('open slots', updateType)
    }

    render() {
        console.log(this.state.currentOpenTimes)
        return (
            <div>
                {this.state.currentOpenTimes}
            </div>
        )
    }
}

export default socketConnect(ManageOpenTimes)