import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExpandableBox from './../../components/ExpandableBox/ExpandableBox'

import ClientInfo from './../../components/ClientInfo/ClientInfo'
import SqrFtEstimate from './../../components/SqrFtEstimate/SqrFtEstimate'
import Upholstery from './../../components/Upholstery/Upholstery'
import ExtraServices from './../../components/ExtraServices/ExtraServices'
import Frequency from './../../components/Frequency/Frequency'

class ResidentialWizard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            runningTotal: 0
        }
    }

    // componentWillReceiveProps()

    render() {
        return (
            <div>
                <ExpandableBox boxTitle='Contact Information' ><ClientInfo /></ExpandableBox>
                <ExpandableBox boxTitle='Carpet Cleaning Estimate' ><SqrFtEstimate floorType='carpet' /></ExpandableBox>
                <ExpandableBox boxTitle='Grout and Tile Cleaning Estimate' ><SqrFtEstimate floorType='grout' /></ExpandableBox>
                <ExpandableBox boxTitle='Upholstery Services' ><Upholstery /></ExpandableBox>
                <ExpandableBox boxTitle='Extra Services' ><ExtraServices /></ExpandableBox>
                <ExpandableBox boxTitle='Frequency' ><Frequency /></ExpandableBox>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        floorSectionsCarpet: state.floorSectionsCarpet,
        floorSectionsGrout: state.floorSectionsGrout,
        upholstery: state.upholstery
    }
}

export default connect(mapStateToProps, null )(ResidentialWizard)