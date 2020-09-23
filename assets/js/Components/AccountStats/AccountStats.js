/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react';

import { useFetch } from '../../Utils/useFetch'

import './style.css'
import Character_Plate from '../CharacterPlate/Character_Plate';
import DisplayAccountStats from './DisplayAccountStats'

class AccountStats extends React.Component {
  constructor(props) {
    super(props)
    this.getStats = this.getStats.bind(this)
    this.state = {
      error: null,
      isLoaded: false,
      jsonResponse: [],
    }
  }

  componentDidMount() {
    const { membershipType, membershipId } = this.props.match.params
    // console.log(membershipType)
    // console.log(membershipId)

    const apiUrl = `/auth/get/historical_stats_alltime/${membershipType}/${membershipId}`

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

  getStats(jsonResponse) {

    // stats = {

    //     // Activities ratio:
    //     activitiesEntered
    //     activitiesWon
    //     TimePlayed
    
    //     killsDeathsAssists
    //     killsDeathsRatio
    //     kills
    //     kills_pga
    //     deaths
    //     deaths_pga
    //     assists
    //     assists_pga
    //     efficiency
    //     winLossRatio
    
    //     // Best game metrics:
    //     averageKillDistance
    //     averageLifespan
    //     bestSingleGameKills
    //     longestKillDistance
    //     longestKillSpree
    //     longestSingleLife
    //     mostPrecisionKills
    //     precisionKills
    //     precisionKills_pga
    //     suicides
    //     suicides_pga
    
    //     weaponBestType
    //     weaponKillsMelee
    //     weaponKillsMelee_pga
    
    
        
    // }

    console.log(jsonResponse.Response.allPvP.allTime.activitiesEntered.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.activitiesWon.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.allParticipantsTimePlayed.basic.displayValue)

    console.log(jsonResponse.Response.allPvP.allTime.assists.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.assists.pga.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.averageKillDistance.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.averageLifespan.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.bestSingleGameKills.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.deaths.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.deaths.pga.displayValue)

    console.log(jsonResponse.Response.allPvP.allTime.efficiency.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.kills.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.kills.pga.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.killsDeathsAssists.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.killsDeathsRatio.basic.displayValue)

    console.log(jsonResponse.Response.allPvP.allTime.longestKillDistance.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.longestKillSpree.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.longestSingleLife.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.mostPrecisionKills.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.precisionKills.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.precisionKills.pga.displayValue)

    console.log(jsonResponse.Response.allPvP.allTime.suicides.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.suicides.pga.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.weaponBestType.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.weaponKillsMelee.basic.displayValue)
    console.log(jsonResponse.Response.allPvP.allTime.weaponKillsMelee.pga.displayValue)

    console.log(jsonResponse.Response.allPvP.allTime.winLossRatio.basic.displayValue)

    return true
  }


  render() {
    const { error, isLoaded, jsonResponse } = this.state
    if (error) {
      return (<div>Error: {error.message}</div>)
    } else if (!isLoaded) {
      return (<div>Loading...</div>)
    } else {
      console.log('Render')
      console.log(jsonResponse)
      const stats = jsonResponse.Response.allPvP.allTime
      console.log(stats)
      return (
        <div>
        <DisplayAccountStats stats={stats}/>
        <Character_Plate/>
        </div>
      );
    }
  }
}

export default AccountStats
