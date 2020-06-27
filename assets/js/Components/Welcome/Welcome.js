import React from 'react'
import './style.css'

export default function Welcome() {
  return (
    <section className='welcome-content'>
      <div className='welcome-wrapper'>
        <h1 className='welcome'>Welcome to Destiny Focus</h1>

        <h2>
          Focus on <span className='text_rotate'></span>
        </h2>

        <p className='welcome-text'>Authorise your account with Bungie to continue.</p>
        <a className='welcome-button' href={'/authorize/bungie'}>
          Authorise
        </a>
      </div>
    </section>
  )
}
