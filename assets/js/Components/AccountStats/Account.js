/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'

import './style.css'
import ClickableCharacterList from '../CharacterSelect/ClickableCharacterList'
import AccountStats from './AccountStats'
import SeasonMenu from './SeasonDropdown'
import Spinner from '../../Utils/Loading/Spinner'
import { statsData } from '../../Data/statsData'

import GetProgresions from '../Profile/GetProgressions'

class Account extends React.Component {
  constructor(props) {
    console.log('Account')
    console.log(props)
    super(props)
    this.componentRef = React.createRef()
    this.state = {
      error: null,
      isLoaded: true,
      jsonResponse: [],
      ...this.state,
    }
  }

  render() {
    const { membershipType, membershipId, characterId } = this.props.match.params
    const { error, isLoaded, jsonResponse } = this.state
    const { gameMode } = this.props

    // console.log('PvP JSON response:')
    // console.log(jsonResponse)

    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <Spinner />
    } else {
      const { allTime, season } = statsData

      return (
        <div className='account-stats-wrapper'>
          <div className='stats-background'>
            <GetProgresions {...this.props} />
          </div>
          <h2>{allTime.heading}</h2>
          <div className='stats-background'>
            <div className='button-wrapper'>
              <AccountStats
                {...this.props}
                subHeading={allTime.subHeading}
                heading={allTime.heading}
                scope={allTime.scope}
                apiUrl={allTime.apiUrl}
              />
            </div>
          </div>

          <h2>{season.heading}</h2>
          <div className='stats-background'>
            <SeasonMenu {...this.props} {...statsData} />
          </div>
          <ClickableCharacterList memberships={{ membershipId, membershipType }} />
        </div>
      )
    }
  }
}

export default Account
