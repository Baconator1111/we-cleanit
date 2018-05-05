import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getServices } from '../../ducks/reducer'

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
            floorTime: 0
        }

        this.calculateRunningTotal = this.calculateRunningTotal.bind(this)
    }

    async componentDidMount() {
        await this.props.getServices()
        
        this.setState({
            carpetPrice: this.props.servicesInfo.mainServices[0].carpet_price,
            groutPrice: this.props.servicesInfo.mainServices[0].grout_price,
            floorTime: this.props.servicesInfo.mainServices[0].floor_ttc
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

    calculateRunningTotal() {
        let runningTotal = 0
        let timeToClean = 0

        // calculate Carpet and Grout prices
        let totalSqrFtCarpet = 0
        let totalSqrFtGrout = 0

        this.props.floorSectionsCarpet.forEach(section => {
            totalSqrFtCarpet += section.length * section.width
        })

        this.props.floorSectionsGrout.forEach(section => {
            totalSqrFtGrout += section.length * section.width
        })
        runningTotal += totalSqrFtCarpet * this.state.carpetPrice / 100
        runningTotal += totalSqrFtGrout * this.state.groutPrice / 100

        let totalFootage = totalSqrFtCarpet + totalSqrFtGrout
        timeToClean += totalFootage * this.state.floorTime / 60000

        // add upholstery pieces
        this.props.upholstery.forEach(upholstery => {
            runningTotal += upholstery.upholstery_price
            timeToClean += upholstery.upholstery_ttc
        })

        this.setState({ 
            runningTotal: runningTotal,
            timeToClean: timeToClean
        })
    }

    render() {
        return (
            <div>
                <ExpandableBox boxTitle='Contact Information' ><ClientInfo /></ExpandableBox>
                <ExpandableBox boxTitle='Carpet Cleaning Estimate' ><SqrFtEstimate calculateRunningTotal={this.calculateRunningTotal} floorType='carpet' /></ExpandableBox>
                <ExpandableBox boxTitle='Grout and Tile Cleaning Estimate' ><SqrFtEstimate calculateRunningTotal={this.calculateRunningTotal} floorType='grout' /></ExpandableBox>
                <ExpandableBox boxTitle='Upholstery Services' ><Upholstery calculateRunningTotal={this.calculateRunningTotal} /></ExpandableBox>
                {this.props.clientType === 'residential' ? <ExpandableBox boxTitle='Extra Services' ><ExtraServices /></ExpandableBox> : null}
                {this.props.clientType === 'commercial' ? <ExpandableBox boxTitle='Frequency' ><Frequency calculateRunningTotal={this.calculateRunningTotal} /></ExpandableBox> : null}

                <h2>Running Total ${this.state.runningTotal}</h2>
                <h2>Estimated Cleaing Time {this.state.timeToClean} min</h2>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        clientType: state.clientType,
        servicesInfo: state.servicesInfo,
        floorSectionsCarpet: state.floorSectionsCarpet,
        floorSectionsGrout: state.floorSectionsGrout,
        frequency: state.frequency,
        upholstery: state.upholstery
    }
}

export default connect(mapStateToProps, { getServices })(EstimateWizard)