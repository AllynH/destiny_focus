/* eslint-disable class-methods-use-this */
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import WrapCards from './Components/Cards/WrapCards'
import PvPChart from './Components/PvP/PVPCharts'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // componentDidMount() {
  //   this.mounted = true
  //   this.init()
  // }

  // init() {
  //   const { match } = this.props.match.params
  //   console.log('Logging parameters.')
  //   console.log(match)
  // }

  render() {
    return (
      <Switch>
        <Route path='/auth/choose_focus/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/' component={WrapCards} />
        <Route path='/auth/pvp/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/' component={PvPChart} />
        <Route component={Error} />
      </Switch>
    )
  }
}

export default App
