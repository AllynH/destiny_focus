import React from 'react'

import Crucible from '../../../img/icons/Crucible.svg'

import './style.css'

export default function Welcome() {
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
            tabIndex='0'
            role='button'
            aria-pressed='false'
            href={'/authorize/bungie'}
          >
            Authorise
          </a>
        </div>
        <div className='welcome-image-placement'>
          <Crucible
            className='welcome-image'
            viewBox={'0 0 25 25'}
          />
        </div>
      </div>
    </section>
  )
}
