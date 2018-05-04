import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from 'axios'

import { getServices } from '../../ducks/reducer'

class EditUpholstery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            upholsteryName: '',
            upholsteryPrice: 0,
            upholsteryTTC: 0,
            edit: false
        }
    }

    componentDidMount() {
        this.setState({
            upholsteryName: this.props.upholstery.upholstery_name,
            upholsteryPrice: this.props.upholstery.upholstery_price,
            upholsteryTTC: this.props.upholstery.upholstery_ttc
        })
    }

    handleChange(key, input) {
        this.setState({ [key]: input })
    }

    handleEdit() {
        this.setState({ edit: true })
    }

    handleCancel() {
        this.setState({
            upholsteryName: this.props.upholstery.upholstery_name,
            upholsteryPrice: this.props.upholstery.upholstery_price,
            upholsteryTTC: this.props.upholstery.upholstery_ttc,
            edit: false
        })
    }

    async handleSave() {
        let body = {
            upholstery_id: this.props.upholstery.upholstery_id,
            upholstery_name: this.state.upholsteryName,
            upholstery_price: this.state.upholsteryPrice,
            upholstery_ttc: this.state.upholsteryTTC
        }
        await axios.put('/api/admin/services/upholstery', body)
        this.setState({ edit: false })
        this.props.getServices()
    }

    async handleDelete() {
        await axios.delete(`/api/admin/services/upholstery/${this.props.upholstery.upholstery_id}`)
        this.props.getServices()
    }

    render() {
        let upholsteryJSX
        if (this.state.edit === false) {
            upholsteryJSX = (
                <div>
                    <h4>Name:  {this.state.upholsteryName}</h4>
                    <h5>Price:  ${this.state.upholsteryPrice}</h5>
                    <h5>Time to Clean:  {this.state.upholsteryTTC}  minutes</h5>
                    <button onClick={() => this.handleEdit()} >Edit</button>
                    <button onClick={() => this.handleDelete()} >Delete</button>
                </div>
            )
        } else if (this.state.edit === true) {
            upholsteryJSX = (
                <div>
                    <h4>Name:  <input type="text" value={this.state.upholsteryName} onChange={e => this.handleChange('upholsteryName', e.target.value)} /></h4>
                    <h5>Price:  $<input type="number" min='0' value={this.state.upholsteryPrice} onChange={e => this.handleChange('upholsteryPrice', e.target.value)} /></h5>
                    <h5>Time to Clean:  <input type="number" min='0' value={this.state.upholsteryTTC} onChange={e => this.handleChange('upholsteryTTC', e.target.value)} />minutes</h5>
                    <button onClick={() => this.handleSave()} >Save</button>
                    <button onClick={() => this.handleCancel()} >Cancel</button>
                    <button onClick={() => this.handleDelete()} >Delete</button>
                </div>
            )
        }
        return (
            <div>
                {upholsteryJSX}
            </div>
        )
    }
}

export default connect(null, { getServices })(EditUpholstery)