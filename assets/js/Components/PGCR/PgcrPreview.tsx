import React from 'react'

import { DestinyPostGameCarnageReportEntry } from 'bungie-api-ts/destiny2'
import { getTeamName } from '../../Utils/HelperFunctions/PgcrFunctions'
import { PgcrTypes } from '../../Data/destinyEnums'

import { pgcrSplashCategoryValues, pgcrStatType } from '../PGCR_Splash/types'
import getPgcrData from '../../Utils/HelperFunctions/getPgcrData'
import { PgcrPlayerInterface } from './types'

interface PgcrHeaderInterface {
  activityMode: PgcrTypes
}

export function PgcrHeader(props: PgcrHeaderInterface) {
  const { activityMode } = props
  const pgcrCategory = pgcrSplashCategoryValues[activityMode].heading || pgcrSplashCategoryValues.AllPvP.heading
  const gridColCount = `pgcr_splash_grid_${pgcrCategory.length + 1} `
  // console.log('CreateTeams:', props)

  return (
    <>
      <li className={`pgcr-char-wrap ${gridColCount}`}>
        <div></div> {/* icon */}
        <div>GUARDIAN</div> {/* username */}
        <div></div> {/* DNF */}
        {pgcrCategory.map((headings, index) => (
          <div key={index} className='pgcr player-stats'>
            <span></span>
            {headings}
          </div>
        ))}
      </li>
    </>
  )
}

export function CreateTeams(props: DisplayTeamInterface) {
  const { entriesList, activityMode } = props
  const teamNames = ['Alpha', 'Bravo']
  // console.log('CreateTeams:', props)

  const checkTeams = entriesList
    .map((entry) => entry.values.team?.basic.displayValue)
    .every((team) => team === undefined)

  return (
    <>
      {
      checkTeams
      ?
      entriesList
        .map((player, playerIndex: number) => (
          <PgcrPlayer
            entry={player}
            activityMode={activityMode}
            index={playerIndex}
            team={'Bravo'} // Blue looks better
            key={playerIndex}
          />
        ))
      :
        teamNames
          .map((team, index: number) => (
          <DisplayTeam
            entriesList={entriesList}
            activityMode={activityMode}
            team={team}
            key={index}
          />
        ))
      }
    </>
  )
}

interface DisplayTeamInterface {
  entriesList: DestinyPostGameCarnageReportEntry[]
  activityMode?: PgcrTypes
  team?: string
}
export function DisplayTeam(props: DisplayTeamInterface) {
  const { entriesList, activityMode, team } = props
  // console.log('DisplayTeam:', props)

  return (
    <>
      {entriesList
        .filter((entry) => getTeamName(entry.values.team?.basic.displayValue) === team)
        .map((player, playerIndex: number) => (
          <PgcrPlayer
            entry={player}
            activityMode={activityMode}
            index={playerIndex}
            team={team}
            key={playerIndex}
          />
        ))}
    </>
  )
}

function PgcrPlayer(props: PgcrPlayerInterface) {
  const { entry, activityMode, index, team } = props
  // console.log('PgcrPlayer', props)

  const pgcrValues =
    pgcrSplashCategoryValues[activityMode].values || pgcrSplashCategoryValues.AllPvP.values

  const dnf = entry.values.completed.basic.displayValue !== 'Yes'
  const icon = entry.player.destinyUserInfo.iconPath
  const userName = entry.player.destinyUserInfo.displayName
  const data = getPgcrData(props)

  // array starts at 0 + 2 for icon and username
  const gridLength = pgcrValues.length + 1

  const iconStyle = {
    backgroundImage: `url(https://www.bungie.net${icon})`,
    maxHeight: 30,
  }

  return (
    <li
      className={`pgcr-char-wrap team-${team.toLowerCase()} pgcr_splash_grid_${gridLength} ${dnf ? 'pgcr-dnf-player' : ''}`}
      key={index}
    >
      <div className={'pgcr pgcr-player-stats player-name-icon'}>
        <div className={'pgcr player-icon'} style={iconStyle}></div>
      </div>
      <div className={'pgcr player-stats'}>
        <div className='align-left' >{userName}</div>
      </div>

      <div className={`${dnf ? 'pgcr-dnf' : ''}`}>{dnf ? 'DNF' : ''}</div>

      {pgcrValues.map((value: pgcrStatType, valueIndex: number) => (
        <div className={'pgcr player-stats'} key={valueIndex}>
          <div>{data[value]}</div>
        </div>
      ))}
    </li>
  )
}

