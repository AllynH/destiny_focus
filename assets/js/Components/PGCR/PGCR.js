/* eslint-disable camelcase */
import React, { useState } from 'react'

import CheckIcon from '@material-ui/icons/Check'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { makeStyles } from '@material-ui/core/styles'

import { getUrlDetails, calculateKillDeathRatio } from '../../Utils/HelperFunctions'
import { getDatePlayedFromTimestamp } from '../../Utils/HelperFunctions/getDateTime'

import Activity from './Activity'
import { GetPGCR } from '../../Utils/API/API_Requests'
import './style.css'

export function PgcrDetailsPvP({ pgcr }) {
  console.log('pgcr')
  console.log(pgcr)
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
        if (
          element.values.team?.basic.displayValue === '18' ||
          element.values.team?.basic.displayValue === 'Alpha'
        ) {
          if (element.values.completed.basic.displayValue === 'Yes') {
            const pgcr_icon = element.player.destinyUserInfo.iconPath
            const pgcr_userName = element.player.destinyUserInfo.displayName
            const pgcr_kdr = element.values.killsDeathsRatio.basic.displayValue
            const pgcr_kda = Number(Number(element.values.kills.basic.value + element.values.assists.basic.value) / element.values.deaths.basic.value).toFixed(2)
            const pgcr_deaths = element.values.deaths.basic.displayValue
            const pgcr_kills = element.values.kills.basic.displayValue
            const pgcr_assists = element.values.assists.basic.displayValue
            const pgcr_team = element.values.assists.basic.displayValue
            const iconStyle = {
              backgroundImage: `url(https://www.bungie.net${pgcr_icon})`,
              maxHeight: 30,
            }
            console.log('pgcr_kills, pgcr_assists, pgcr_deaths, pgcr_kda')
            console.log(pgcr_kills, pgcr_assists, pgcr_deaths, pgcr_kda)

            return (
              <li className={'pgcr-char-wrap team-alpha'} key={index}>
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
        }
      })}

      {entriesList.map((element, index) => {
        if (element.values.team?.basic.displayValue !== '18') {
          if (element.values.completed.basic.displayValue === 'Yes') {
            const pgcr_icon = element.player.destinyUserInfo.iconPath
            const pgcr_userName = element.player.destinyUserInfo.displayName
            const pgcr_kdr = element.values.killsDeathsRatio.basic.displayValue
            const pgcr_kda = Number(Number(element.values.kills.basic.value + element.values.assists.basic.value) / element.values.deaths.basic.value).toFixed(2)
            const pgcr_deaths = element.values.deaths.basic.displayValue
            const pgcr_kills = element.values.kills.basic.displayValue
            const pgcr_assists = element.values.assists.basic.displayValue
            const pgcr_team = element.values.assists.basic.displayValue
            const iconStyle = {
              backgroundImage: `url(https://www.bungie.net${pgcr_icon})`,
              maxHeight: 30,
            }

            return (
              <li className={'pgcr-char-wrap team-bravo'} key={index}>
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
        }
      })}

      {entriesList.map((element, index) => {
        // Bungie removed the standing and teams information from some PGCR's:
        if (element.values.team === 'undefined') {
          if (element.values.completed.basic.displayValue === 'Yes') {
            const pgcr_icon = element.player.destinyUserInfo.iconPath
            const pgcr_userName = element.player.destinyUserInfo.displayName
            const pgcr_kdr = element.values.killsDeathsRatio.basic.displayValue
            const pgcr_kda = Number(Number(element.values.kills.basic.value + element.values.assists.basic.value) / element.values.deaths.basic.value).toFixed(2)
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
        }
      })}

    </ul>
  )
}

export function PgcrDetailsRaid({ pgcr }) {
  // console.log('pgcr')
  // console.log(pgcr)
  const useStyles = makeStyles({
    pass: {
      color: 'green',
      // color: 'var(--gambit-green)',
      filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))',
      // fontSize: 14,
    },
    fail: {
      color: 'var(--crucible-red)',
      filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))',
      // fontSize: 14,
    },
  })

  const classes = useStyles()
  const completionIcon = (standing) => {
    if (standing) {
      return <CheckIcon className={classes.pass} />
    }
    return <HighlightOffIcon className={classes.fail} />
  }
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
          <span>KD/R</span>
        </span>
        <span className={'pgcr player-stats'}>
          <span>SUPER KILLS</span>
        </span>
        <span className={'pgcr player-stats'}>
          <span>TIME</span>
        </span>
        <span className={'pgcr player-stats'}>
          <span>STARTED</span>
        </span>
      </li>

      {entriesList.map((element, index) => {
        const pgcr_standing = element.values.completed.basic.displayValue === 'Yes'
        const pgcr_time_started = getDatePlayedFromTimestamp(pgcr.Response.period)
        const pcgr_standing_icon = completionIcon(pgcr_standing)
        const pgcr_icon = element.player.destinyUserInfo.iconPath
        const pgcr_userName = element.player.destinyUserInfo.displayName
        const pgcr_kdr = element.values.killsDeathsRatio.basic.displayValue
        const pgcr_kda = element.values.killsDeathsAssists.basic.displayValue
        const pgcr_deaths = element.values.deaths.basic.displayValue
        const pgcr_kills = element.values.kills.basic.displayValue
        const pgcr_assists = element.values.assists.basic.displayValue
        const pgcr_completion_time = element.values.timePlayedSeconds.basic.displayValue
        const pgcr_super_kills = element.extended.values.weaponKillsSuper.basic.value
        const iconStyle = {
          backgroundImage: `url(https://www.bungie.net${pgcr_icon})`,
          maxHeight: 30,
        }

        return (
          <li className={'pgcr-char-wrap'} key={index}>
            <span className={'pgcr pgcr-player-stats player-name-icon'}>
              <span className={'pgcr player-icon'} style={iconStyle}></span>
              {pgcr_userName}
              <span className={'player-stats-completed'}>{pcgr_standing_icon}</span>
            </span>
            <span className={'pgcr player-stats'}>
              <span>{pgcr_kills}</span>
            </span>
            <span className={'pgcr player-stats'}>
              <span>{pgcr_deaths}</span>
            </span>
            <span className={'pgcr player-stats'}>
              <span>{pgcr_kdr}</span>
            </span>
            <span className={'pgcr player-stats'}>
              <span>{pgcr_super_kills}</span>
            </span>
            <span className={'pgcr player-stats'}>
              <span>{pgcr_completion_time}</span>
            </span>
            {/* <span className={'pgcr player-stats'}>
              <span>{pgcr_time_started}</span>
            </span> */}
          </li>
        )
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
        if (
          element.values.team?.basic.displayValue === '18' ||
          element.values.team?.basic.displayValue === 'Alpha'
        ) {
          if (element.values.completed.basic.displayValue === 'Yes') {
            const pgcr_icon = element.player.destinyUserInfo.iconPath
            const pgcr_userName = element.player.destinyUserInfo.displayName
            const pgcr_kda = element.values.killsDeathsAssists.basic.displayValue
            const pgcr_deaths = element.values.deaths.basic.displayValue
            const pgcr_kills = element.values.kills.basic.displayValue
            const pgcr_guardian_deaths =
              element.extended.values.invaderDeaths.basic.value +
              element.extended.values.invasionDeaths.basic.value
            const pgcr_guardian_kills =
              element.extended.values.invaderKills.basic.value +
              element.extended.values.invasionKills.basic.value

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
              <li className={'pgcr-char-wrap team-alpha'} key={index}>
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
        }
      })}

      {entriesList.map((element, index) => {
        if (element.values.team?.basic.displayValue !== '18') {
          if (element.values.completed.basic.displayValue === 'Yes') {
            const pgcr_icon = element.player.destinyUserInfo.iconPath
            const pgcr_userName = element.player.destinyUserInfo.displayName
            const pgcr_kda = element.values.killsDeathsAssists.basic.displayValue
            const pgcr_deaths = element.values.deaths.basic.displayValue
            const pgcr_kills = element.values.kills.basic.displayValue
            const pgcr_guardian_deaths =
              element.extended.values.invaderDeaths.basic.value +
              element.extended.values.invasionDeaths.basic.value
            const pgcr_guardian_kills =
              element.extended.values.invaderKills.basic.value +
              element.extended.values.invasionKills.basic.value

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
              <li className={'pgcr-char-wrap team-bravo'} key={index}>
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
        }
      })}
    </ul>
  )
}

export default function Pgcr(props) {
  const [pgcr, setPgcr] = useState()
  const [isExpanded, setIsExpanded] = useState(false)

  const { gameMode } = getUrlDetails()
  const { instanceId } = props.activityDetails
  console.log('In PGCR.js - instanceId:')
  console.log(instanceId)
  console.log(props)

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

    console.log(gameMode)
    console.log(pgcr)
    console.log(pgcr)
    switch (gameMode) {
      case 'gambit':
        return <PgcrDetailsGambit pgcr={pgcr} />
      case 'raid':
        return <PgcrDetailsRaid pgcr={pgcr} />
      default:
        return <PgcrDetailsPvP pgcr={pgcr} />
    }
  }

  return (
    <>
      <div className='pgcr-wrapper'>
        <div
          className='pgcr pgcr-pointer'
          role='button'
          onClick={() => {
            handleClick(instanceId)
          }}
        >
          <Activity {...props} isExpanded={isExpanded} gameMode={gameMode} />
          {pgcr && <PgcrDetails />}
        </div>
      </div>
    </>
  )
}
