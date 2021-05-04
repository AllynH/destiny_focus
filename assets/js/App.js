import React from 'react'
import {Switch, Route} from 'react-router-dom'

import NavBar from './Components/Nav/Nav'

import ChooseFocus from './Components/Cards/ChooseFocus'
import PvPChart from './Components/PvP/PVPCharts'
import Account from './Components/AccountStats/Account'
import Welcome from './Components/Welcome/Welcome'
import FaqContent from './Components/FAQ'
import CharacterSelect from './Components/CharacterSelect'
import PvpSplash from './Components/PGCR_Splash/SelectPgcr'

import GoogleAnalytics from './Components/Analytics/GoogleAnalytics'

class App extends React.Component {
  render() {
    return (
      <>
        <Route component={GoogleAnalytics}/>
        <Route path='/:auth?/:gameMode?/:membershipType([1|2|3|4|5])?/:membershipId([0-9]+)?/:characterId([0-9]+)?/' {...this.props} component={NavBar}/>
        <Switch>
          <Route path='/auth/character_select/'exact={true} component={CharacterSelect} />
          <Route path='/auth/choose_focus/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={ChooseFocus} />
          <Route path='/auth/pvp/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={PvPChart} />
          <Route path='/auth/gambit/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={PvPChart} />
          <Route path='/auth/raid/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={PvPChart} />
          <Route path='/auth/account/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={Account} />
          <Route path='/auth/pgcr/:activityId([0-9]+)/'component={PvpSplash} />
          <Route path='/pgcr/:activityId([0-9]+)/'component={PvpSplash} />
          <Route path='/logout' exact={true} component={Welcome} />
          <Route path='/about/' exact={true} />
          <Route path='/faq/' exact={true} component={FaqContent} />
          <Route path='/' exact={true} component={Welcome} />
          <Route component={Error} />
        </Switch>
      </>
    )
  }
}

export default App
