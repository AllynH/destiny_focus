import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { GetPGCRUnauth } from '../../Utils/API/API_Requests'

import Crucible from '../../../destiny-icons/factions/faction_crucible.svg'
import FactionRep from '../../../destiny-icons/factions/faction_crucible_glory.svg'
import AlphaTeam from '../../../destiny-icons/factions/team_alpha.svg'
import BravoTeam from '../../../destiny-icons/factions/team_bravo.svg'

import { capturePngWithName } from '../../Utils/HelperFunctions/CaptureImage'

import './style.css'

export default function PvpSplash(props) {
  const [pgcr, setPgcr] = useState()
  const params = useParams()
  const currRef = useRef(null)
  console.log('PvpSplash.js')
  console.log(params)
  console.log(props)
  const { pathname } = props.location?.state || ''
  console.log('Return address:', pathname)

  const { activityId } = params

  // const activityId = 7897012836

  // Fetch the Activity definition - Map icon, name :
  useEffect(() => {
    const fetchPgcr = async (activityId) => {
      const result = await GetPGCRUnauth({
        params: {
          activityId,
        },
      })
      // console.log('fetchPgcr')
      setPgcr(result)
      // console.log(result)
    }
    fetchPgcr(activityId)
  }, [props])

  function Player(e) {
    const username = e?.player?.destinyUserInfo?.displayName
    const kills = e?.values?.kills?.basic?.value
    const deaths = e?.values?.deaths?.basic?.value
    const assists = e?.values?.assists?.basic?.value
    const kdr = deaths > 0 ? (kills / deaths).toFixed(1) : 0

    return (
      <div className='pgcr-splash-character-row'>
        <div className='pgcr-splash-character-details'>
          <div className='align-left'>{username}</div>
          <div>{kills}</div>
          <div>{deaths}</div>
          <div>{assists}</div>
          <div>{kdr}</div>
        </div>
      </div>
    )
  }

  return (
    <div className='pgcr-splash-wrapper'>
      <div className='pgcr-splash-container'
        ref={currRef}
      >
        <div className='container-left'>
          <div className='container-left-icons'>
            <div className='container-left-game-icon'>
              <div className='game-icon-bg'></div>
              <div className='game-icon-diamond'></div>
              <Crucible
                width={300}
                height={345}
                viewBox={'0 0 30 30'}
                style={{
                  fill: 'var(--crucible-red)',
                  zIndex: 1,
                  filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))',
                }}
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
                <h1 className='pgcr-splash-match-result'>MATCH RESULTS</h1>
              </div>
            </div>

            <div className='pgcr-position-relative'>
              <div className='gcr-splash-categories'>
                <div></div>
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
                        <div className='alpha-icon-bg'></div>
                        <AlphaTeam
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
