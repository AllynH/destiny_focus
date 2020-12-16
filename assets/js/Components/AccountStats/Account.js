/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'

import './style.css'
import Character_Plate from '../CharacterPlate/Character_Plate'
import AccountStats from '../AccountStats/AccountStats'
import PGCR from '../PGCR/PGCR'
import Spinner from '../../Utils/Loading/Spinner'
import { GetPVPData, GetGambitData, GetRaidData } from '../../Utils/API/API_Requests'
import { statsData } from '../../Data/statsData'

class Account extends React.Component {
  constructor(props) {
    console.log('Account')
    console.log(props)
    super(props)
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
    const { membershipType, membershipId, characterId } = this.props.match.params
    const { gameMode } = this.props

    console.log(this.props.match.path)

    switch (gameMode) {
      case 'gambit':
        {
          const response = await GetGambitData({ params: { membershipType, membershipId, characterId } })
          this.setState({
            isLoaded: true,
            jsonResponse: response,
          })
        }
        break
      case 'raid':
        {
          const response = await GetRaidData({
            params: { membershipType, membershipId, characterId },
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

      const { allTime, season } = statsData

      return (
        <div>
          <h2>{allTime.heading}</h2>
          <AccountStats
            {...this.props}
            subHeading={allTime.subHeading}
            heading={allTime.heading}
            scope={allTime.scope}
            apiUrl={allTime.apiUrl}
          />
          <h2>{season.heading}</h2>
          <AccountStats
            {...this.props}
            subHeading={season.subHeading}
            heading={season.heading}
            scope={season.scope}
            apiUrl={season.apiUrl}
          />
          <Character_Plate />
        </div>
      )
    }
  }
}

export default Account
