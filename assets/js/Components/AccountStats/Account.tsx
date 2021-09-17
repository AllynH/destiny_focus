/* eslint-disable max-len */
import React from 'react'

import './style.css'
import { RouteComponentProps } from 'react-router'
import ClickableCharacterList from '../CharacterSelect/ClickableCharacterList'
import AccountStats from './AccountStats'
import SeasonMenu from './SeasonDropdown'
import Spinner from '../../Utils/Loading/Spinner'
import { statsData } from '../../Data/statsData'
import SelectActivityIcon from '../PGCR_Splash/SelectActivityIcon'
import { FOCUS_DETAILS } from '../Focus/FocusDetails'
import { BASIC_ACTIVITY_MODES } from '../../Data/destinyEnums'

import GetProgressions from '../Profile/GetProgressions'

import { FocusDetailKey } from '../Focus/types'
import { CharacterPropsInterface } from '../../Data/CharacterProps'

interface AccountState {
  error: null | { message: string },
  gameMode: number,
  isLoaded: boolean,
}

class Account extends React.Component<RouteComponentProps & {updateCount: number}, AccountState> {
  componentRef: React.RefObject<unknown>

  constructor(props: RouteComponentProps & {updateCount: number}) {
    super(props)
    this.componentRef = React.createRef()
    this.state = {
      error: null,
      gameMode: 5,
      isLoaded: true,
      ...this.state,
    }
  }

  render() {
    const { membershipType , membershipId, characterId } = this.props.match.params as CharacterPropsInterface
    const { error, isLoaded } = this.state

    // Throws an error when declared as React.MouseEventHandler<HTMLDivElement>
    // const selectGameMode = (event: React.MouseEventHandler<HTMLDivElement> ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectGameMode = (event: any ) => {
      this.setState({ gameMode: Number(event.currentTarget.getAttribute('data-value')) })
    }

    // Cast to an Array of FocusDetailKeys[] as .filter returns an array - hopefully with only 1 item filteredActivityKeys[0]
    const filteredActivityKeys: FocusDetailKey[]
      = Object.keys(FOCUS_DETAILS)
      .filter((key: FocusDetailKey) => FOCUS_DETAILS[key].activityMode === this.state.gameMode) as FocusDetailKey[]

      const { activityName } = FOCUS_DETAILS[filteredActivityKeys[0]]

    const DisplayFocusChoice = () => (
      <>
      <ul className="account-focus-selector-list">
        {Object.keys(FOCUS_DETAILS).map((f: FocusDetailKey, index) => <li key={index} className="focus-selector-item list-style-none">
        <div
          className={`account-focus-item weapon-selector-item ${FOCUS_DETAILS[f].activityMode === this.state.gameMode ? 'selected-activity' : ''}`}
          onClick={selectGameMode}
          data-value={FOCUS_DETAILS[f].activityMode}
        >
          <div className="account-focus-image-wrap">
            <div className="account-focus-text">{FOCUS_DETAILS[f].activityName}</div>
            <div className="account-focus-image">
            <SelectActivityIcon
              activityMode={BASIC_ACTIVITY_MODES[FOCUS_DETAILS[f].activityMode]}
              iconStyle={'smallIconAccountSelect'}
            />
            </div>
          </div>
        </div>
        </li>)}
        </ul>
      </>
    )

    if (error) {
      return <div>Error: {error.message}</div>
    }
    if (!isLoaded) {
      return <Spinner />
    }
    const { allTime, season } = statsData

    return (
        <div className='account-stats-wrapper'>
          <div className='stats-background'>
            <GetProgressions {...this.props} />
          </div>
          <h2>{allTime.heading}</h2>
          <div className='stats-background'>
            <div className='stats-selector-wrap'>
            <DisplayFocusChoice />
            <div className='button-wrapper'>
              <AccountStats
                {...this.props}
                activityName={activityName}
                gameMode={this.state.gameMode}
                subHeading={allTime.subHeading}
                heading={allTime.heading}
                scope={allTime.scope}
                // apiUrl={allTime.apiUrl}
              />
            </div>
            </div>
          </div>

          <h2>{season.heading}</h2>
          <div className='stats-background'>
            <SeasonMenu
              {...this.props}
              activityName={activityName}
              gameMode={this.state.gameMode}
              {...statsData}
            />
          </div>
          <ClickableCharacterList memberships={{ membershipId, membershipType, characterId }} />
        </div>
    )
  }
}

export default Account
