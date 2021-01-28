import React, { useState } from 'react'

import { getUrlDetails, calculateKillDeathRatio } from '../../Utils/HelperFunctions'
import { getDatePlayedFromTimestamp } from '../../Utils/HelperFunctions/getDateTime'
import { GetActivityDefinition } from '../../Utils/API/API_Requests'
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
  const { gameMode } = props 

  console.log('Activity:')
  console.log(props)

  const standingClassName = (s) => {
    // eslint-disable-next-line no-nested-ternary
    const style = (s === '') ? '' : (s === 'Victory') ? 'standing-victory' : 'standing-defeat'
    return style
  }

  const standingTitle = (s, mode) => {

    switch (mode) {
      case 'raid':
        return 'Raid'
      default:
        return (s === '') ? 'No win loss data' : (s)
    }
  }

  const HeaderCollapsed = () => (
    <div className={`pgcr-game-wrapper ${standingClassName(standing)}`}>
      <div>{ standingTitle(standing, gameMode) || 'Raid'}</div>
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
    const iconPath = icon.includes('missing_icon_d2.png')
      ? gameIcon()
      : `https://www.bungie.net${activityDef.displayProperties.icon}`
    return iconPath
  }

  const styles = (iconPath) => ({
    backgroundImage: `url(${iconPath})`,
  })
  const HeaderExpanded = () => (
    <div className='pgcr pgcr-game-wrapper-expanded' style={mapStyle()}>
      <div className='pgcr activity-icon-name-wrapper'>
        <span
          className={'pgcr activity-icon'}
          style={styles(returnIcon(activityDef.displayProperties.icon))}
        ></span>
        <span className={'pgcr activity-name'}>{activityDef.displayProperties.name}</span>
      </div>
      <div className='pgcr activity-results-wrapper'>
        <h2 className='pgcr activity-map-name'>
          {referenceDef ? referenceDef.displayProperties.name : ''}
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
