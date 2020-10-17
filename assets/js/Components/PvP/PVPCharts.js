/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'
import KDRChart from './KDRChart'
import KDAChart from './KDAChart'

import './style.css'
import Character_Plate from '../CharacterPlate/Character_Plate'
import AccountStats from '../AccountStats/AccountStats'
import PGCR from '../PGCR/PGCR'
import { ViewStore } from '../../Utils/ViewStore'
import Spinner from '../../Utils/Loading/Spinner'
import { GetPVPData } from '../../Utils/API/API_Requests'
import { statsData } from '../../Data/statsData'
// import focus_details from '../Cards/WrapCards/'

class PvPChart extends React.Component {
  constructor(props) {
    super(props)
    this.getKdr = this.getKdr.bind(this)
    this.state = {
      error: null,
      isLoaded: false,
      jsonResponse: [],
      ...this.state,
    }
  }

  componentDidMount() {
    this.fetchPVPData()
  }

  fetchPVPData = async () => {
    const { membershipType, membershipId } = this.props.match.params
    const response = await GetPVPData({ params: { membershipType, membershipId } })

    this.setState({
      isLoaded: true,
      jsonResponse: response,
    })
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
      kdrList.push(kdrDetails)
    })
    return kdrList
  }

  makePGCR(jsonResponse) {
    const pgcrList = []
    const myArray = jsonResponse.Response.activities
    console.log('PGCRs:')
    console.log(myArray[1])
    // const myPgcr = <PGCR props={myArray[1]} />

    const pgcr_list = myArray.map((p, index) => (
      <li className={'pgcr pgcr-item'} key={index}>
        <PGCR {...p} />
      </li>
    ))
    return pgcr_list
  }

  render() {
    const { error, isLoaded, jsonResponse } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <Spinner />
    } else {
      const kdr = this.getKdr(jsonResponse)
      const myPgcr = this.makePGCR(jsonResponse)
      console.log('myPgcr', myPgcr)
      const { membershipType, membershipId } = this.props.match.params

      console.log('PvPChart: FocusReducer')
      const { focusReducer } = this.state || {}
      console.log(focusReducer)
      console.log('PvPChart: FocusReducer')

      const { allTime, season } = statsData

      return (
        <div>
          <div className='chart-wrapper'>
            <KDRChart title={'K/D Ratio'} data={kdr} {...this.props} />
            <AccountStats
              {...this.props}
              subHeading={allTime.subHeading}
              heading={allTime.heading}
              scope={allTime.scope}
              apiUrl={allTime.apiUrl}
            />
            <AccountStats
              {...this.props}
              subHeading={season.subHeading}
              heading={season.heading}
              scope={season.scope}
              apiUrl={season.apiUrl}
            />

            {/* <ViewStore /> */}
          </div>
          <ul className={'pgcr pgcr-list'}>{myPgcr}</ul>
          <Character_Plate />
        </div>
      )
    }
  }
}

export default PvPChart
