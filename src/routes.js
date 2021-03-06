import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomeLanding from './views/HomeLanding/HomeLanding'
import ServiceSelection from './views/ServiceSelection/ServiceSelection'
import EstimateWizard from './views/EstimateWizard/EstimateWizard'
import ResidentialSchedular from './views/ResidentialSchedular/ResidentialSchedular'
import AdminLanding from './views/AdminLanding/AdminLanding'
import AdminDash from './views/AdminDash/AdminDash'
import ManageServices from './views/ManageServices/ManageServices'
import ManageOpenTimes from './views/ManageOpenTimes/ManageOpenTimes'
import ManageAppointments from './views/ManageAppointments/ManageAppointments'
import ManageCommercial from './views/ManageCommercial/ManageCommercial'
import ThankYou from './views/ThankYou/ThankYou'

export default (
  <Switch> 
    <Route exact path = '/' component = {HomeLanding}/>
    <Route path = '/services-selection' component = {ServiceSelection}/>
    <Route path = '/residential-home-cleaning' component = {EstimateWizard}/>
    <Route path = '/residential-appointment-scheduling' component = {ResidentialSchedular}/>
    <Route path = '/commercial-home-cleaning' component = {EstimateWizard}/>
    <Route path = '/schedule-succsess' component = {ThankYou}/>
    <Route exact path = '/admin' component = {AdminLanding}/>
    <Route path = '/admin/dash' component = {AdminDash}/>
    <Route path = '/admin/manage-services' component = {ManageServices}/>
    <Route path = '/admin/manage-open-times' component = {ManageOpenTimes}/>
    <Route path = '/admin/manage-commercial' component = {ManageCommercial}/>
    <Route path = '/admin/manage-appointments' component = {ManageAppointments}/>
  </Switch>
)