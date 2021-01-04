/* eslint-disable camelcase */
import React, { useState } from 'react'

import { getUrlDetails, calculateKillDeathRatio } from '../../Utils/HelperFunctions'
import Activity from './Activity'
import { GetPGCR } from '../../Utils/API/API_Requests'
import './style.css'

export function PgcrDetailsPvP({ pgcr }) {
  // console.log('pgcr')
  // console.log(pgcr)
  const entriesList = pgcr.Response.entries

  return (
    <ul className='pgcr-ul'>
      <li className={'pgcr-char-wrap'} key={'header'}>
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
          <span>K/D A</span>
        </span>
        <span className={'pgcr player-stats'}>
          <span>K/D R</span>
        </span>
      </li>

      {entriesList.map((element, index) => {
        if (element.values.completed.basic.displayValue === 'Yes') {
          const pgcr_icon = element.player.destinyUserInfo.iconPath
          const pgcr_userName = element.player.destinyUserInfo.displayName
          const pgcr_kdr = element.values.killsDeathsRatio.basic.displayValue
          const pgcr_kda = element.values.killsDeathsAssists.basic.displayValue
          const pgcr_deaths = element.values.deaths.basic.displayValue
          const pgcr_kills = element.values.kills.basic.displayValue
          const pgcr_assists = element.values.assists.basic.displayValue
          const pgcr_team = element.values.assists.basic.displayValue
          const iconStyle = {
            backgroundImage: `url(https://www.bungie.net${pgcr_icon})`,
            maxHeight: 30,
          }

          return (
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
                <span>{pgcr_kda}</span>
              </span>
              <span className={'pgcr player-stats'}>
                <span>{pgcr_kdr}</span>
              </span>
            </li>
          )
        }
      })}
    </ul>
  )
}

export function PgcrDetailsGambit({ pgcr }) {
  console.log('PgcrDetailsGambit')
  console.log(pgcr)
  console.log(pgcr.pgcr)
  console.log(pgcr.Response)
  const entriesList = pgcr.Response.entries

  return (
    <ul className='pgcr-ul'>
      <li className={'pgcr-char-wrap'} key={'header'}>
        <span className={'pgcr player-name-icon'}>
          <span className={'pgcr player-icon'}></span>
          GUARDIAN
        </span>
        <span className={'pgcr player-stats'}>
          <span>KILLS</span>
        </span>
        <span className={'pgcr player-stats'}>
          <span>GUARDIAN KILLS</span>
        </span>
        <span className={'pgcr player-stats'}>
          <span>DEATHS</span>
        </span>
        <span className={'pgcr player-stats'}>
          <span>GUARDIAN DEATHS</span>
        </span>
        <span className={'pgcr player-stats'}>
          <span>K/D R</span>
        </span>

        {/* <span className={'pgcr player-stats'}>
          <span>BANKED</span>
        </span>
        <span className={'pgcr player-stats'}>
          <span>LOST</span>
        </span>
        <span className={'pgcr player-stats'}>
          <span>DENIED</span>
        </span> */}

      </li>

      {entriesList.map((element, index) => {
        if (element.values.completed.basic.displayValue === 'Yes') {
          const pgcr_icon = element.player.destinyUserInfo.iconPath
          const pgcr_userName = element.player.destinyUserInfo.displayName
          const pgcr_kda = element.values.killsDeathsAssists.basic.displayValue
          const pgcr_deaths = element.values.deaths.basic.displayValue
          const pgcr_kills = element.values.kills.basic.displayValue
          const pgcr_guardian_deaths = element.extended.values.invaderDeaths.basic.value + element.extended.values.invasionDeaths.basic.value
          const pgcr_guardian_kills = element.extended.values.invaderKills.basic.value + element.extended.values.invasionKills.basic.value

          const pgcr_motes_banked = element.extended.values.motesDeposited.basic.value
          const pgcr_motes_lost = element.extended.values.motesLost.basic.value
          const pgcr_motes_denied = element.extended.values.motesDenied.basic.value

          const pgcr_kdr = calculateKillDeathRatio(pgcr_guardian_kills, pgcr_guardian_deaths)
          const pgcr_assists = element.values.assists.basic.displayValue
          const pgcr_team = element.values.assists.basic.displayValue
          const iconStyle = {
            backgroundImage: `url(https://www.bungie.net${pgcr_icon})`,
            maxHeight: 30,
          }

          return (
            <li className={'pgcr-char-wrap'} key={index}>
              <span className={'pgcr pgcr-player-stats player-name-icon'}>
                <span className={'pgcr player-icon'} style={iconStyle}></span>
                {pgcr_userName}
              </span>
              <span className={'pgcr player-stats'}>
                <span>{pgcr_kills}</span>
              </span>
              <span className={'pgcr player-stats'}>
                <span>{pgcr_guardian_kills}</span>
              </span>
              <span className={'pgcr player-stats'}>
                <span>{pgcr_deaths}</span>
              </span>
              <span className={'pgcr player-stats'}>
                <span>{pgcr_guardian_deaths}</span>
              </span>
              <span className={'pgcr player-stats'}>
                <span>{pgcr_kdr}</span>
              </span>

              {/* <span className={'pgcr player-stats'}>
                <span>{pgcr_motes_banked}</span>
              </span>
              <span className={'pgcr player-stats'}>
                <span>{pgcr_motes_lost}</span>
              </span>
              <span className={'pgcr player-stats'}>
                <span>{pgcr_motes_denied}</span>
              </span> */}

            </li>
          )
        }
      })}
    </ul>
  )
}

export default function Pgcr(props) {
  const [pgcr, setPgcr] = useState()
  const [isExpanded, setIsExpanded] = useState(false)

  const { instanceId } = props.activityDetails
  // console.log('In PGCR.js - instanceId:')
  // console.log(instanceId)

  const fetchPgcr = async (activityId) => {
    // console.log('Fetching fetchPgcr:')
    const result = await GetPGCR({ params: { activityId } })
    console.log('Getting PGCR response:')
    console.log(result)
    setPgcr(result)
  }

  const handleClick = (instanceId) => {
    // Prevent reloads from multiple clicks:
    if (!isExpanded) {
      // console.log('Clicked', instanceId)
      fetchPgcr(instanceId)
      setIsExpanded(true)
    }
  }

  const PgcrDetails = () => {
    const { gameMode } = getUrlDetails()

    console.log(gameMode)
    console.log(pgcr)
    console.log(pgcr)
    switch (gameMode) {
      case 'gambit':
        return <PgcrDetailsGambit pgcr={pgcr} />
      default:
        return <PgcrDetailsPvP />
    }
  }

  return (
    <>
      <div className='pgcr-wrapper'>
        <a
          className='pgcr pgcr-pointer'
          role='button'
          onClick={() => {
            handleClick(instanceId)
          }}
        >
          <Activity {...props} isExpanded={isExpanded} />
          {pgcr && <PgcrDetails />}
        </a>
      </div>
    </>
  )
}
