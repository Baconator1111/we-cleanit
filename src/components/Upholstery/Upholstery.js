import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { updateUpholstery } from '../../ducks/reducer'

class Upholstery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            upholsteryOffered: [],
            upholsterySelected: [],
            selected: 0
        }
    }

    componentDidMount() {
        let currentUpholstery = this.props.upholstery
        if (currentUpholstery[0]) {
            this.setState({ upholsterySelected: currentUpholstery })
        }
        axios.get('/api/allServices')
            .then(({ data }) => {
                this.setState({ upholsteryOffered: data.upholstery })
            })
    }

    handleChange(input) {
        this.setState({ selected: input })
    }

    handleAddSelectedUpholstery() {
        let upholsterySelected = this.state.upholsterySelected
        upholsterySelected.push(this.state.upholsteryOffered[+this.state.selected])
        this.setState({ upholsterySelected: upholsterySelected })

        this.props.updateUpholstery(this.state.upholsterySelected)
    }

    handleDeleteUpholstery(index) {
        console.log(index)
        let upholsterySelected = this.state.upholsterySelected
        upholsterySelected.splice(index, 1)
        this.setState({ upholsterySelected: upholsterySelected })

        this.props.updateUpholstery(this.state.upholsterySelected)
    }

    render() {
        let upholsteryOptions = []
        if (this.state.upholsteryOffered[0]) {
            upholsteryOptions = this.state.upholsteryOffered.map((upholstery, i) => {
                return <option key={upholstery.upholstery_id} value={i}>{upholstery.upholstery_name} at ${upholstery.upholstery_price}</option>
            })
        }

        let upholsterySelectedJSX = []
        if (this.state.upholsterySelected[0]) {
            upholsterySelectedJSX = this.state.upholsterySelected.map((upholstery, i) => {
                return (
                    <div key={i} >
                        <h3>{upholstery.upholstery_name}</h3>
                        <h6>{upholstery.upholstery_price}</h6>
                        <button onClick={() => this.handleDeleteUpholstery(i)} >delete</button>
                    </div>
                )
            })
        }
        console.log(this.state.selected)
        return (
            <div>
                <select onChange={e => this.handleChange(e.target.value)} name="upholstery">
                    {upholsteryOptions[0] ? upholsteryOptions : <option value={null}>none at the moment</option>}
                </select>
                {upholsterySelectedJSX ? upholsterySelectedJSX : null}
                <button onClick={() => this.handleAddSelectedUpholstery()} >add</button>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        upholstery: state.upholstery
    }
}

export default connect(mapStateToProps, { updateUpholstery })(Upholstery)