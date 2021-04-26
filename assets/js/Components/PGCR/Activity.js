/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import DiscFullIcon from '@material-ui/icons/DiscFull'
import PublishIcon from '@material-ui/icons/Publish'

import { getUrlDetails, calculateKillDeathRatio } from '../../Utils/HelperFunctions'
import { getDatePlayedFromTimestamp } from '../../Utils/HelperFunctions/getDateTime'
import { GetActivityDefinition, PutPGCR, DeletePGCR } from '../../Utils/API/API_Requests'
import './style.css'

import CrucibleImage from '../../../img/cards/Crucible.png'
import GambitImage from '../../../img/cards/Gambit.png'
import RaidImage from '../../../img/cards/Raid.png'

export default function Activity(
  props,
  {
    team = '',
    activityIcon = '',
    player = '',
    clan = '',
    standing = props.values?.standing?.basic?.displayValue || '',
    kills = props.values?.kills?.basic?.displayValue || 0,
    deaths = props.values?.deaths?.basic?.displayValue || 0,
    assists = props.values?.assists?.basic?.displayValue || 0,
    kda = props.values?.killsDeathsAssists?.basic?.displayValue || 0,
    kdr = props.values?.killsDeathsRatio?.basic?.displayValue || 0,
    completionDate = getDatePlayedFromTimestamp(props.period),
    completionTime = props.values?.activityDurationSeconds?.basic?.displayValue || '666 hours',
  },
) {
  const [activityDef, setActivityDef] = useState('')
  const [referenceDef, setReferenceDef] = useState('')
  const [isLoaded, setLoaded] = useState(false)
  const [isSaved, setSaved] = useState(props.favourite)
  const [saveError, setSaveError] = useState(false)
  const [pgcrsFull, setPgcrsFull] = useState(false)
  const params = useParams()
  const location = useLocation()
  // const history = useHistory()

  console.log('activity.js')
  console.log(params)
  console.log(location)
  const { pathname } = location
  const { characterId, membershipId, membershipType } = params

  const { gameMode } = props
  const activityId = Number(props.activityDetails.instanceId)

  console.log('gameMode, characterId, membershipId, membershipType')
  console.log(gameMode, characterId, membershipId, membershipType)

  console.log('Activity:')
  console.log(props)
  console.log(props.activityDetails)
  console.log(activityId)

  const standingClassName = (s) => {
    // eslint-disable-next-line no-nested-ternary
    const style = s === '' ? '' : s === 'Victory' ? 'standing-victory' : 'standing-defeat'
    return style
  }

  const standingTitle = (s, mode) => {
    switch (mode) {
      case 'raid':
        return 'Raid'
      default:
        return s === '' ? 'No win loss data' : s
    }
  }

  const HeaderCollapsed = () => (
    <div className={`pgcr-game-wrapper ${standingClassName(standing)}`}>
      <div>{standingTitle(standing, gameMode) || 'Raid'}</div>
      <div>Kills:&nbsp;{kills}</div>
      <div>KDR:&nbsp;{kdr}</div>
      <div>{completionDate}</div>
    </div>
  )

  const mapStyle = () => ({
    background: `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.6)
    ),url(https://www.bungie.net${referenceDef.pgcrImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 300,
  })

  const gameIcon = () => {
    const { gameMode } = getUrlDetails()
    switch (gameMode) {
      case 'gambit':
        return GambitImage
      case 'raid':
        return RaidImage
      default:
        return CrucibleImage
    }
  }

  const returnIcon = (icon) => {
    // eslint-disable-next-line no-nested-ternary
    const iconPath = icon.includes('missing_icon_d2.png')
      ? gameIcon()
      : activityDef.displayProperties
        ? `https://www.bungie.net${activityDef?.displayProperties?.icon}`
        : gameIcon()
    return iconPath
  }

  const styles = (iconPath) => ({
    backgroundImage: `url(${iconPath})`,
  })

  // Store a PGCR in the users DB:
  const savePgcr = async (activityId) => {
    const result = await PutPGCR({
      params: { activityId },
    })
    console.log('PutPGCR')
    console.log(result)
    if (result.errorStatus === 'Success') {
      setSaved(true)
    } else {
      if (result.user_has_room === false) {
        setPgcrsFull(true)
        console.log('pgcrsFull', pgcrsFull)
      }
      setSaveError(true)
    }
  }

  // Store a PGCR in the users DB:
  const deletePgcr = async (activityId) => {
    const result = await DeletePGCR({
      params: { activityId },
    })
    console.log('DeletePGCR')
    console.log(result)
    if (result.errorStatus === 'Success') {
      setSaved(false)
    } else {
      setSaveError(true)
    }
  }

  const handleClick = (a) => {
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
            gameMode,
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
              <ShareButton role='button' />
            </div>
          </div>
          <SaveMessage />
        </div>
        <span
          className={'pgcr activity-icon'}
          style={styles(returnIcon(activityDef?.displayProperties?.icon || ''))}
        ></span>
        <span className={'pgcr activity-name'}>
          {activityDef?.displayProperties?.name || 'UNKNOWN ACTIVITY'}
        </span>
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
  const fetchDirectorActivityDefinition = async (activityId) => {
    const result = await GetActivityDefinition({
      params: { definition: 'DestinyActivityDefinition', defHash: activityId },
    })
    console.log('fetchDirectorActivityDefinition')
    console.log(result)
    setActivityDef(result)
  }

  // Fetch the Activity definition - Map icon, name :
  const fetchReferenceId = async (activityId) => {
    const result = await GetActivityDefinition({
      params: { definition: 'DestinyActivityDefinition', defHash: activityId },
    })
    // console.log('fetchReferenceId')
    // console.log(result)
    setReferenceDef(result)
  }

  if (props.isExpanded && !isLoaded) {
    fetchDirectorActivityDefinition(props.activityDetails.directorActivityHash)
    fetchReferenceId(props.activityDetails.referenceId)
    setLoaded(true)
  }

  return <>{activityDef ? <HeaderExpanded /> : <HeaderCollapsed />}</>
}
