/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import React from 'react'

export default function DisplayStats({
  heading = 'heading',
  subHeading = 'subHeading',
  games_played = '',
  games_won = '',
  big_name = 'big_name',
  big_value = '0',
  name_1 = 'name_1',
  value_1 = '0',
  name_2 = 'name_2',
  value_2 = '0',
}) {
  const GameStats = () => (
    <div className='stats games-played'>
      <p className='stats stats-title'>
        <span>GAMES PLAYED&nbsp;</span>
        <span className='stats stats-value'>{games_played}</span>
      </p>
      <p className='stats stats-title'>
        <span>GAMES WON&nbsp;</span>
        <span className='stats stats-value'>{games_won}</span>
      </p>
    </div>
  )
  return (
    <div>
      {heading !== 'heading' ? <h2 className='stats stats-h2-main'>{heading}</h2> : ''}
      {/* <h2 className='stats stats-h2-main'>{heading}</h2> */}
      <div className='stats life-time-stats'>
        <h2 className='stats stats-h2'>{subHeading}</h2>
        {heading !== 'heading' ? <GameStats /> : ''}
        <div className='stats circle-outer'>
          <div className='stats circle'>
            <p className='stats stats-title-next-line stats-big'>
              <span className='stats-title-next-line'>{big_name}</span>
              <span className='stats stats-value-next-line'>{big_value}</span>
            </p>
            <p className='stats stats-title'>
              <span>{name_1}&nbsp;</span>
              <span className='stats stats-value'>{value_1}</span>
            </p>
            <p className='stats stats-title'>
              <span>{name_2}&nbsp;</span>
              <span className='stats stats-value'>{value_2}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
