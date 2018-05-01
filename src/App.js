import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ExpandableBox from './components/ExpandableBox/ExpandableBox'

import ClientInfo from './components/ClientInfo/ClientInfo'
import SqrFtEstimate from './components/SqrFtEstimate/SqrFtEstimate'
import Upholstery from './components/Upholstery/Upholstery'
import ExtraServices from './components/ExtraServices/ExtraServices'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ExpandableBox boxTitle='Contact Information' ><ClientInfo /></ExpandableBox>
        <ExpandableBox boxTitle='Carpet Cleaning Estimate' ><SqrFtEstimate floorType='carpet' /></ExpandableBox>
        <ExpandableBox boxTitle='Grout and Tile Cleaning Estimate' ><SqrFtEstimate floorType='grout' /></ExpandableBox>
        <ExpandableBox boxTitle='Extra Services' ><ExtraServices /></ExpandableBox>
        
      </div>
    );
  }
}

export default App;
