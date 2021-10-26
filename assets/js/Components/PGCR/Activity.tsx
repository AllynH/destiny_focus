import React, { useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import DiscFullIcon from '@material-ui/icons/DiscFull'
import PublishIcon from '@material-ui/icons/Publish'

import { DestinyHistoricalStatsPeriodGroup, DestinyActivityDefinition } from 'bungie-api-ts/destiny2'
import { getDatePlayedFromTimestamp } from '../../Utils/HelperFunctions/getDateTime'
import { GetActivityDefinition, PutPGCR, DeletePGCR } from '../../Utils/API/API_Requests'
import SelectActivityIcon from '../PGCR_Splash/SelectActivityIcon'

import { CharacterPropsInterface } from '../../Data/CharacterProps'
import { PgcrTypes, StandingType } from '../../Data/destinyEnums'
import { FocusGoalTypes } from '../Focus/types'

import './style.css'


interface ActivityPropsInterface {
  historicalStatsGroup: DestinyHistoricalStatsPeriodGroup,
  activityMode: PgcrTypes | string,
  isExpanded: boolean,
  currentGameMode: FocusGoalTypes,
  favourite?: boolean,
}


// eslint-disable-next-line radar/cognitive-complexity
export default function Activity(props: ActivityPropsInterface) {
  // console.log('Activity.js')
  // console.log(props)
  const { isExpanded, currentGameMode } = props
  const { activityDetails, values, period } = props.historicalStatsGroup
  const activityMode = props.activityMode || ''
    // team = '',
    // activityIcon = '',
    // player = '',
    // clan = '',
  const standing: StandingType = values.standing?.basic?.displayValue as StandingType || '' as StandingType
  const kills = values.kills?.basic?.displayValue || 0
    // deaths = props.values?.deaths?.basic?.displayValue || 0,
    // assists = props.values?.assists?.basic?.displayValue || 0,
    // kda = props.values?.killsDeathsAssists?.basic?.displayValue || 0,
  const kdr = values.killsDeathsRatio?.basic?.displayValue || 0
  const completionDate = getDatePlayedFromTimestamp(period)
  const completionTime = values?.activityDurationSeconds?.basic?.displayValue || '666 hours'

  const [activityDef, setActivityDef] = useState<DestinyActivityDefinition>(null)
  const [referenceDef, setReferenceDef] = useState<DestinyActivityDefinition>(null)
  const [isLoaded, setLoaded] = useState(false)
  const [isSaved, setSaved] = useState(props.favourite)
  const [saveError, setSaveError] = useState(false)
  const [pgcrsFull, setPgcrsFull] = useState(false)
  const params = useParams()
  const location = useLocation()

  const { pathname } = location
  const { membershipId, membershipType } = params as CharacterPropsInterface

  const activityId = activityDetails.instanceId

  const standingClassName = (s: StandingType) => {
    // eslint-disable-next-line no-nested-ternary
    const style = s === '' ? '' : s === 'Victory' ? 'standing-victory' : 'standing-defeat'
    return style
  }

  const standingTitle = (s: StandingType, mode: FocusGoalTypes) => {
    switch (mode) {
      case 'raid':
        return 'Raid'
      case 'nightfall':
        return 'Nightfall'
      case 'dungeon':
        return 'Dungeon'
      default:
        return s === '' ? 'No win loss data' : s
    }
  }

  const HeaderCollapsed = () => (
    <div className={`pgcr-game-wrapper ${standingClassName(standing)}`}>
      <div>{standingTitle(standing, currentGameMode) || 'Raid'}</div>
      <div>Kills:&nbsp;{kills}</div>
      <div>KDR:&nbsp;{kdr}</div>
      <div>{completionDate}</div>
    </div>
  )

  const mapStyle = () => ({
    background: `${referenceDef ? `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.6)
    ),url(https://www.bungie.net${referenceDef.pgcrImage})` : ''}

  `,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 300,
  })

  // Store a PGCR in the users DB:
  const savePgcr = async (actId: string) => {
    const result = await PutPGCR({
      params: { activityId: actId },
    })
    // console.log('PutPGCR')
    // console.log(result)
    if (result.errorStatus === 'Success') {
      setSaved(true)
    } else {
      if (result.user_has_room === false) {
        setPgcrsFull(true)
        // console.log('pgcrsFull', pgcrsFull)
      }
      setSaveError(true)
    }
  }

  // Store a PGCR in the users DB:
  const deletePgcr = async (actId: string) => {
    const result = await DeletePGCR({
      params: { activityId: actId },
    })
    // console.log('DeletePGCR')
    // console.log(result)
    if (result.errorStatus === 'Success') {
      setSaved(false)
    } else {
      setSaveError(true)
    }
  }

  const handleClick = (a: string) => {
    switch (isSaved) {
      case true:
      default:
        deletePgcr(a)
        break
      case false:
        savePgcr(a)
        break
    }
  }

  const SaveButton = () => (
    <>
      {
        // eslint-disable-next-line no-nested-ternary
        isSaved ? (
          <FavoriteIcon style={{ color: 'var(--gambit-green)' }} />
        ) // eslint-disable-next-line no-nested-ternary
          : !saveError ? (
          <FavoriteBorderIcon />
          ) : pgcrsFull ? (
          <>
            <DiscFullIcon style={{ color: 'var(--crucible-red)' }} />
          </>
          ) : (
          <>
            <ErrorOutlineIcon style={{ color: 'var(--crucible-red)' }} />
          </>
          )
      }
    </>
  )

  const ShareButton = () => (
    <>
      <Link
        to={{
          pathname: `/pgcr/${activityId}`,
          // search: '?sort=name',
          // hash: '#the-hash',
          state: {
            params,
            location,
            pathname,
            currentGameMode,
            membershipId,
            membershipType,
          },
        }}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <PublishIcon />
      </Link>
    </>
  )

  const SaveMessage = () => (
    <div className='pgcr-save-message'>
      {
        // eslint-disable-next-line no-nested-ternary
        isSaved ? (
          // <p>Saved!</p>
          ''
        ) // eslint-disable-next-line no-nested-ternary
          : !saveError ? (
          <p></p>
          ) : pgcrsFull ? (
          <p>No more room</p>
          ) : (
          <p>Error saving</p>
          )
      }
    </div>
  )

  const HeaderExpanded = () => (
    <div className='pgcr pgcr-game-wrapper-expanded' style={mapStyle()}>
      <div className='pgcr activity-icon-name-wrapper'>
        <div className='pgcr-button-message-wrapper'>
          <div className='pgcr-social-buttons'>
            <div
              className='pgcr-save-button pgcr-icon'
              role='button'
              onClick={() => handleClick(activityId)}
            >
              <SaveButton />
            </div>
            <div className='pgcr-share-button pgcr-icon' role='button'>
              <ShareButton />
            </div>
          </div>
          <SaveMessage />
        </div>
        <div className={'pgcr activity-icon'}>
          <SelectActivityIcon activityMode={activityMode} smallIcon={true} />
        </div>
        <h3 className={'pgcr activity-name'}>
          {activityDef?.displayProperties?.name || 'UNKNOWN ACTIVITY'}
        </h3>
      </div>
      <div className='pgcr activity-results-wrapper'>
        <h2 className='pgcr activity-map-name'>
          {referenceDef ? referenceDef.displayProperties?.name : 'UNKNOWN MAP'}
        </h2>
        <div className='stats header-completion-time'>
          <p className='stats completion-time-value'>{completionDate}</p>
          <p className='stats completion-time-value'>{completionTime}</p>
          <p className='stats completion-time-value standing'>{standing}</p>
        </div>
        <div className='pgcr activity-results'>
          {/* <span>{standing}</span> */}
          {/* <span>K:&nbsp;{kills}</span>
          <span>D:&nbsp;{deaths}</span>
          <span>A:&nbsp;{assists}</span>
          <span>KDR:&nbsp;{kdr}</span> */}
        </div>
      </div>
    </div>
  )

  // Fetch the Activity definition - control and icon:
  const fetchDirectorActivityDefinition = async (actId:  string) => {
    const result = await GetActivityDefinition({
      params: { definition: 'DestinyActivityDefinition', defHash: actId },
    })
    setActivityDef(result)
  }

  // Fetch the Activity definition - Map icon, name :
  const fetchReferenceId = async (actId: string) => {
    const result = await GetActivityDefinition({
      params: { definition: 'DestinyActivityDefinition', defHash: actId },
    })
    setReferenceDef(result)
  }

  if (isExpanded && !isLoaded) {
    fetchDirectorActivityDefinition(activityDetails.directorActivityHash.toString())
    fetchReferenceId(activityDetails.referenceId.toString())
    setLoaded(true)
  }

  return <>{activityDef ? <HeaderExpanded /> : <HeaderCollapsed />}</>
}
