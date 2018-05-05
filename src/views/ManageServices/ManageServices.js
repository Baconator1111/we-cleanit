import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { getServices } from '../../ducks/reducer'

import ExpandableBox from './../../components/ExpandableBox/ExpandableBox'
import EditUpholstery from './../../components/EditUpholstery/EditUpholstery'

class ManageServices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            carpetPrice: 0,
            groutPrice: 0,
            floorTime: 0,
            upholsteryName: '',
            upholsteryPrice: 0,
            upholsteryTTC: 0,
            addUpholstery: false,
            extraName: '',
            extraDescription: '',
            addExtra: false
        }
    }

    async componentDidMount() {
        await this.props.getServices()

        this.setState({
            carpetPrice: this.props.servicesInfo.mainServices[0].carpet_price,
            groutPrice: this.props.servicesInfo.mainServices[0].grout_price,
            floorTime: this.props.servicesInfo.mainServices[0].floor_ttc / 60
        })
    }

    handleChange(key, input) {
        this.setState({ [key]: input })
    }

    handleMainServicesSubmit(type) {
        let body
        if (type === 'floorTime') {
            body = {
                [type]: +this.state[type] * 60
            }
        } else {
            body = {
                [type]: +this.state[type]
            }
        }
        axios.put(`/api/admin/services/${type}`, body)
    }

    async handleDeleteExtra(extra_id) {
        await axios.delete(`/api/admin/services/extras/${extra_id}`)
        this.props.getServices()
    }

    handleAddUpholsteryOpen() {
        this.setState({ addUpholstery: true })
    }

    handleAddExtraOpen() {
        this.setState({ addExtra: true })
    }

    async handleAddUpholstery() {
        if (this.state.upholsteryName === '' || +this.state.upholsteryPrice === 0 || this.state.upholsteryTTC === 0) {
            return null
        } else {
            let body = {
                extra_name: this.state.upholsteryName,
                extra_description: this.state.upholsteryPrice,
                upholstery_ttc: this.state.upholsteryTTC
            }

            await axios.post('/api/admin/services/upholstery', body)
            this.setState({ addUpholstery: false })
            this.props.getServices()
        }
    }

    handleCancelUpholstery() {
        this.setState({
            addUpholstery: false,
            upholsteryName: '',
            upholsteryPrice: 0,
            upholsteryTTC: 0
        })
    }

    async handleAddExtra() {
        if (this.state.extraName === '' || this.state.extraDescription === '') {
            return null
        } else {
            let body = {
                upholstery_name: this.state.extraName,
                upholstery_price: this.state.extraDescription
            }

            await axios.post('/api/admin/services/extras', body)
            this.setState({ addExtra: false })
            this.props.getServices()
        }
    }

    handleCancelExtra() {
        this.setState({
            addExtra: false,
            extraName: '',
            extraDescription: '',
        })
    }

    render() {
        let upholsteryJSX

        if (this.props.servicesInfo.upholstery[0]) {
            upholsteryJSX = this.props.servicesInfo.upholstery.map((upholstery, i) => {
                return <EditUpholstery key={i} upholstery={upholstery} />
            })
        }

        let otherServicesJSX

        if (this.props.servicesInfo.extras[0]) {
            otherServicesJSX = this.props.servicesInfo.extras.map(extraService => {
                return (
                    <div key={extraService.extra_id} >
                        <h4>{extraService.extra_name}</h4>
                        <p>{extraService.extra_description}</p>
                        <button onClick={() => this.handleDeleteExtra(extraService.extra_id)} >Delete</button>
                    </div>
                )
            })
        }

        let addUpholsteryJSX
        if (this.state.addUpholstery === true) {
            addUpholsteryJSX = (
                <div>
                    <h3>New Upholstery Piece</h3>
                    <h4>Name:  <input type="text" value={this.state.upholsteryName} onChange={e => this.handleChange('upholsteryName', e.target.value)} /></h4>
                    <h5>Price:  $<input type="number" min='0' value={this.state.upholsteryPrice} onChange={e => this.handleChange('upholsteryPrice', e.target.value)} /></h5>
                    <h5>Time to Clean:  <input type="number" min='0' value={this.state.upholsteryTTC} onChange={e => this.handleChange('upholsteryTTC', e.target.value)} />minutes</h5>
                    <button onClick={() => this.handleAddUpholstery()} >Submit</button>
                    <button onClick={() => this.handleCancelUpholstery()} >Cancel</button>
                </div>
            )
        } else {
            addUpholsteryJSX = null
        }

        let addExtraJSX
        if (this.state.addExtra === true) {
            addExtraJSX = (
                <div>
                    <h3>New Extra Service</h3>
                    <h4>Name:  <input type="text" value={this.state.extraName} onChange={e => this.handleChange('extraName', e.target.value)} /></h4>
                    <h5>Description:  $<input type="text" value={this.state.extraDescription} onChange={e => this.handleChange('extraDescription', e.target.value)} /></h5>
                    <button onClick={() => this.handleAddExtra()} >Submit</button>
                    <button onClick={() => this.handleCancelExtra()} >Cancel</button>
                </div>
            )
        } else {
            addExtraJSX = null
        }

        return (
            <div>
                <h1>Manage Services</h1>
                <ExpandableBox boxTitle='Carpet Cleaning'>
                    <h3>Carpet Cleaning</h3>
                    <h6>Price per Square Foot in Cents</h6>
                    <input onChange={e => this.handleChange('carpetPrice', e.target.value)} type="number" min='0' value={this.state.carpetPrice} />
                    <button onClick={() => this.handleMainServicesSubmit('carpetPrice')} >Submit Price Change</button>
                    <h6>Promotional</h6>
                    <input type="number" min='0' placeholder='% Discount' />
                    <h6>Promotion End Date</h6>
                    <input type="date" />
                </ExpandableBox>
                <ExpandableBox boxTitle='Tile and Grout' >
                    <h3>Tile and Grout</h3>
                    <h6>Price per Square Foot in Cents</h6>
                    <input onChange={e => this.handleChange('groutPrice', e.target.value)} type="number" min='0' value={this.state.groutPrice} />
                    <button onClick={() => this.handleMainServicesSubmit('groutPrice')} >Submit Price Change</button>
                    <h6>Promotional</h6>
                    <input type="number" min='0' placeholder='% Discount' />
                    <h6>Promotion End Date</h6>
                    <input type="date" />
                </ExpandableBox>
                <ExpandableBox boxTitle='Time to Clean Floors' >
                    <h4>Time to Clean Floors</h4>
                    <input onChange={e => this.handleChange('floorTime', e.target.value)} type="number" min='0' value={this.state.floorTime} />
                    <h6>minutes per 1000 square feet</h6>
                    <button onClick={() => this.handleMainServicesSubmit('floorTime')} >Submit Time Change</button>
                </ExpandableBox>
                <ExpandableBox boxTitle='Upholstery' >
                    <h3>Upholstery</h3>
                    {upholsteryJSX}
                    {addUpholsteryJSX}
                    {this.state.addUpholstery === false ? <button onClick={() => this.handleAddUpholsteryOpen()} >Add Upholstery Piece</button> : null}
                </ExpandableBox>
                <ExpandableBox boxTitle='Other Services' >
                    <h3>Other Services</h3>
                    {otherServicesJSX}
                    {addExtraJSX}
                    {this.state.addExtra === false ? <button onClick={() => this.handleAddExtraOpen()} >Add Extra Service</button> : null }
                </ExpandableBox>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        servicesInfo: state.servicesInfo
    }
}

export default connect(mapStateToProps, { getServices })(ManageServices)