/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'
import KDRChart from './KDRChart'
import KDAChart from './KDAChart'

import { useFetch } from '../../Utils/useFetch'

import './style.css'
import Character_Plate from '../CharacterPlate/Character_Plate'
import AccountStats from '../AccountStats/AccountStats'
// import focus_details from '../Cards/WrapCards/'

class PvPChart extends React.Component {
  constructor(props) {
    super(props)
    this.getKdr = this.getKdr.bind(this)
    this.state = {
      error: null,
      isLoaded: false,
      jsonResponse: [],
    }
  }

  componentDidMount() {
    const { membershipType, membershipId } = this.props.match.params

    // console.log('PVPCharts componentDidMount:')
    // console.log(this.props)
    // console.log(membershipType)
    // console.log(membershipId)
    // // console.log(focus_details)
    // // console.log(focus_details.Crucible)
    // console.log('PVPCharts componentDidMount:')

    const apiUrl = `/auth/get/pvp/${membershipType}/${membershipId}`

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
      console.log(`Kill / Death ratio: ${kdr}. For game: ${index}.`)
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

  // getStats(jsonResponse) {
  //   const kdr = []
  //   const kills = []
  //   const deaths = []
  //   const assists = []
  //   const myArray = jsonResponse.Response.activities
  //   myArray.forEach((element, index) => {
  //     const _kdr = element.values.killsDeathsRatio.basic.displayValue
  //     const _deaths = element.values.deaths.basic.displayValue
  //     const _kills = element.values.kills.basic.displayValue
  //     const _assists = element.values.assists.basic.displayValue
  //     if (kills === '0' && deaths === '0') {
  //       return true
  //     }
  //     // console.log(`Kill / Death ratio: ${_kdr}. For game: ${index}.`)
  //     const kdrDetails = {
  //       x: index + 1,
  //       y: parseFloat(_kdr),
  //       l: 'KDR',
  //     }
  //     const kDetails = {
  //       x: index + 1,
  //       y: parseFloat(_kills),
  //       l: 'kills',
  //       _kills,
  //       _deaths,
  //       _assists,
  //       _kdr,
  //     }
  //     const dDetails = {
  //       x: index + 1,
  //       y: parseFloat(_deaths),
  //       l: 'deaths',
  //     }
  //     const assistsDetails = {
  //       x: index + 1,
  //       y: parseFloat(_assists),
  //       l: 'assists',
  //     }
  //     kdr.push(kdrDetails)
  //     kills.push(kDetails)
  //     deaths.push(dDetails)
  //     assists.push(assistsDetails)
  //   })
  //   const stats = {
  //     kdr,
  //     kills,
  //     deaths,
  //     assists,
  //   }
  //   console.log('Returning stats:')
  //   console.log(stats)
  //   return stats
  // }

  // getKills(jsonResponse) {
  //   const killsList = []
  //   const myArray = jsonResponse.Response.activities
  //   myArray.forEach((element, index) => {
  //     const kdr = element.values.kills.basic.displayValue
  //     const deaths = element.values.deaths.basic.displayValue
  //     console.log(`Kills count: ${kdr}. For game: ${index}.`)
  //     const kdrDetails = { kdr, game: index + 1, deaths }
  //     killsList.push(kdrDetails)
  //   })
  //   return killsList
  // }

  // getStat(jsonResponse, stat) {
  //   const killsList = []
  //   const myArray = jsonResponse.Response.activities
  //   myArray.forEach((element, index) => {
  //     const stats = element.values.stat.basic.displayValue
  //     console.log(`Kills count: ${kdr}. For game: ${index}.`)
  //     const kdrDetails = { kdr, game: index + 1 }
  //     killsList.push(kdrDetails)
  //   })
  //   return killsList
  // }

  render() {
    const { error, isLoaded, jsonResponse } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      // console.log('Render')
      // console.log(jsonResponse)
      const kdr = this.getKdr(jsonResponse)
      // const stats = this.getStats(jsonResponse)
      // console.log(kdr)


      const { membershipType, membershipId } = this.props.match.params
      // const allTimeApiUrl = `/auth/get/historical_stats_alltime/${membershipType}/${membershipId}`
      // const lastSeasonApiUrl = `/auth/get/historical_stats/${membershipType}/${membershipId}`
      // const allTimeScope = 'allTime'
      // const seasonScope = 'daily'
      // const allTimeHEading = 'LIFETIME STATS'
      // const seasonHEading = 'LAST MONTH STATS'

      const statsData = {
        allTime: {
          apiUrl: `/auth/get/historical_stats_alltime/${membershipType}/${membershipId}`,
          scope: 'allTime',
          heading: 'LIFETIME STATS',
          subHeading: 'LIFETIME',
        },
        season: {
          apiUrl: `/auth/get/historical_stats/${membershipType}/${membershipId}`,
          scope: 'daily',
          heading: 'LAST MONTH STATS',
          subHeading: 'LAST MONTH',
        },
      }

      const { allTime, season } = statsData

      return (
        <div>
          <div className='card-wrapper'>
            <KDRChart title={'K/D Ratio'} data={kdr} {...this.props}/>
            <AccountStats {...this.props} subHeading={allTime.subHeading} heading={allTime.heading} scope={allTime.scope} apiUrl={allTime.apiUrl} />
            <AccountStats {...this.props} subHeading={season.subHeading} heading={season.heading} scope={season.scope} apiUrl={season.apiUrl} />
          </div>
          <Character_Plate />
        </div>
      )
    }
  }
}

export default PvPChart
