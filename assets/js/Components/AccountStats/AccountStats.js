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
    // console.log('Testing props:')
    // console.log(this.props)
    // console.log('Testing props.match:')
    // console.log(this.props.match)
    // console.log('Testing props.match.params:')
    // console.log(this.props.match.params)
    const { membershipType, membershipId } = this.props.match.params
    // console.log(membershipType)
    // console.log(membershipId)
    const { apiUrl } = this.props
    // console.log(`AccountStats: apiUrl: ${apiUrl}`)

    // const apiUrl = `/auth/get/historical_stats_alltime/${membershipType}/${membershipId}`

    // const { error, loading, data } = useFetch(apiUrl)
    // console.log(error)
    // console.log(loading)
    // console.log(data)

    fetch(apiUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            jsonResponse: result,
          })
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error,
          })
        },
      )
  }

  render() {
    const { error, isLoaded, jsonResponse } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      const { scope } = this.props
      const { props } = this
      const stats = jsonResponse.Response.allPvP[scope]
      // console.log('Render AccountStats')
      // console.log(jsonResponse)
      // console.log(scope)
      // console.log(stats)
      return (
        <div>
          <div className='stats-wrapper'>
            <div className='stats-individual'>
              <DisplayStats
                heading={props.heading}
                subHeading={props.subHeading}
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
                big_name={'AVG. GAME KILLS'}
                big_value={stats.kills.pga.displayValue}
                name_1={'DEATHS'}
                value_1={stats.deaths.pga.displayValue}
                name_2={'K/D R'}
                value_2={parseFloat(
                  stats.kills.pga.displayValue / stats.deaths.pga.displayValue,
                ).toFixed(2)}
              />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default AccountStats
