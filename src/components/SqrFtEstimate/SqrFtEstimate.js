import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { updateSQFTCarpet, updateSQFTGrout } from '../../ducks/reducer'

class SqrFtEstimate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            carpetPrice: 0,
            groutPrice: 0,
            floorSections: [],
            length: 0,
            width: 0
        }
    }

    componentDidMount() {
        axios.get('/api/allServices')
        .then(({ data }) => {
            let carpetPrice = data.services[0].carpet_price
            let groutPrice = data.services[0].grout_price
            this.setState({ 
                carpetPrice: carpetPrice, 
                groutPrice: groutPrice
              })
        })
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        sqftCarpet: state.sqftCarpet,
        sqftGrout: state.sqftGrout,
        floorSectionsCarpet: state.floorSectionsCarpet,
        floorSectionsGrout: state.floorSectionsGrout
    }
}

export default connect(mapStateToProps, { updateUpholstery })(Upholstery)