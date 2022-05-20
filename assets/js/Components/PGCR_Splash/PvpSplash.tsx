import React, { useRef } from 'react'

import {
  DestinyActivityDefinition,
  DestinyPostGameCarnageReportData,
} from 'bungie-api-ts/destiny2/interfaces'
import { ServerResponse } from 'bungie-api-ts/destiny2'

import { getDatePlayedFromTimestamp } from '../../Utils/HelperFunctions/getDateTime'
import { pgcrSplashCategoryValues } from './types'

import SelectActivityIcon from './SelectActivityIcon'
import Player from './Player'
import ReturnToFocusButton from './ReturnToFocus'

// import FactionRep from '../../../destiny-icons/factions/faction_crucible_glory.svg'
import AlphaTeam from '../../../destiny-icons/factions/team_alpha.svg'
import BravoTeam from '../../../destiny-icons/factions/team_bravo.svg'

import './style.css'
import { PgcrTypes } from '../../Data/destinyEnums'

export interface PvPPropsInterface {
  pgcr: ServerResponse<DestinyPostGameCarnageReportData>
  activityDef: DestinyActivityDefinition
  referenceDef: DestinyActivityDefinition
  modeIsRaid: boolean
  activityMode: PgcrTypes
  setActiveUserId: number
  pathname: string
}

export default function PvpSplash(props: PvPPropsInterface) {
  const { pgcr, activityDef, referenceDef, modeIsRaid, activityMode, setActiveUserId, pathname } =
    props
  const currRef = useRef(null)

  const backgroundImage = `url(https://www.bungie.net${referenceDef.pgcrImage})`
  const mapStyle = () => ({
    '--bgImage': backgroundImage,
  })

  const completionDate = pgcr ? getDatePlayedFromTimestamp((pgcr?.Response?.period)) : 0
  const completionTime = pgcr
    ? pgcr?.Response?.entries[0]?.values?.activityDurationSeconds?.basic?.displayValue
    : '666 hours'
  const pgcrCategory =
    pgcrSplashCategoryValues[activityMode].heading || pgcrSplashCategoryValues.AllPvP.heading
  const gridColCount = `pgcr_splash_grid_${pgcrCategory.length + 1} `

  /* Some older matches use a strange mix of Alpha, Bravo, 16, 17, 8 & 19 to denote team names: */
  const teamsArray: Array<string | number> = pgcr.Response.teams.map((t) => t.teamId)

  return (
    <>
      <div className='return-button-wrapper'>
        {pathname !== '/' ? <ReturnToFocusButton pathname={pathname} /> : ''}
      </div>
      <div className='pgcr-splash-wrapper' style={mapStyle() as React.CSSProperties} ref={currRef}>
        <div className='pgcr-splash-container'>
          <div className='container-left'>
            <div className='container-left-icons'>
              <div className='container-left-game-icon'>
                <div className='game-icon-bg pvp-icon-bg'></div>
                <div className='game-icon-diamond pvp-icon-bg'></div>
                <SelectActivityIcon activityMode={activityMode} iconStyle={'largeIconPgcr'} />
              </div>
              <div className='container-left-rep-icon'>
                {/* <FactionRep width={300} height={345} viewBox={'0 0 30 30'} /> */}
              </div>
            </div>
          </div>

          <div className='container-right'>
            <div className='container-right-wrap'>
              <div className='match-results'>
                <div className='pgcr-splash-heading-wrap'>
                  <div className='heading-underline'></div>
                  <h1 className='pgcr-splash-match-result'>
                    {activityDef.displayProperties?.name || 'UNKNOWN ACTIVITY'}
                  </h1>
                  <div className='pgcr activity-results-wrapper'>
                    <h2 className='pgcr activity-map-name'>
                      {referenceDef.displayProperties?.name || 'UNKNOWN MAP'}
                    </h2>
                    <div className='stats header-completion-time'>
                      <p className='stats completion-time-value'>{completionDate}</p>
                      <p className='stats completion-time-value'>{completionTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='pgcr-position-relative'>
                <div className={`pgcr-splash-categories raid_details ${gridColCount}`}>
                  <div></div> {/* icon */}
                  <div></div> {/* username */}
                  <div></div> {/* DNF */}
                  {pgcrCategory.map((cats, index) => (
                    <div key={index} className='pgcr-category'>
                      {cats}
                    </div>
                  ))}
                </div>

                <TeamsDisplay
                  pgcr={pgcr}
                  setActiveUserId={setActiveUserId}
                  modeIsRaid={modeIsRaid}
                  teamArray={teamsArray}
                  activityMode={activityMode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Button
            variant='contained'
            color='primary'
            size='small'
            // className={classes.button}
            startIcon={<SaveIcon />}
            onClick={() => takePictureEvent(currRef, 'Destiny-Focus_PGCR', `PGCR_PvP_${activityMode}`)}
          >
            Share .jpg
          </Button> */}
    </>
  )
}

export interface PvPTeamsInterface {
  pgcr: ServerResponse<DestinyPostGameCarnageReportData>
  teamArray: Array<string | number>
  modeIsRaid: boolean
  activityMode: PgcrTypes
  setActiveUserId: number
}

function TeamsDisplay(props: PvPTeamsInterface) {
  const { pgcr, teamArray, modeIsRaid, setActiveUserId, activityMode } = props

  return (
    <>
      {teamArray.map((currTeam, index) => (
        <div key={index} className='pgcr-splash-team-wrap'>
          <div className='pgcr-splash-alpha'>
            <div className='team-icon-score-wrap'>
              <div className='team-icon-score-pull-left'>
                <div className='team-score'>
                  <h2>
                    {pgcr &&
                      pgcr?.Response?.teams
                        .filter((t) => t.teamId === currTeam)
                        .map((t) => t.score.basic.value)}
                  </h2>
                </div>
                <div className='team-icon-wrap'>
                  <div className='alpha-icon-bg z-index-2'></div>
                  {index === 0 ? (
                    <AlphaTeam
                      className='z-index-2'
                      width={50}
                      height={50}
                      viewBox={'0 0 32 32'}
                      style={{ fill: 'var(--crucible-red)' }}
                    />
                  ) : (
                    <BravoTeam
                      className='z-index-2'
                      width={50}
                      height={50}
                      viewBox={'0 0 32 32'}
                      style={{ fill: 'var(--vanguard-blue)' }}
                    />
                  )}
                </div>
              </div>
              <h2>{index === 0 ? 'ALPHA' : 'BRAVO'}</h2>
            </div>
            <div className='alpha-colour-banner'></div>
          </div>

          {pgcr &&
            pgcr?.Response?.entries
              .filter((entry) => entry.values?.team?.basic?.value === currTeam)
              .map((entry, indexPlayer) => (
                <Player
                  key={indexPlayer}
                  entry={entry}
                  {...setActiveUserId}
                  {...modeIsRaid}
                  activityMode={activityMode}
                />
              ))}
        </div>
      ))}
    </>
  )
}
