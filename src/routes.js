import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomeLanding from './views/HomeLanding/HomeLanding'
import ServiceSelection from './views/ServiceSelection/ServiceSelection'
import EstimateWizard from './views/EstimateWizard/EstimateWizard'

export default (
  <Switch> 
    <Route exact path = '/' component = {HomeLanding}/>
    <Route path = '/services-selection' component = {ServiceSelection}/>
    <Route path = '/residential-home-cleaning' component = {EstimateWizard}/>
    <Route path = '/commercial-home-cleaning' component = {EstimateWizard}/>
  </Switch>
)