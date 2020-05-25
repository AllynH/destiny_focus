/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react';
import KDRChart from './KDRChart'
import KDAChart from './KDAChart'
import './style.css'

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
    const url = window.location.href.replace(/.*pvp/).split('/');
    console.log(`${url[1]} ${url[2]}`);

    const membershipType = url[1];
    const membershipId = url[2];
    const apiUrl = `/auth/get/pvp/${membershipType}/${membershipId}`

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


  getStats(jsonResponse) {
    const kdr = []
    const kills = []
    const deaths = []
    const assists = []
    const myArray = jsonResponse.Response.activities
    myArray.forEach((element, index) => {
      const _kdr = element.values.killsDeathsRatio.basic.displayValue
      const _deaths = element.values.deaths.basic.displayValue
      const _kills = element.values.kills.basic.displayValue
      const _assists = element.values.assists.basic.displayValue
      if (kills === '0' && deaths === '0') {
        return true
      }
      // console.log(`Kill / Death ratio: ${_kdr}. For game: ${index}.`)
      const kdrDetails = {
        x: index + 1,
        y: parseFloat(_kdr),
        l: 'KDR',
      }
      const kDetails = {
        x: index + 1,
        y: parseFloat(_kills),
        l: 'kills',
        _kills,
        _deaths,
        _assists,
        _kdr,
      }
      const dDetails = {
        x: index + 1,
        y: parseFloat(_deaths),
        l: 'deaths',
      }
      const assistsDetails = {
        x: index + 1,
        y: parseFloat(_assists),
        l: 'assists',
      }
      kdr.push(kdrDetails)
      kills.push(kDetails)
      deaths.push(dDetails)
      assists.push(assistsDetails)
    })
    const stats = {
      kdr, kills, deaths, assists,
    }
    console.log('Returning stats:')
    console.log(stats)
    return stats
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
      const stats = this.getStats(jsonResponse)
      console.log(kdr)
      return (
        <div className='card-wrapper'>
          <div className='float-below'>
          <div className='kdr-chart'>
            <KDRChart data={kdr}/>
          </div>
          </div>
          <div className='kda-chart'>
            <KDAChart kills={stats.kills} deaths={stats.deaths} assists={stats.assists} />
          </div>
          <div className='kda-chart-2'>
            <KDAChart kills={stats.kills} deaths={stats.deaths} assists={stats.assists} />
          </div>
        </div>
      );
    }
  }
}

export default PvPChart
