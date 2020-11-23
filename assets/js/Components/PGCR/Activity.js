import React, { useState } from 'react'

import { GetActivityDefinition } from '../../Utils/API/API_Requests'
import './style.css'

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
  }
) {
  const [activityDef, setActivityDef] = useState('')
  const [referenceDef, setReferenceDef] = useState('')
  const [isLoaded, setLoaded] = useState(false)

  // console.log('Activity:')
  // console.log(props)

  const HeaderCollapsed = () => (
    <div className='pgcr-game-wrapper'>
      <div>{standing}</div>
      <div>Kills:&nbsp;{kills}</div>
      <div>Deaths:&nbsp;{deaths}</div>
      <div>Assists:&nbsp;{assists}</div>
      <div>KDA:&nbsp;{kda}</div>
      <div>KDR:&nbsp;{kdr}</div>
    </div>
  )

  const mapStyle = () => ({
    // background: `linear-gradient(
    //   rgba(0, 0, 0, 0.6),
    //   rgba(0, 0, 0, 0.6)
    // ),url(https://www.bungie.net${referenceDef.pgcrImage})`,
    backgroundImage: `url(https://www.bungie.net${referenceDef.pgcrImage})`,
    height: 200,
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
  })

  const styles = () => ({
    backgroundImage: `url(https://www.bungie.net${activityDef.displayProperties.icon})`,
  })
  const HeaderExpanded = () => (
    <div className='pgcr pgcr-game-wrapper' style={mapStyle()}>
      <div className='pgcr activity-icon-name-wrapper'>
        <span className={'pgcr activity-icon'} style={styles()}></span>
        <span className={'pgcr activity-name'}>{activityDef.displayProperties.name}</span>
      </div>
      <div className='pgcr activity-results-wrapper'>
        <h2 className='pgcr activity-map-name'>
          {referenceDef ? referenceDef.displayProperties.name : ''}
        </h2>
        <div className='pgcr activity-results'>
          <span>{standing}</span>
          <span>Kills:&nbsp;{kills}</span>
          <span>Deaths:&nbsp;{deaths}</span>
          <span>Assists:&nbsp;{assists}</span>
          <span>KDA:&nbsp;{kda}</span>
          <span>KDR:&nbsp;{kdr}</span>
        </div>
      </div>
    </div>
  )

  // Fetch the Activity definition - control and icon:
  const fetchDirectorActivityDefinition = async (activityId) => {
    const result = await GetActivityDefinition({
      params: { definition: 'DestinyActivityDefinition', defHash: activityId },
    })
    // console.log('fetchDirectorActivityDefinition')
    // console.log(result)
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
