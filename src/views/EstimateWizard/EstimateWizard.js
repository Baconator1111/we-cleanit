import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getServices } from '../../ducks/reducer'

import ExpandableBox from './../../components/ExpandableBox/ExpandableBox'

import ClientInfo from './../../components/ClientInfo/ClientInfo'
import SqrFtEstimate from './../../components/SqrFtEstimate/SqrFtEstimate'
import Upholstery from './../../components/Upholstery/Upholstery'
import ExtraServices from './../../components/ExtraServices/ExtraServices'
import Frequency from './../../components/Frequency/Frequency'

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


//

    // <div>
    // <ExpandableBox boxTitle='Contact Information' ><ClientInfo /></ExpandableBox>
    // <ExpandableBox boxTitle='Carpet Cleaning Estimate' ><SqrFtEstimate calculateRunningTotal={this.calculateRunningTotal} floorType='carpet' /></ExpandableBox>
    // <ExpandableBox boxTitle='Grout and Tile Cleaning Estimate' ></ExpandableBox>
    // <ExpandableBox boxTitle='Upholstery Services' ><Upholstery calculateRunningTotal={this.calculateRunningTotal} /></ExpandableBox>
    // {this.props.clientType === 'residential' ? <ExpandableBox boxTitle='Extra Services' ><ExtraServices /></ExpandableBox> : null}
    // {this.props.clientType === 'commercial' ? <ExpandableBox boxTitle='Frequency' ><Frequency calculateRunningTotal={this.calculateRunningTotal} /></ExpandableBox> : null}
    // <h2>Running Total ${this.state.runningTotal}</h2>
    // <h2>Estimated Cleaing Time {this.state.timeToClean} min</h2>
    // </div>



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
            timeToClean: timeToClean,
            expanded: null
        })
    }

    handleChange = panel => (event, expanded) => {
      this.setState({
        expanded: expanded ? panel : false,
      });
    };

    render() {

      const { classes } = this.props;
      const { expanded } = this.state;

      return (
        <div className={classes.root}>
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}></Typography>
              <Typography className={classes.secondaryHeading}>Contact Information</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <ClientInfo />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}></Typography>
              <Typography className={classes.secondaryHeading}>Carpet Cleaning Estimate</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SqrFtEstimate calculateRunningTotal={this.calculateRunningTotal} floorType='grout' />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}></Typography>
              <Typography className={classes.secondaryHeading}>Grout and Tile Cleaning Estimate</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                eros, vitae egestas augue. Duis vel est augue.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Upholstery Services</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Upholstery calculateRunningTotal={this.calculateRunningTotal} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
           {this.props.clientType === 'residential' ?
              <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Extra Services</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <ExtraServices />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            : null}
           {this.props.clientType === 'commercial' ?
              <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Frequency</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Frequency calculateRunningTotal={this.calculateRunningTotal} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            : null}
        </div>
      );
    }
  }

  const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

EstimateWizard.propTypes = {
  classes: PropTypes.object.isRequired,
};

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

export default withStyles(styles)(connect(mapStateToProps, { getServices })(EstimateWizard))
