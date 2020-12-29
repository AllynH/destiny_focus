/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import React from 'react'

export default function DisplayAdditionalStats({
  games_played = '',
  games_won = '',
  kill_spree = '',
  longest_life = '',
  precision_kills = '',
  super_kills = '',
}) {
  const GameStats = () => (
    <div className='stats life-time-stats additional-stats'>
      <div className='stats games-played'>
        <p className='stats stats-title'>
          <span>GAMES PLAYED&nbsp;</span>
          <span className='stats stats-value'>{games_played}</span>
        </p>
        <p className='stats stats-title'>
          <span>GAMES WON&nbsp;</span>
          <span className='stats stats-value'>{games_won}</span>
        </p>
        <p className='stats stats-title'>
          <span>LONGEST KILL SPREE&nbsp;</span>
          <span className='stats stats-value'>{kill_spree}</span>
        </p>
        <p className='stats stats-title'>
          <span>MOST PRECISION KILLS&nbsp;</span>
          <span className='stats stats-value'>{precision_kills}</span>
        </p>
        <p className='stats stats-title'>
          <span>SUPER KILLS&nbsp;</span>
          <span className='stats stats-value'>{super_kills}</span>
        </p>
        <p className='stats stats-title'>
          <span>LONGEST SINGLE LIFE&nbsp;</span>
          <span className='stats stats-value'>{longest_life}</span>
        </p>
      </div>
    </div>
  )
  return (
    <div>
      <GameStats />
    </div>
  )
}
