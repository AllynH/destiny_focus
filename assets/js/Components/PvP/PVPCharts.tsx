/* eslint-disable no-console */
import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import { DestinyActivityHistoryResults, DestinyHistoricalStatsPeriodGroup } from 'bungie-api-ts/destiny2/interfaces'
import { ServerResponse } from 'bungie-api-ts/destiny2'

import KDRChart from './KDRChartScatter'

import SpinnerDualRing from '../../Utils/Loading/SpinnerDualRing'
import ClickableCharacterList from '../CharacterSelect/ClickableCharacterList'
import PgcrList from '../PGCR/PgcrList'
import PgcrSummary from './PgcrSummary'
// import { ViewStore } from '../../Utils/ViewStore'
import Spinner from '../../Utils/Loading/Spinner'
import { GetRaidData } from '../../Utils/API/API_Requests'
import { getUrlDetails } from '../../Utils/HelperFunctions'
import { FOCUS_DETAILS } from '../Focus/FocusDetails'

import GetProgressions from '../Profile/GetProgressions'
import FocusChoiceHeader from './FocusChoiceHeader'
import WinLossSummary from '../WinLossSummary'

// Custom types:
import { CharacterPropsInterface } from '../../Data/CharacterProps'
import { FocusReducerInterface } from '../../Redux/Reducers/focus'
import { AllowedWinLoss } from '../WinLossSummary/types'
import { FocusDetailKey } from '../Focus/types'

import './style.css'


// Set the update time for refreshing the data:
const UPDATE_TIME = Number(process.env.DF_UPDATE_TIME) || 20

const fetchPVPData = async () => {
  const {
    membershipType, membershipId, characterId, gameMode,
  } = getUrlDetails()

    // Cast to an Array of FocusDetailKeys[] as .filter returns an array - hopefully with only 1 item filteredActivityKeys[0]
    const filteredActivityKeys: FocusDetailKey[]
      = Object.keys(FOCUS_DETAILS)
      .filter((key: FocusDetailKey) => FOCUS_DETAILS[key].focus === gameMode) as FocusDetailKey[]

      const { activityMode } = FOCUS_DETAILS[filteredActivityKeys[0]]

  const response: ServerResponse<DestinyActivityHistoryResults> = await GetRaidData({
    params: {
      membershipType,
      membershipId,
      characterId,
      gameMode: activityMode,
    },
  })

  return response
}

interface kdrDetailsInterface {
  x: number,
  y: number,
  deaths: number,
  kills: number,
  assists: number,
}


interface PvPChartStateInterface {
  error: null | boolean,
  errorMessage?: string
  isLoaded: boolean,
  timerId: number,
  updating: boolean,
  updateCount: number,
  jsonResponse: ServerResponse<DestinyActivityHistoryResults>,
}

class PvPChart extends React.Component<RouteComponentProps & { focusReducer: FocusReducerInterface } & RouteComponentProps, PvPChartStateInterface>  {
    countdown: number

    timerId: NodeJS.Timer

  constructor(props: RouteComponentProps & { focusReducer: FocusReducerInterface }) {
    super(props)
    this.countdown = 0

    this.checkError = this.checkError.bind(this)
    this.getKdr = this.getKdr.bind(this)
    this.getWinLoss = this.getWinLoss.bind(this)
    this.getWinLossPercent = this.getWinLossPercent.bind(this)
    this.Headings = this.Headings.bind(this)
    this.state = {
      error: null,
      errorMessage: '',
      isLoaded: false,
      timerId: null,
      updateCount: 0,
      updating: false,
      jsonResponse: {},
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
      const data: ServerResponse<DestinyActivityHistoryResults> = await fetchPVPData()
      this.checkError(data)
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
        error: true,
        errorMessage: data.error,
      })
    }
  }

  /**
   * TODO: Add more data to this error.
   * @param jsonResponse
   * @returns Returns a HTML div - should return a component:
   */
  checkError = (jsonResponse: ServerResponse<DestinyActivityHistoryResults>) => {
    const { Response } = jsonResponse
    if (Response && Object.keys(Response).length === 0 && Response.constructor === Object) {
      const errorMessage = 'No activities found on this character!'
      this.setState({...this.state, error: true, errorMessage})
      return false
    }
    return true
  }

  getKdr = (jsonResponse: ServerResponse<DestinyActivityHistoryResults>) => {
    const kdrList: kdrDetailsInterface[] = []
    const myArray = jsonResponse.Response.activities
    myArray.forEach((element: DestinyHistoricalStatsPeriodGroup, index: number) => {
      const kdr = Number(element.values.killsDeathsRatio.basic.displayValue)
      const deaths = Number(element.values.deaths.basic.displayValue)
      const kills = Number(element.values.kills.basic.displayValue)
      const assists = Number(element.values.assists.basic.displayValue)
      if (kills === 0 && deaths === 0) {
        return true
      }
      // console.log(`Kill / Death ratio: ${kdr}. For game: ${index}.`)
      const kdrDetails = {
        x: index + 1,
        y: kdr,
        deaths,
        kills,
        assists,
      }
      return kdrList.push(kdrDetails)
    })
    return kdrList
  }

  /**
   * This function calculated the standing
   * @param jsonResponse
   * @returns Returns an Array of either 1 or 0. Where: 0 = win, 1 = loss.
   */
  getWinLoss = (jsonResponse: ServerResponse<DestinyActivityHistoryResults>): AllowedWinLoss[] => {
    if (jsonResponse.Response.activities[0].values.standing) {
      const myArray = jsonResponse.Response.activities
      const winLossValues = myArray.map((element: DestinyHistoricalStatsPeriodGroup) => (element.values.standing.basic.value as AllowedWinLoss))
      return winLossValues
    }
    return undefined
  }

  /**
   *
   * @param jsonResponse
   * @returns A string saying: '60%'
   */
  getWinLossPercent = (jsonResponse: ServerResponse<DestinyActivityHistoryResults>): string => {
    if (jsonResponse.Response.activities[0].values.standing) {
      const myArray = jsonResponse.Response.activities
      const winLossValues = myArray.map((element: DestinyHistoricalStatsPeriodGroup) => (element.values.standing.basic.value))
      const winLossCount = winLossValues.reduce((acc, curr) => acc + curr)
      // In this case a loss = 1, so we need to account for this:
      const winCount = (winLossValues.length - winLossCount)
      const winLossPercent = `${((winCount / winLossValues.length) * 100).toFixed(2)  }%`
      return winLossPercent
    }
    return undefined
  }

  getPrecision = (jsonResponse: ServerResponse<DestinyActivityHistoryResults>): kdrDetailsInterface[] => {
    const precisionList: kdrDetailsInterface[] = []
    const myArray = jsonResponse.Response.activities
    myArray.forEach((element: DestinyHistoricalStatsPeriodGroup, index: number) => {
      const precision = Number(element.values.killsDeathsRatio.basic.displayValue)
      const deaths = Number(element.values.deaths.basic.displayValue)
      const kills = Number(element.values.kills.basic.displayValue)
      const assists = Number(element.values.assists.basic.displayValue)
      if (kills === 0 && deaths === 0) {
        return true
      }
      // console.log(`Kill / Death ratio: ${precision}. For game: ${index}.`)
      const precisionDetails = {
        x: index + 1,
        y: precision,
        deaths,
        kills,
        assists,
      }
      return precisionList.push(precisionDetails)
    })
    return precisionList
  }

  Headings = () => {
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
    const { focusReducer } = this.props || {}

    if (error) {
      return <div>Error: {this.state.errorMessage}</div>
    }
    if (!isLoaded) {
      return <Spinner />
    }
      const kdr = this.getKdr(jsonResponse)
      const getStanding = !!jsonResponse.Response.activities[0].values.standing
      const winLossArray: AllowedWinLoss[] = this.getWinLoss(jsonResponse)
      const winLossPercent: string = this.getWinLossPercent(jsonResponse)

      const {
        membershipType, membershipId, characterId,
      } = this.props.match.params as CharacterPropsInterface

      return (
        <>
          <FocusChoiceHeader />
          <div className='reload-progress-wrapper'>
            {this.state.updating ? (
              <div className='reload-animation-box'>
                <SpinnerDualRing />
              </div>
            ) : (
              <div className='round-time-bar' data-style='smooth' style={{ '--duration': UPDATE_TIME } as React.CSSProperties } >
                <div></div>
              </div>
            )}
          </div>
          <GetProgressions updateCount={this.state.updateCount} />
          {getStanding && < WinLossSummary winLossArray={winLossArray} winLossPercent={winLossPercent} />}
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

const mapStateToProps = (state: FocusReducerInterface) => ({
  focus: state.focus,
  // killDeathRatio: state.killDeathRatio,
  // winLossRatio: state.winLossRatio,
  // precisionKillsCount: state.precisionKillsCount,
  // avgLifeTime: state.avgLifeTime,
  focusReducer: state.focusReducer,
})

export default connect(mapStateToProps)(PvPChart)
// export default PvPChart
