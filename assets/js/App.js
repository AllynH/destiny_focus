/* eslint-disable class-methods-use-this */
import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import NavBar from './Components/Nav/Nav'

import ChooseFocus from './Components/Cards/ChooseFocus'
import PvPChart from './Components/PvP/PVPCharts'
import AccountStats from './Components/AccountStats/AccountStats'
import Account from './Components/AccountStats/Account'
import GambitChart from './Components/Gambit/GambitCharts'
import Welcome from './Components/Welcome/Welcome'

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar {...this.props} />
        <Switch>
          <Route path='/auth/choose_focus/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={ChooseFocus} />
          <Route path='/auth/pvp/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={PvPChart} />
          <Route path='/auth/gambit/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={PvPChart} />
          <Route path='/auth/raid/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={PvPChart} />
          <Route path='/auth/account/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={Account} />
          <Route path='/' exact={true} component={Welcome} />
          <Route component={Error} />
        </Switch>
      </>
    )
  }
}

export default App
