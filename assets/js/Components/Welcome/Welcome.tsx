import React from 'react'
import { Link } from 'react-router-dom'

// import Crucible from '../../../img/icons/Crucible.svg'
import WitchQueen from '../../../img/icons/Expansions/Witch_Queen/WitchQueen.svg'
import SelectActivityIcon from '../PGCR_Splash/SelectActivityIcon'

import './style.css'

export default function Welcome() {
  const pathname = '/'

  return (
    <section className='welcome-content'>
      <div className='welcome-content-image-wrapper'>
        <div className='welcome-wrapper'>
          <div className='blur-wrap'>
            <h1 className='welcome'>Welcome to Destiny Focus</h1>
          </div>
          <h2>
            Focus on <span className='text_rotate'></span>
          </h2>

          <p className='welcome-text'>Authorise your account with Bungie to continue.</p>
          <a
            className='welcome-button'
            tabIndex={0}
            role='button'
            aria-pressed='false'
            href={'/authorize/bungie'}
          >
            Authorise
          </a>
        </div>

        <div className="welcome-tour-wrapper">
          <div className='welcome-wrapper'>
            <h3>Take a tour - view a Post Game Carnage Report:</h3>
            <ul className="account-focus-selector-list">
              <li className="focus-selector-item list-style-none">
                {/* Raid link */}
                <Link
                  to={{
                    pathname: `/pgcr/11709381670`, 
                    state: {
                      pathname,
                    },
                  }}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  
                >
                  <div className="account-focus-image-wrap">
                    <div className="account-focus-text">Raid</div>
                    <div className="account-focus-image">
                      <SelectActivityIcon
                        activityMode={'Raid'}
                        iconStyle={'smallIconAccountSelect'}
                      />
                    </div>
                  </div>
                </Link>
              </li>
              {/* PvP link */}
              <li className="focus-selector-item list-style-none">
                <Link
                  to={{ pathname: `/pgcr/11911177179`, 
                  state: {
                    pathname,
                  },
                }}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="account-focus-image-wrap">
                    <div className="account-focus-text">Trials of Osiris</div>
                    <div className="account-focus-image">
                      <SelectActivityIcon
                        activityMode={'TrialsOfOsiris'}
                        iconStyle={'smallIconAccountSelect'}
                      />
                    </div>
                  </div>
                </Link>
              </li>
              {/* PvP link */}
              <li className="focus-selector-item list-style-none">
                <Link
                  to={{ pathname: `/pgcr/11894019643`, 
                  state: {
                    pathname,
                  },
                }}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="account-focus-image-wrap">
                    <div className="account-focus-text">Control</div>
                    <div className="account-focus-image">
                      <SelectActivityIcon
                        activityMode={'allpvp'}
                        iconStyle={'smallIconAccountSelect'}
                      />
                    </div>
                  </div>
                </Link>
              </li>

            </ul>
          </div>
        </div>

        <div className='welcome-image-placement'>
          <WitchQueen
            className='welcome-image'
            viewBox={'0 0 8.4 8.4'}
          />
        </div>

      </div>
    </section>
  )
}
