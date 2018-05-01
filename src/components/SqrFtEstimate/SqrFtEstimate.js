import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { updateFloorSectionsCarpet, updateFloorSectionsGrout } from '../../ducks/reducer'

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
        let currentFloorSectionsCarpet = this.props.floorSectionsCarpet
        let currentFloorSectionsGrout = this.props.floorSectionsGrout

        if (this.props.floorType === 'carpet' && currentFloorSectionsCarpet[0]) {
            this.setState({
                floorSections: currentFloorSectionsCarpet
            })
        } else if (this.props.floorType === 'grout' && currentFloorSectionsGrout[0]) {
            this.setState({
                floorSections: currentFloorSectionsGrout
            })
        }

        axios.get('/api/allServices')
            .then(({ data }) => {
                let carpetPrice = data.mainServices[0].carpet_price
                let groutPrice = data.mainServices[0].grout_price
                this.setState({
                    carpetPrice: carpetPrice,
                    groutPrice: groutPrice
                })
            })
    }

    handleChange(key, input) {
        this.setState({ [key]: input })
    }

    handleAddFloorSection() {
        let section = {
            length: this.state.length,
            width: this.state.width
        }

        let floorSections = this.state.floorSections
        floorSections.push(section)
        this.setState({
            floorSections: floorSections,
            length: 0,
            width: 0
        })

        if (this.props.floorType === 'carpet') {
            this.props.updateFloorSectionsCarpet(this.state.floorSections)
        } else if (this.props.floorType === 'grout') {
            this.props.updateFloorSectionsGrout(this.state.floorSections)
        }

    }

    handleDeleteFloorSection(index) {
        let floorSections = this.state.floorSections
        floorSections.splice(index, 1)
        this.setState({
            floorSections: floorSections
        })

        if (this.props.floorType === 'carpet') {
            this.props.updateFloorSectionsCarpet(this.state.floorSections)
        } else if (this.props.floorType === 'grout') {
            this.props.updateFloorSectionsGrout(this.state.floorSections)
        }
    }

    render() {

        let addedFloorSectionsJSX = []
        if (this.state.floorSections[0]) {
            addedFloorSectionsJSX = this.state.floorSections.map((floorSection, i) => {
                return (
                    <div key={i} >
                        <h3>{floorSection.width}ft by {floorSection.length}ft</h3>
                        <button onClick={() => this.handleDeleteFloorSection(i)} >delete</button>
                    </div>
                )
            })
        }

        let totalSqrFt = 0
        let floorSections = this.state.floorSections
        floorSections.forEach(section => {
            totalSqrFt += section.length * section.width
        })

        let totalPrice = 0
        if (this.props.floorType === 'carpet') {
            totalPrice = totalSqrFt * this.state.carpetPrice / 100
        } else if (this.props.floorType === 'grout') {
            totalPrice = totalSqrFt * this.state.groutPrice / 100
        }

        return (
            <div>
                <h4>Length</h4>
                <input type="number" min='0' value={this.state.length} onChange={e => this.handleChange('length', e.target.value)} />ft
                <h4>Width</h4>
                <input type="number" min='0' value={this.state.width} onChange={e => this.handleChange('width', e.target.value)} />ft
                <button onClick={() => this.handleAddFloorSection()} >Add Floor Section</button>
                {addedFloorSectionsJSX[0] ? addedFloorSectionsJSX : null}
                <h2>Total: ${totalPrice}</h2>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        clientType: state.clientType,
        floorSectionsCarpet: state.floorSectionsCarpet,
        floorSectionsGrout: state.floorSectionsGrout
    }
}

export default connect(mapStateToProps, { updateFloorSectionsCarpet, updateFloorSectionsGrout })(SqrFtEstimate)