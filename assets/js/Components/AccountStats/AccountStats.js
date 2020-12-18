/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'

import { useFetch } from '../../Utils/useFetch'

import './style.css'
import Character_Plate from '../CharacterPlate/Character_Plate'
import DisplayAccountStats from './DisplayAccountStats'
import DisplayStats from './DisplayStats'
import Shimmer from '../../Utils/Loading/Shimmer'
import { GetStatsData, GetStatsAllTime } from '../../Utils/API/API_Requests'

class AccountStats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      jsonResponse: [],
    }
  }

  componentDidMount() {
    this.fetchStatsData()
  }

  componentDidUpdate(pp) {
    if (this.props.season !== pp.season) {
      this.fetchStatsData()
    }
  }

  fetchStatsData = async () => {
    const { membershipType, membershipId, characterId } = this.props.match.params
    const { scope } = this.props
    const { season } = this.props
    const gameMode = 5
    console.log('AccountStats - season test.')
    console.log(season)

    if (scope === 'allTime') {
      const response = await GetStatsAllTime({
        params: { membershipType, membershipId, characterId },
      })
      this.setState({
        isLoaded: true,
        jsonResponse: response,
      })
    } else {
      const response = await GetStatsData({
        params: {
          membershipType,
          membershipId,
          characterId,
          season,
          gameMode,
        },
      })
      this.setState({
        isLoaded: true,
        jsonResponse: response,
      })
    }
  }

  _checkResponse(state) {
    const { jsonResponse, isLoaded } = state
    if (isLoaded && jsonResponse.ErrorCode > 1) {
      console.log('Caught error!')
      console.log(jsonResponse)
      this.setState({
        error: true,
        message: jsonResponse.message,
      })
    } else if (jsonResponse !== 'undefined') {
      console.log('No error found.')
      console.log(jsonResponse.ErrorCode)
      console.log(jsonResponse.message)
    } else {
      console.log(jsonResponse)
    }
  }

  render() {
    const { error, isLoaded, jsonResponse } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <Shimmer />
    } else {
      // console.log(this.state)
      const { scope } = this.props
      const { props } = this
      const stats = jsonResponse.Response.allPvP[scope]
      // console.log('Render AccountStats')
      // console.log(jsonResponse)
      // console.log(scope)
      // console.log(stats)
      return (
        <>
          <div className='stats-wrapper'>
            <div className='stats-individual'>
              <DisplayStats
                // heading={props.heading}
                subHeading={props.subHeading}
                games_played={stats.activitiesEntered.basic.displayValue}
                games_won={stats.activitiesWon.basic.displayValue}
                big_name={'TOTAL KILLS'}
                big_value={stats.kills.basic.displayValue}
                name_1={'DEATHS'}
                value_1={stats.deaths.basic.displayValue}
                name_2={'K/D R'}
                value_2={stats.killsDeathsRatio.basic.displayValue}
              />
            </div>

            <div className='stats-individual'>
              <DisplayStats
                // heading={''}
                subHeading={'AVG. GAME STATS'}
                games_played={stats.activitiesEntered.basic.displayValue}
                games_won={stats.activitiesWon.basic.displayValue}
                big_name={'AVG. GAME KILLS'}
                big_value={stats.kills.pga.displayValue}
                name_1={'DEATHS'}
                value_1={stats.deaths.pga.displayValue}
                name_2={'K/D R'}
                value_2={parseFloat(
                  stats.kills.pga.displayValue / stats.deaths.pga.displayValue,
                ).toFixed(2) && 0}
              />
            </div>
          </div>
        </>
      )
    }
  }
}

export default AccountStats
