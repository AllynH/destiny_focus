/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react';
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryTooltip,
  VictoryAxis
} from 'victory';
import KDRChart from './KDRChart'

class PvPChart extends React.Component {
  constructor() {
    super()
    this.getKdr = this.getKdr.bind(this)
    this.state = {
      error: null,
      isLoaded: false,
      jsonResponse: [],
    }
  }

  componentDidMount() {
    fetch('/auth/get/pvp/2/4611686018436136301/')
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
      return (<div>Error: {error.message}</div>)
    } else if (!isLoaded) {
      return (<div>Loading...</div>)
    } else {
      console.log('Render')
      console.log(jsonResponse)
      const kdr = this.getKdr(jsonResponse)
      console.log(kdr)
      return (
        <KDRChart data={kdr}/>
      );
    }
  }
}

export default PvPChart
