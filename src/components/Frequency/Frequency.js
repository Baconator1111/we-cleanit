import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateFrequency } from '../../ducks/reducer'

class Frequency extends Component {
    constructor(props) {
        super(props)
        this.state = {
            frequency: null
        }
    }

    componentDidMount(){
        this.setState({ frequency: this.props.frequency })
    }

    async handleOption(option) {
        await this.setState({ frequency: option })
        this.props.updateFrequency(this.state.frequency)
    }

    render() {
        return (
            <div>
                <form>
                    <p>Please select the Frequency of services needed</p>
                    <div>
                        <input type='radio' id='quarterly' name='frequency' value='quarterly' checked={this.state.frequency === 'quarterly'} onChange={e=> this.handleOption(e.target.value)} />
                        <label htmlFor="quarterly">Quarterly</label>
                        
                        <input type='radio' id='biannualy' name='frequency' value='biannualy' checked={this.state.frequency === 'biannualy'} onChange={e=> this.handleOption(e.target.value)} />
                        <label htmlFor="biannualy">Biannualy</label>
                        
                        <input type='radio' id='annualy' name='frequency' value='annualy' checked={this.state.frequency === 'annualy'} onChange={e=> this.handleOption(e.target.value)} />
                        <label htmlFor="annualy">Annualy</label>
                        
                        <input type='radio' id='once' name='frequency' value='once' checked={this.state.frequency === 'once'} onChange={e=> this.handleOption(e.target.value)} />
                        <label htmlFor="once">Once</label>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        frequency: state.frequency
    }
}

export default connect(mapStateToProps, { updateFrequency })(Frequency)