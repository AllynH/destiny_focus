import React from 'react'
import { Switch, Route } from 'react-router-dom'

import NavBar from './Components/Nav/Nav'

// import ChooseFocus from './Components/Cards/ChooseFocus'
import PvPChart from './Components/PvP/PVPCharts'
import Account from './Components/AccountStats/Account'
import Welcome from './Components/Welcome/Welcome'
import FaqContent from './Components/FAQ'
import CharacterSelect from './Components/CharacterSelect'
import PvpSplash from './Components/PGCR_Splash/SelectPgcr'
import GoogleAnalytics from './Components/Analytics/GoogleAnalytics'
import FlipCardDeck from './Components/FlipCard/FlipCardDeck'
import ViewLikes from './Components/Likes/ViewLikes'
import ClanRoster from './Components/Clan/ClanRoster'
import About from './Components/About/index'
import AdminPanel from './Components/Admin/AdminPanel'
import Changelog from './Components/Changelog'
import Support from './Components/Support/Support'


class App extends React.Component {
  render() {
    return (
      <>
        <Route component={GoogleAnalytics}/>
        <Route path='/:auth?/:gameMode?/:membershipType([1|2|3|4|5])?/:membershipId([0-9]+)?/:characterId([0-9]+)?/' {...this.props} component={NavBar}/>
        <Switch>
          <Route path='/auth/character_select/' exact={true} component={CharacterSelect} />
          <Route path='/auth/choose_focus/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={FlipCardDeck} />
          <Route path='/auth/likes/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={ViewLikes} />
          <Route path='/auth/roster/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={ClanRoster} />
          <Route path='/auth/pvp/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={PvPChart} />
          <Route path='/auth/pvpcomp/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={PvPChart} />
          <Route path='/auth/gambit/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={PvPChart} />
          <Route path='/auth/raid/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={PvPChart} />
          <Route path='/auth/trials/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={PvPChart} />
          <Route path='/auth/ironbanner/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={PvPChart} />
          <Route path='/auth/nightfall/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={PvPChart} />
          <Route path='/auth/dungeon/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={PvPChart} />
          <Route path='/auth/account/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/' component={Account} />
          <Route path='/auth/pgcr/:activityId([0-9]+)/'component={PvpSplash} />
          <Route path='/pgcr/:activityId([0-9]+)/'component={PvpSplash} />
          <Route path='/logout/' exact={true} component={Welcome} />
          <Route path='/about/' exact={true}  component={About} />
          <Route path='/support/' exact={true} component={Support} />
          <Route path='/changelog/' exact={true} component={Changelog} />
          <Route path='/faq/' exact={true} component={FaqContent} />
          <Route path='/' exact={true} component={Welcome} />
          <Route path='/auth/admin/' exact={true} component={AdminPanel} />
          <Route component={Error} />
        </Switch>
      </>
    )
  }
}

export default App
