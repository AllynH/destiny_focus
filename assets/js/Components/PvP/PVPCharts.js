/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'
import KDRChart from './KDRChart'
import KDAChart from './KDAChart'

import './style.css'
import ClickableCharacterList from '../CharacterSelect/ClickableCharacterList'
// import { getUrlDetails } from '../../Utils/HelperFunctions'
import AccountStats from '../AccountStats/AccountStats'
import PGCR from '../PGCR/PGCR'
import PgcrSummary from './PgcrSummary'
import { ViewStore } from '../../Utils/ViewStore'
import Spinner from '../../Utils/Loading/Spinner'
import { GetPVPData, GetGambitData, GetRaidData } from '../../Utils/API/API_Requests'
import { statsData } from '../../Data/statsData'
import { getUrlDetails } from '../../Utils/HelperFunctions'

class PvPChart extends React.Component {
  constructor(props) {
    console.log('PvPChart')
    console.log(props)
    super(props)
    this.getKdr = this.getKdr.bind(this)
    this.state = {
      error: null,
      isLoaded: false,
      jsonResponse: [],
      ...this.state,
    }
  }

  componentDidMount(props) {
    this.fetchPVPData()
  }

  fetchPVPData = async () => {
    const { membershipType, membershipId, characterId, gameMode } = getUrlDetails()

    switch (gameMode) {
      case 'gambit':
        {
          const response = await GetGambitData({
            params: { membershipType, membershipId, characterId },
          })
          this.setState({
            isLoaded: true,
            jsonResponse: response,
          })
        }
        break
      case 'raid':
        {
          const gameMode = 4
          const response = await GetRaidData({
            params: { membershipType, membershipId, characterId, gameMode },
          })
          this.setState({
            isLoaded: true,
            jsonResponse: response,
          })
        }
        break
      case 'pvp': {
        const response = await GetPVPData({ params: { membershipType, membershipId, characterId } })
        this.setState({
          isLoaded: true,
          jsonResponse: response,
        })
        break
      }
      default: {
        const response = await GetPVPData({ params: { membershipType, membershipId, characterId } })
        this.setState({
          isLoaded: true,
          jsonResponse: response,
        })
      }
    }
  }

  getKdr(jsonResponse) {
    console.log('PvPChart - data:')
    console.log(jsonResponse)
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
      kdrList.push(kdrDetails)
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
      console.log(`Kill / Death ratio: ${precision}. For game: ${index}.`)
      const precisionDetails = {
        x: index + 1,
        y: parseFloat(precision),
        deaths,
        kills,
        assists,
      }
      precisionList.push(precisionDetails)
    })
    return precisionList
  }

  makePGCR(jsonResponse) {
    const pgcrList = []
    const myArray = jsonResponse.Response.activities
    const pgcr_list = myArray.map((p, index) => (
      <li className={'pgcr pgcr-item'} key={index}>
        <PGCR {...p} />
      </li>
    ))
    return pgcr_list
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

    console.log('PvP JSON response:')
    console.log(jsonResponse)

    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <Spinner />
    } else {
      const kdr = this.getKdr(jsonResponse)
      const myPgcr = this.makePGCR(jsonResponse)
      const { membershipType, membershipId } = this.props.match.params
      const { focusReducer } = this.state || {}
      const { allTime, season } = statsData

      return (
        <>
          {/* Put character lict on top? */}
          {/* <ClickableCharacterList memberships={{ membershipId, membershipType }} /> */}
          <div>
            <this.Headings />
            <div className='chart-wrapper'>
              <div className='chart chart-heading-wrap'>
                <div className='chart chart-wrap'>
                  <h3>Recent matches - K/D R data</h3>
                  <KDRChart title={'K/D Ratio'} data={kdr} {...this.props} />
                  <h1>DETAILED STATS FOR LAST 10 GAMES:</h1>
                  <PgcrSummary {...this.props} />
                </div>
              </div>
              <div className='pgcr activity-wrapper'>
                <div className='activity-list-wrapper'>
                  <h3>Recent matches - PGCR's</h3>
                  <ul className={'pgcr activity-list'}>{myPgcr}</ul>
                </div>
              </div>
              {/* <ViewStore /> */}
            </div>
          </div>
        </>
      )
    }
  }
}

export default PvPChart
