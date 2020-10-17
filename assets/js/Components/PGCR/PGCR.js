/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { GetPGCR } from '../../Utils/API/API_Requests'
import './style.css'

export default function PGCR(
  props,
  {
    team = '',
    icon = '',
    player = '',
    clan = '',
    standing = props.values.standing.basic.displayValue || '',
    kills = props.values.kills.basic.displayValue || 0,
    deaths = props.values.deaths.basic.displayValue || 0,
    assists = props.values.assists.basic.displayValue || 0,
    kda = props.values.killsDeathsAssists.basic.displayValue || 0,
    kdr = props.values.killsDeathsRatio.basic.displayValue || 0,
  }
) {
  const [pgcr, setPGCR] = useState(null)
  const [activityId, setActivityId] = useState('')
  const [pgcrDropDown, setPGCRDropDown] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchPGCR = async (activityId) => {
    const response = await GetPGCR({ params: { activityId } })
    setPGCR(response)
  }

  const readPGCR = () => {
    // if (pgcr === null) {
    //   return { pgcrList, '' }
    // }
    const filterArray = pgcr.Response.entries
    const pgcrList = []
    const divList = []

    // filterArray.forEach((element) => {
    filterArray.map((element, index) => {
      if (element.values.completed.basic.displayValue === 'Yes') {
        const pgcr_icon = element.player.destinyUserInfo.iconPath
        const pgcr_userName = element.player.destinyUserInfo.displayName
        const pgcr_kdr = element.values.killsDeathsRatio.basic.displayValue
        const pgcr_kda = element.values.killsDeathsAssists.basic.displayValue
        const pgcr_deaths = element.values.deaths.basic.displayValue
        const pgcr_kills = element.values.kills.basic.displayValue
        const pgcr_assists = element.values.assists.basic.displayValue
        const pgcrStats = {
          pgcr_icon,
          pgcr_userName,
          pgcr_kdr,
          pgcr_kda,
          pgcr_deaths,
          pgcr_kills,
          pgcr_assists,
        }

        const iconStyle = {
          backgroundImage: `url(https://www.bungie.net${pgcr_icon})`,
          maxHeight: 30,
        }

        const results = (
          <li className={'pgcr-char-wrap'} key={index}>
            <span className={'pgcr pgcr-player-stats player-name-icon'}>
              <span className={'pgcr player-icon'} style={iconStyle}></span>
              {pgcr_userName}
            </span>
            <span className={'pgcr player-stats'}>
              <span>{pgcr_kills}</span>
            </span>
            <span className={'pgcr player-stats'}>
              <span>{pgcr_deaths}</span>
            </span>
            <span className={'pgcr player-stats'}>
              <span>{pgcr_assists}</span>
            </span>
            <span className={'pgcr player-stats'}>
              <span>{pgcr_kdr}</span>
            </span>
            <span className={'pgcr player-stats'}>
              <span>{pgcr_kda}</span>
            </span>
          </li>
        )

        divList.push(results)

        pgcrList.push(pgcrStats)
      }
    })

    const header = (
      <li className={'pgcr-char-wrap'} key={0}>
        <span className={'pgcr player-name-icon'}>
          <span className={'pgcr player-icon'}></span>
          GUARDIAN
        </span>
        <span className={'pgcr player-stats'}>
          <span>KILLS</span>
        </span>
        <span className={'pgcr player-stats'}>
          <span>DEATHS</span>
        </span>
        <span className={'pgcr player-stats'}>
          <span>ASSISTS</span>
        </span>
        <span className={'pgcr player-stats'}>
          <span>K/D R</span>
        </span>
        <span className={'pgcr player-stats'}>
          <span>K/D A</span>
        </span>
      </li>
    )
    divList.unshift(header)

    return { pgcrList, divList }
  }

  const handleClick = (activityId_prop) => {
    setExpanded(!expanded)
    setActivityId(activityId_prop)
    const pgcr_res = fetchPGCR(activityId)
    // .then((res) => res.json())
    // .then((res) => console.log(res))
    // .then((res) => setPGCR(res))
  }

  useEffect(() => {
    if (pgcr !== null) {
      const { pgcrList, divList } = readPGCR()
      // setPGCR(pgcr_res)
      const dropDown = <ul className='pgcr pgcr-ul'>{divList}</ul>
      setPGCRDropDown(dropDown)
      setIsLoading(false)
    }
  }, [pgcr])

  return (
    <div>
      <div className='pgcr-wrapper'>
        <a role='button' onClick={(e) => handleClick(props.activityDetails.instanceId)}>
          <div className='pgcr-game-wrapper'>
            <div>Standing:&nbsp;{standing}</div>
            <div>Kills:&nbsp;{kills}</div>
            <div>Deaths:&nbsp;{deaths}</div>
            <div>Assists:&nbsp;{assists}</div>
            <div>KDA:&nbsp;{kda}</div>
            <div>KDR:&nbsp;{kdr}</div>
          </div>
        </a>
      </div>
      <div className='pgcr pgcr-dropdown'>{pgcr ? pgcrDropDown : ''}</div>
    </div>
  )
}
