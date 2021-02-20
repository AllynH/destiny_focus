import React, { useState, useEffect } from 'react'

import Crucible from '../../../destiny-icons/factions/faction_crucible.svg'
import FactionRep from '../../../destiny-icons/factions/faction_crucible_glory.svg'
import AlphaTeam from '../../../destiny-icons/factions/team_alpha.svg'
import BravoTeam from '../../../destiny-icons/factions/team_bravo.svg'

import './style.css'

export default function PgcrSplash() {
  return (
    <div className='pgcr-splash-wrapper'>
      <div className='pgcr-splash-container'>
        <div className='container-left'>
          <div className='container-left-icons'>
            <div className='container-left-game-icon'>
              <div className='game-icon-bg'></div>
              <div className='game-icon-diamond'></div>
              <Crucible width={300} height={345} viewBox={'0 0 30 30'} style={{ fill: 'var(--crucible-red)', zIndex: 1, filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))' } } />
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

            <div className='pgcr-splash-team-wrap'>
              <div className='pgcr-splash-alpha'>
                <div className='team-icon-score-wrap'>
                  <div className='team-icon-score-pull-left'>
                  <div className='team-score'><h2>125</h2></div>
                  <div className='team-icon-wrap'>
                    <div className='alpha-icon-bg'></div>
                    <AlphaTeam width={50} height={50} viewBox={'0 0 32 32'} style={{ fill: 'var(--crucible-red)' }} />
                  </div>
                  </div>
                  <h2>ALPHA</h2>
                </div>
                <div className='alpha-colour-banner'></div>
              </div>
              <div className='pgcr-splash-character-row'>
                <div className='pgcr-splash-character-details'>
                    <div>ChimpAhoy</div>
                    <div>Kills</div>
                    <div>Deaths</div>
                    <div>Assists</div>
                    <div>KD/R</div>
                </div>
              </div>


              <div className='pgcr-splash-character-row'>
                <div className='pgcr-splash-character-details'>
                    <div>Character 2</div>
                    <div>Kills</div>
                    <div>Deaths</div>
                    <div>Assists</div>
                    <div>KD/R</div>
                </div>
              </div>

              <div className='pgcr-splash-character-row'>
                <div className='pgcr-splash-character-details'>
                    <div>Character 3</div>
                    <div>Kills</div>
                    <div>Deaths</div>
                    <div>Assists</div>
                    <div>KD/R</div>
                </div>
              </div>

              <div className='pgcr-splash-character-row'>
                <div className='pgcr-splash-character-details'>
                    <div>Character 4</div>
                    <div>Kills</div>
                    <div>Deaths</div>
                    <div>Assists</div>
                    <div>KD/R</div>
                </div>
              </div>

              <div className='pgcr-splash-character-row'>
                <div className='pgcr-splash-character-details'>
                    <div>Character 5</div>
                    <div>Kills</div>
                    <div>Deaths</div>
                    <div>Assists</div>
                    <div>KD/R</div>
                </div>
              </div>

              <div className='pgcr-splash-character-row'>
                <div className='pgcr-splash-character-details'>
                    <div>Character 6</div>
                    <div>Kills</div>
                    <div>Deaths</div>
                    <div>Assists</div>
                    <div>KD/R</div>
                </div>
              </div>

            </div>


            <div className='pgcr-splash-team-wrap'>
              <div className='pgcr-splash-alpha'>
                <div className='team-icon-score-wrap'>
                  <div className='team-icon-score-pull-left'>
                  <div className='team-score'><h2>105</h2></div>
                  <div className='team-icon-wrap'>
                    <div className='bravo-icon-bg'></div>
                    <BravoTeam width={50} height={50} viewBox={'0 0 32 32'} style={{ fill: 'var(--vanguard-blue)' }} />
                  </div>
                  </div>
                  <h2>BRAVO</h2>
                </div>
                <div className='bravo-colour-banner'></div>
              </div>
              <div className='pgcr-splash-character-row'>
                <div className='pgcr-splash-character-details'>
                    <div>ChimpAhoy</div>
                    <div>Kills</div>
                    <div>Deaths</div>
                    <div>Assists</div>
                    <div>KD/R</div>
                </div>
              </div>


              <div className='pgcr-splash-character-row'>
                <div className='pgcr-splash-character-details'>
                    <div>Character 2</div>
                    <div>Kills</div>
                    <div>Deaths</div>
                    <div>Assists</div>
                    <div>KD/R</div>
                </div>
              </div>

              <div className='pgcr-splash-character-row'>
                <div className='pgcr-splash-character-details'>
                    <div>Character 3</div>
                    <div>Kills</div>
                    <div>Deaths</div>
                    <div>Assists</div>
                    <div>KD/R</div>
                </div>
              </div>

              <div className='pgcr-splash-character-row'>
                <div className='pgcr-splash-character-details'>
                    <div>Character 4</div>
                    <div>Kills</div>
                    <div>Deaths</div>
                    <div>Assists</div>
                    <div>KD/R</div>
                </div>
              </div>

              <div className='pgcr-splash-character-row'>
                <div className='pgcr-splash-character-details'>
                    <div>Character 5</div>
                    <div>Kills</div>
                    <div>Deaths</div>
                    <div>Assists</div>
                    <div>KD/R</div>
                </div>
              </div>

              <div className='pgcr-splash-character-row'>
                <div className='pgcr-splash-character-details'>
                    <div>Character 6</div>
                    <div>Kills</div>
                    <div>Deaths</div>
                    <div>Assists</div>
                    <div>KD/R</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
