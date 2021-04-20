import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { calculateKillDeathRatio, calculateKillDeathAssistsRatio } from '../../Utils/HelperFunctions/KdrFunctions'
import { getDatePlayedFromTimestamp } from '../../Utils/HelperFunctions/getDateTime'

import SelectActivityIcon from './SelectActivityIcon'
import { capturePngWithName } from '../../Utils/HelperFunctions/CaptureImage'

import './style.css'

export default function RaidSplash({
  pgcr = {},
  activityDef = {},
  referenceDef = {},
  modeIsRaid = true,
  activityMode = 4,
  selectedCharacter = null,
}) {
  const params = useParams()
  const currRef = useRef(null)

  const backgroundImage = `url(https://www.bungie.net${referenceDef.pgcrImage})`
  const mapStyle = () => ({
    '--bgImage': backgroundImage,
  })

  const returnMapName = () => {
    if (!modeIsRaid) {
      return referenceDef.displayProperties?.description || 'UNKNOWN MAP'
    }
    return referenceDef.displayProperties?.description
  }

  function Player(e) {
    const completedDiv = (s) => {
      if (s) {
        return 'pgcr_splash-completed'
      }
      return 'pgcr_splash-failed'
    }

    const username = e?.player?.destinyUserInfo?.displayName
    const kills = e?.values?.kills?.basic?.value
    const deaths = e?.values?.deaths?.basic?.value
    const assists = e?.values?.assists?.basic?.value
    const score = e?.score?.basic?.value
    const kdr = calculateKillDeathRatio(kills, deaths)
    const standing = e?.values?.completed?.basic?.displayValue === 'Yes'
    const Completed = completedDiv(standing)
    const playerIcon = e?.player?.destinyUserInfo?.iconPath
    const iconStyle = {
      backgroundImage: `url(https://www.bungie.net${playerIcon})`,
      height: 30,
      width: 30,
      backgroundSize: 'contain',
    }
    return (
      <div className={`pgcr-splash-character-row ${Completed}`}>
        <div className='pgcr-splash-character-details raid-details'>
          <div className='pgcr-splash-icon'style={iconStyle}></div>
          <div className='align-left padding-left'>{username}</div>
          <div>{kills}</div>
          <div>{deaths}</div>
          <div>{assists}</div>
          <div>{modeIsRaid ? kdr : score}</div>
        </div>
      </div>
    )
  }

  const completionDate = pgcr ? getDatePlayedFromTimestamp(pgcr?.Response?.period) : 0
  const completionTime = pgcr ? pgcr?.Response?.entries[0]?.values?.activityDurationSeconds?.basic?.displayValue : '666 hours'
  const nfScore = pgcr?.Response?.entries
    .map((el) => el.values.teamScore.basic.value)
    .reduce((acc, curr) => (acc > curr) ? acc : curr, 0)

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
              <div className='game-icon-bg raid-icon-bg'></div>
              <div className='game-icon-diamond raid-icon-bg'></div>
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
                <h1 className='pgcr-splash-match-result'>{activityDef.displayProperties?.name || 'UNKNOWN ACTIVITY'}</h1>
                  <div className='pgcr activity-results-wrapper'>

                    <h2 className='pgcr activity-map-name'>
                      {returnMapName()}
                    </h2>
                    <div className='stats header-completion-time'>
                      <p className='stats completion-time-value'>{completionDate}</p>
                      <p className='stats completion-time-value'>{completionTime}</p>
                    </div>
                  </div>
              </div>
            </div>

            <div className='pgcr-position-relative'>
              <div className='pgcr-splash-categories raid-details'>
                <div></div> {/* icon */}
                <div></div> {/* username */}
                <div className='pgcr-category'>K</div>
                <div className='pgcr-category'>D</div>
                <div className='pgcr-category'>A</div>
                <div className='pgcr-category'>{modeIsRaid ? 'K/D R' : 'Score'}</div>
              </div>

              <div className='pgcr-splash-team-wrap'>
                <div className='pgcr-splash-alpha'>
                  <div className='team-icon-score-wrap'>
                    <div className='team-icon-score-pull-left'>
                      <div className='team-score'>
                        <h2>
                          {pgcr
                            && pgcr?.Response?.teams
                              // .filter((t) => t.teamId === 19)
                              .map((t, index) => t.score.basic.value)}
                        </h2>
                      </div>
                      {/* <div className='team-icon-wrap'>
                        <div className='alpha-icon-bg'></div>
                        <AlphaTeam
                          width={50}
                          height={50}
                          viewBox={'0 0 32 32'}
                          style={{ fill: 'var(--crucible-red)' }}
                        />
                      </div> */}
                    </div>
                    <h2>ALPHA</h2>
                  </div>
                  {/* <div className='alpha-colour-banner'></div> */}
                </div>

                {pgcr
                  && pgcr?.Response?.entries
                    .map((entry, index) => <Player {...entry} key={index} />)}
              </div>

            </div>

            { modeIsRaid
              ? ''
              : <div className='stats header-completion-time'>
                <p className='stats completion-time-value pgcr-splash-nf-score'>SCORE: {nfScore}</p>
              </div>
            }

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
