import React, { useRef } from 'react'
// import { useParams } from 'react-router-dom'

// import Button from '@material-ui/core/Button'
// import SaveIcon from '@material-ui/icons/Save'
// import {
//   calculateKillDeathRatio,
//   calculateKillDeathAssistsRatio,
// } from '../../Utils/HelperFunctions/KdrFunctions'
import { getDatePlayedFromTimestamp } from '../../Utils/HelperFunctions/getDateTime'
import { pgcrSplashCategories } from './parsePgcrData'

import SelectActivityIcon from './SelectActivityIcon'
import Player from './Player'
import ReturnToFocusButton from './ReturnToFocus'
// import { capturePngWithName } from '../../Utils/HelperFunctions/CaptureImage'

import './style.css'

export default function RaidSplash({
  pgcr = {},
  activityDef = {},
  referenceDef = {},
  modeIsRaid = true,
  activityMode = 4,
  setActiveUserId = null,
  pathname = '/',
}) {
  // const params = useParams()
  const currRef = useRef(null)
  // console.log('PvpSplash.js')
  // console.log('pgcr', pgcr)
  // console.log('activityDef', activityDef)
  // console.log('referenceDef', referenceDef)

  // const { activityId } = params
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

  const completionDate = pgcr ? getDatePlayedFromTimestamp(pgcr?.Response?.period) : 0
  const completionTime = pgcr
    ? pgcr?.Response?.entries[0]?.values?.activityDurationSeconds?.basic?.displayValue
    : '666 hours'
  const nfScore = pgcr?.Response?.entries
    .map((el) => el.values.teamScore.basic.value)
    .reduce((acc, curr) => (acc > curr ? acc : curr), 0)
  const pgcrCategory = pgcrSplashCategories[activityMode] || pgcrSplashCategories.Raid
  const gridColCount = `pgcr_splash_grid_${pgcrCategory.length}`
  return (
    <>
      <div className='return-button-wrapper'>
        {pathname !== '/' ? <ReturnToFocusButton pathname={pathname} /> : ''}
      </div>
      <div className='pgcr-splash-wrapper' style={mapStyle()}>
        <div className='pgcr-splash-container' ref={currRef}>
          <div className='container-left'>
            <div className='container-left-icons'>
              <div className='container-left-game-icon'>
                <div className='game-icon-bg raid-icon-bg'></div>
                <div className='game-icon-diamond raid-icon-bg'></div>
                <SelectActivityIcon activityMode={activityMode} />
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
                    <h2 className='pgcr activity-map-name'>{returnMapName()}</h2>
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
                  {pgcrCategory.map((cats, index) => (
                    <div key={index} className='pgcr-category'>
                      {cats}
                    </div>
                  ))}
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
                                .map((t) => t.score.basic.value)}
                          </h2>
                        </div>
                        {/* <div className='team-icon-wrap'>
                        <div className='alpha-icon-bg z-index-2'></div>
                        <AlphaTeam
                          className='z-index-2'
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
                    && pgcr?.Response?.entries.map((entry, index) => (
                      <Player
                        {...setActiveUserId}
                        entry={entry}
                        key={index}
                        {...modeIsRaid}
                        activityMode={activityMode}
                      />
                    ))}
                </div>
              </div>

              {activityMode === 'Nightfall' ? (
                <div className='stats header-completion-time'>
                  <p className='stats completion-time-value pgcr-splash-nf-score'>
                    SCORE: {nfScore}
                  </p>
                </div>
              ) : (
                ''
              ) }
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
    </>
  )
}
