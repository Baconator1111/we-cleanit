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
                    <button>Add Upholstery Piece</button>
                </ExpandableBox>
                <ExpandableBox boxTitle='Other Services' >
                    <h3>Other Services</h3>
                    {otherServicesJSX}
                    <button>Add Extra Service</button>
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