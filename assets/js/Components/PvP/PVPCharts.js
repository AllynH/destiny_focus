/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'
import { connect } from 'react-redux'

import KDRChart from './KDRChartScatter'

import './style.css'
import ReloadProgressBar from '../Progress/ReloadProgressBar'
import SpinnerDualRing from '../../Utils/Loading/SpinnerDualRing'
import ClickableCharacterList from '../CharacterSelect/ClickableCharacterList'
import PgcrList from '../PGCR/PgcrList'
import PgcrSummary from './PgcrSummary'
// import { ViewStore } from '../../Utils/ViewStore'
import Spinner from '../../Utils/Loading/Spinner'
import { GetPVPData, GetGambitData, GetRaidData } from '../../Utils/API/API_Requests'
import { statsData } from '../../Data/statsData'
import { getUrlDetails } from '../../Utils/HelperFunctions'

import GetProgresions from '../Profile/GetProgressions'

const UPDATE_TIME = 20
const fetchPVPData = async () => {
  const {
    membershipType, membershipId, characterId, gameMode,
  } = getUrlDetails()

  switch (gameMode) {
    case 'gambit': {
      const response = await GetGambitData({
        params: { membershipType, membershipId, characterId },
      })
      return response
    }
    case 'raid': {
      const newGameMode = 4
      const response = await GetRaidData({
        params: {
          membershipType,
          membershipId,
          characterId,
          gameMode: newGameMode,
        },
      })
      return response
    }
    case 'trials': {
      const newGameMode = 84
      const response = await GetRaidData({
        params: {
          membershipType,
          membershipId,
          characterId,
          gameMode: newGameMode,
        },
      })
      return response
    }
    case 'dungeon': {
      const newGameMode = 82
      const response = await GetRaidData({
        params: {
          membershipType,
          membershipId,
          characterId,
          gameMode: newGameMode,
        },
      })
      return response
    }
    case 'nightfall': {
      const newGameMode = 46
      const response = await GetRaidData({
        params: {
          membershipType,
          membershipId,
          characterId,
          gameMode: newGameMode,
        },
      })
      return response
    }
    case 'pvp': {
      const response = await GetPVPData({ params: { membershipType, membershipId, characterId } })
      return response
    }
    default: {
      const response = await GetPVPData({ params: { membershipType, membershipId, characterId } })
      return response
    }
  }
}

class PvPChart extends React.Component {
  constructor(props) {
    super(props)
    this.countdown = 0

    this.getKdr = this.getKdr.bind(this)
    this.state = {
      error: null,
      isLoaded: false,
      timerId: null,
      updateCount: 0,
      jsonResponse: [],
      ...this.state,
    }
  }

  componentDidMount() {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
    this.timerId = setInterval(() => this.tick(), 1000)
  }

  async tick() {
    // Prevent ticking when updating:
    if (!this.state.updating) {
      let newCountdown = this.countdown - 1
      if (newCountdown < 0) {
        this.setState({ ...this.state, updating: true })
        console.log('Updating!')
        try {
          await this.update()
        } catch (error) {
          console.log(error)
        } finally {
          newCountdown = UPDATE_TIME
          this.setState({ ...this.state, updating: false })
        }
      }
      this.countdown = newCountdown
    }
  }

  async update() {
    try {
      const data = await fetchPVPData()
      this.setState({
        ...this.state,
        updateCount: this.state.updateCount + 1,
        jsonResponse: data,
        isLoaded: true,
      })
    } catch (error) {
      console.log(error)
      const data = { error: 'Error of some sort fetching data...' }
      this.setState({
        ...this.state,
        updateCount: this.state.updateCount + 1,
        jsonResponse: data,
      })
    }
  }

  getKdr(jsonResponse) {
    const kdrList = []
    const myArray = jsonResponse.Response.activities
    myArray.forEach((element, index) => {
      const kdr = element.values.killsDeathsRatio.basic.displayValue
      const deaths = element.values.deaths.basic.displayValue
      const kills = element.values.kills.basic.displayValue
      const assists = element.values.assists.basic.displayValue
      if (kills === '0' && deaths === '0') {
        return true
      }
      // console.log(`Kill / Death ratio: ${kdr}. For game: ${index}.`)
      const kdrDetails = {
        x: index + 1,
        y: parseFloat(kdr),
        deaths,
        kills,
        assists,
      }
      return kdrList.push(kdrDetails)
    })
    return kdrList
  }

  getPrecision(jsonResponse) {
    const precisionList = []
    const myArray = jsonResponse.Response.activities
    myArray.forEach((element, index) => {
      const precision = element.values.killsDeathsRatio.basic.displayValue
      const deaths = element.values.deaths.basic.displayValue
      const kills = element.values.kills.basic.displayValue
      const assists = element.values.assists.basic.displayValue
      if (kills === '0' && deaths === '0') {
        return true
      }
      // console.log(`Kill / Death ratio: ${precision}. For game: ${index}.`)
      const precisionDetails = {
        x: index + 1,
        y: parseFloat(precision),
        deaths,
        kills,
        assists,
      }
      return precisionList.push(precisionDetails)
    })
    return precisionList
  }

  Headings() {
    const kdrHeading = 'K/D R data'
    const pgcrHeading = 'Post Game Carnage Reports'
    const heading = (
      <section className='chart-wrapper'>
        <h2>{kdrHeading}</h2>
        <h2>{pgcrHeading}</h2>
      </section>
    )
    return heading
  }

  render() {
    const { error, isLoaded, jsonResponse } = this.state
    const { gameMode } = this.props

    const { focusReducer } = this.props || {}

    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <Spinner />
    } else {
      const kdr = this.getKdr(jsonResponse)
      const {
        membershipType, membershipId, characterId,
      } = this.props.match.params
      // const { focusReducer } = this.state || {}
      // const { allTime, season } = statsData

      return (
        <>
          <div className='reload-progress-wrapper'>
            {this.state.updating ? (
              <div className='reload-animation-box'>
                <SpinnerDualRing />
              </div>
            ) : (
              <div className='round-time-bar' data-style='smooth' style={{ '--duration': UPDATE_TIME } } >
                <div></div>
              </div>
            )}
          </div>
          <GetProgresions />
          {/* Put character list on top? */}
          {/* <ClickableCharacterList memberships={{ membershipId, membershipType }} /> */}
          <div>
            <this.Headings />
            <div className='chart-wrapper'>
              <div className='chart chart-heading-wrap'>
                <div className='chart chart-wrap'>
                  <h1>Recent matches - K/D R data</h1>
                  <KDRChart
                    title={'K/D Ratio'}
                    data={kdr}
                    focusReducer={focusReducer}
                    {...this.props}
                  />
                </div>
                <div className='chart chart-wrap'>
                  <h1>DETAILED STATS FOR LAST 10 GAMES:</h1>
                  <PgcrSummary activityList={jsonResponse} {...this.props} />
                </div>
              </div>
              <div className='pgcr activity-wrapper'>
                <div className='activity-list-wrapper'>
                  <h1>Recent matches - PGCR{"'"}s</h1>
                  <ul className={'pgcr activity-list'}>
                    <PgcrList activityList={jsonResponse} />
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <ClickableCharacterList memberships={{ membershipId, membershipType, characterId }} />
        </>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  focus: state.focus,
  killDeathRatio: state.killDeathRatio,
  winLossRatio: state.winLossRatio,
  precisionKillsCount: state.precisionKillsCount,
  avgLifeTime: state.avgLifeTime,
  focusReducer: state.focusReducer,
})

export default connect(mapStateToProps)(PvPChart)
// export default PvPChart
