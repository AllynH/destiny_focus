import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { calculateKillDeathRatio, calculateKillDeathAssistsRatio } from '../../Utils/HelperFunctions/KdrFunctions'
import { getDatePlayedFromTimestamp } from '../../Utils/HelperFunctions/getDateTime'

import SelectActivityIcon from './SelectActivityIcon'
import FactionRep from '../../../destiny-icons/factions/faction_crucible_glory.svg'
import AlphaTeam from '../../../destiny-icons/factions/team_alpha.svg'
import BravoTeam from '../../../destiny-icons/factions/team_bravo.svg'

import { capturePngWithName } from '../../Utils/HelperFunctions/CaptureImage'

import './style.css'

export default function PvpSplash(props) {
  const {
    pgcr, activityMode, modeIsRaid, activityDef, referenceDef,
  } = props
  const params = useParams()
  const currRef = useRef(null)
  console.log('PvpSplash.js')
  console.log(params)
  console.log(props)
  const { pathname } = props.location?.state || ''
  console.log('Return address:', pathname)

  const { activityId } = params

  const backgroundImage = `url(https://www.bungie.net${referenceDef.pgcrImage})`
  const mapStyle = () => ({
    '--bgImage': backgroundImage,
  })
  function Player(e) {
    const username = e?.player?.destinyUserInfo?.displayName
    const kills = e?.values?.kills?.basic?.value
    const deaths = e?.values?.deaths?.basic?.value
    const assists = e?.values?.assists?.basic?.value
    const kdr = calculateKillDeathRatio(kills, deaths)
    const playerIcon = e?.player?.destinyUserInfo?.iconPath
    const iconStyle = {
      backgroundImage: `url(https://www.bungie.net${playerIcon})`,
      height: 30,
      width: 30,
      backgroundSize: 'contain',
    }
    return (
      <div className='pgcr-splash-character-row'>
        <div className='pgcr-splash-character-details pvp-details'>
          <div className='pgcr-splash-icon'style={iconStyle}></div>
          <div className='align-left padding-left'>{username}</div>
          <div>{kills}</div>
          <div>{deaths}</div>
          <div>{assists}</div>
          <div>{kdr}</div>
        </div>
      </div>
    )
  }

  const completionDate = pgcr ? getDatePlayedFromTimestamp(pgcr?.Response?.period) : 0
  const completionTime = pgcr ? pgcr?.Response?.entries[0]?.values?.activityDurationSeconds?.basic?.displayValue : '666 hours'

  return (
    <div className='pgcr-splash-wrapper'
      style={mapStyle()}
    >
      <div className='pgcr-splash-container'
        ref={currRef}
      >
        <div className='container-left'>
          <div className='container-left-icons'>
            <div className='container-left-game-icon'>
              <div className='game-icon-bg pvp-icon-bg'></div>
              <div className='game-icon-diamond pvp-icon-bg'></div>
              <SelectActivityIcon
                activityMode={activityMode}
              />
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
                  <h1 className='pgcr-splash-match-result'>{activityDef?.displayProperties?.name || 'UNKNOWN ACTIVITY'}</h1>
                  <div className='pgcr activity-results-wrapper'>

                    <h2 className='pgcr activity-map-name'>
                      {referenceDef ? referenceDef.displayProperties?.name : 'UNKNOWN MAP'}
                    </h2>
                    <div className='stats header-completion-time'>
                      <p className='stats completion-time-value'>{completionDate}</p>
                      <p className='stats completion-time-value'>{completionTime}</p>
                    </div>
                  </div>
              </div>
            </div>

            <div className='pgcr-position-relative'>
              <div className='pgcr-splash-categories pvp-details'>
                <div></div> {/* icon */}
                <div></div> {/* username */}
                <div className='pgcr-category'>K</div>
                <div className='pgcr-category'>D</div>
                <div className='pgcr-category'>A</div>
                <div className='pgcr-category'>K/D R</div>
              </div>

              <div className='pgcr-splash-team-wrap'>
                <div className='pgcr-splash-alpha'>
                  <div className='team-icon-score-wrap'>
                    <div className='team-icon-score-pull-left'>
                      <div className='team-score'>
                        <h2>
                          {pgcr &&
                            pgcr?.Response?.teams
                              .filter((t) => t.teamId === 19)
                              .map((t, index) => t.score.basic.value)}
                        </h2>
                      </div>
                      <div className='team-icon-wrap'>
                        <div className='alpha-icon-bg z-index-2'></div>
                        <AlphaTeam
                          className='z-index-2'
                          width={50}
                          height={50}
                          viewBox={'0 0 32 32'}
                          style={{ fill: 'var(--crucible-red)' }}
                        />
                      </div>
                    </div>
                    <h2>ALPHA</h2>
                  </div>
                  <div className='alpha-colour-banner'></div>
                </div>

                {pgcr &&
                  pgcr?.Response?.entries
                    .filter((entry) => entry.values?.team?.basic?.value === 19)
                    .map((entry, index) => <Player {...entry} key={index} />)}
              </div>

              <div className='pgcr-splash-team-wrap'>
                <div className='pgcr-splash-alpha'>
                  <div className='team-icon-score-wrap'>
                    <div className='team-icon-score-pull-left'>
                      <div className='team-score'>
                        <h2>
                          {pgcr &&
                            pgcr?.Response?.teams
                              .filter((t) => t.teamId === 18)
                              .map((t, index) => t.score.basic.value)}
                        </h2>
                      </div>
                      <div className='team-icon-wrap'>
                        <div className='bravo-icon-bg'></div>
                        <BravoTeam
                          className='z-index-2'
                          width={50}
                          height={50}
                          viewBox={'0 0 32 32'}
                          style={{ fill: 'var(--vanguard-blue)' }}
                        />
                      </div>
                    </div>
                    <h2>BRAVO</h2>
                  </div>
                  <div className='bravo-colour-banner'></div>
                </div>
                {pgcr &&
                pgcr?.Response?.entries
                  .filter((entry) => entry.values?.team?.basic?.value === 18)
                  .map((entry, index) => <Player {...entry} key={index} />)}
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
            onClick={() => capturePngWithName(currRef, 'PGCR')}
          >
            Share .jpg
          </Button> */}
    </div>
  )
}
