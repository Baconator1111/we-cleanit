import React, { Component } from 'react'
import { connect } from 'react-redux'

import { socketConnect } from 'socket.io-react'

import { Redirect } from 'react-router'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { getServices, updateTTC, updatePriceEstimate, clearState } from '../../ducks/reducer'

import ExpandableBox from './../../components/ExpandableBox/ExpandableBox'

import ClientInfo from './../../components/ClientInfo/ClientInfo'
import SqrFtEstimate from './../../components/SqrFtEstimate/SqrFtEstimate'
import Upholstery from './../../components/Upholstery/Upholstery'
import ExtraServices from './../../components/ExtraServices/ExtraServices'
import Frequency from './../../components/Frequency/Frequency'

class EstimateWizard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            runningTotal: 0,
            timeToClean: 0,
            carpetPrice: 0,
            groutPrice: 0,
            floorTime: 0,
            redirect: false
        }

        this.calculateRunningTotal = this.calculateRunningTotal.bind(this)
    }

    async componentDidMount() {
        await this.props.getServices()

        this.setState({
            carpetPrice: this.props.state.servicesInfo.mainServices[0].carpet_price,
            groutPrice: this.props.state.servicesInfo.mainServices[0].grout_price,
            floorTime: this.props.state.servicesInfo.mainServices[0].floor_ttc
        })
        this.calculateRunningTotal()

    }

    // UNSAFE_componentWillReceiveProps() {
    //     this.calculateRunningTotal()
    // }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     // if (Object.values(nextProps.floorSectionsCarpet[nextProps.floorSectionsCarpet.length-1]) < Object.values(this.props.floorSectionsCarpet[this.props.floorSectionsCarpet.length-1])) {
    //     //     this.calculateRunningTotal()
    //     //   }
    //     //   return null;
    //     console.log(nextProps, prevState, this)
    //     return (this === null ? null : this.calculateRunningTotal())
    // }

    async calculateRunningTotal() {
        let runningTotal = 0
        let timeToClean = 0

        // calculate Carpet and Grout prices
        let totalSqrFtCarpet = 0
        let totalSqrFtGrout = 0

        this.props.state.floorSectionsCarpet.forEach(section => {
            totalSqrFtCarpet += section.length * section.width
        })

        this.props.state.floorSectionsGrout.forEach(section => {
            totalSqrFtGrout += section.length * section.width
        })
        runningTotal += totalSqrFtCarpet * this.state.carpetPrice / 100
        runningTotal += totalSqrFtGrout * this.state.groutPrice / 100

        let totalFootage = totalSqrFtCarpet + totalSqrFtGrout
        timeToClean += totalFootage * this.state.floorTime / 60000

        // add upholstery pieces

        console.log(this.props.state.upholstery)

        this.props.state.upholstery.forEach(upholstery => {
            runningTotal += upholstery.upholstery_price
            timeToClean += upholstery.upholstery_ttc
        })

        console.log('running total', runningTotal, 'ttc', timeToClean)

        await this.setState({
            runningTotal: runningTotal,
            timeToClean: timeToClean
        })

        await this.props.updateTTC(this.state.timeToClean)
        await this.props.updatePriceEstimate(this.state.runningTotal)
    }

    async checkInfo() {
        let reduxState = this.props.state
        let contactInfo = reduxState.contactInfo
        if ((reduxState.floorSectionsCarpet[0] || reduxState.floorSectionsGrout[0] || reduxState.upholstery[0]) && contactInfo.clientName && contactInfo.clientAddress && contactInfo.clientPhone.length === 12 && contactInfo.city && contactInfo.clientEmail && reduxState.frequency) {
            if (reduxState.clientType === 'residential') {
                this.setState({ redirect: 'residential' })
            } else if (reduxState.clientType === 'commercial') {
                await this.handleSubmitCommercialRequest()
                this.setState({ redirect: 'commercial' })
            }
        } else if (!reduxState.frequency) {
            toast.error('Please select a Frequency.')
        } else if (!reduxState.floorSectionsCarpet[0] && !reduxState.floorSectionsGrout[0] && !reduxState.upholstery[0]) {
            toast.error('Please select Qualifying services.')
        } else if (contactInfo.clientPhone.length !== 12) {
            toast.error('Please enter phone number in XXX-XXX-XXXX format.')
        } else if (!contactInfo.clientName || !contactInfo.clientAddress || !contactInfo.clientPhone || !contactInfo.city || !contactInfo.clientEmail) {
            toast.error('Please fill out required contact information.')
        }
    }

    async handleSubmitCommercialRequest() {
        const { socket } = this.props,
            reduxState = this.props.state

        // Do the math to create carpet and grout square footage

        let totalSqrFtCarpet = 0
        let totalSqrFtGrout = 0

        if (reduxState.floorSectionsCarpet[0]) {
            reduxState.floorSectionsCarpet.forEach(section => {
                totalSqrFtCarpet += section.length * section.width
            })
        }

        if (reduxState.floorSectionsGrout[0]) {
            reduxState.floorSectionsGrout.forEach(section => {
                totalSqrFtGrout += section.length * section.width
            })
        }
        // Create array with proper ids for both apoholstery or extra services

        let upholsteryArr = []
        if (reduxState.upholstery[0]) {
            reduxState.upholstery.forEach(upholstery => {
                upholsteryArr.push(upholstery.upholstery_id)
            })
        }

        await socket.emit('make commercial request', {
            company_name: reduxState.contactInfo.clientName,
            company_address: reduxState.contactInfo.clientAddress + ', ' + reduxState.contactInfo.city,
            company_phone: reduxState.contactInfo.clientPhone,
            company_email: reduxState.contactInfo.clientEmail,
            company_sqft_carpet: totalSqrFtCarpet,
            company_sqft_grout: totalSqrFtGrout,
            company_upholstery: upholsteryArr.toString(),
            frequency: reduxState.frequency,
            price_estimate: reduxState.priceEstimate,
        })
        this.props.clearState()

    }

    render() {

        if (this.state.redirect === 'residential') {
            return <Redirect push to='/residential-appointment-scheduling' />
        } else if (this.state.redirect === 'commercial') {
            return <Redirect push to='/schedule-succsess' />
        }

        if (this.props.state.clientType === '') {
            return <Redirect push to='/services-selection' />
        }

        return (
            <div>
                <ToastContainer />
                <ExpandableBox boxTitle='Contact Information' ><ClientInfo /></ExpandableBox>
                <ExpandableBox boxTitle='Carpet Cleaning Estimate' ><SqrFtEstimate calculateRunningTotal={this.calculateRunningTotal} floorType='carpet' /></ExpandableBox>
                <ExpandableBox boxTitle='Grout and Tile Cleaning Estimate' ><SqrFtEstimate calculateRunningTotal={this.calculateRunningTotal} floorType='grout' /></ExpandableBox>
                <ExpandableBox boxTitle='Upholstery Services' ><Upholstery calculateRunningTotal={this.calculateRunningTotal} /></ExpandableBox>
                {this.props.state.clientType === 'residential' ? <ExpandableBox boxTitle='Extra Services' ><ExtraServices /></ExpandableBox> : null}
                {this.props.state.clientType === 'commercial' ? <ExpandableBox boxTitle='Frequency' ><Frequency calculateRunningTotal={this.calculateRunningTotal} /></ExpandableBox> : null}

                <h2>Running Total ${this.state.runningTotal}</h2>
                <h2>Estimated Cleaing Time {this.state.timeToClean} min</h2>
                {this.props.state.clientType === 'residential' ? <button onClick={() => this.checkInfo()} >Schedule Now</button> : null}
                {this.props.state.clientType === 'commercial' ? <button onClick={() => this.checkInfo()} >Submit</button> : null}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { state }
}

export default socketConnect(connect(mapStateToProps, { getServices, updateTTC, updatePriceEstimate, clearState })(EstimateWizard))