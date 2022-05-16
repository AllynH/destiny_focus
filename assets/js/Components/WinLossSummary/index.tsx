import React from 'react'

import './style.css'
import { WinLossProps } from './types'

export default function WinLossSummary(props: WinLossProps) {
  const { winLossArray, winLossPercent } = props

  const slicedArray = winLossArray.slice(0, 30)

  return (
    <div className='win-loss-title-wrap'>
      <h2 className='win-loss-title'>Win / Loss percent: {winLossPercent}</h2>

      {winLossArray.length > 30 ? (
        <p className='activity-count-message'>
          Percentage reflects data fo: {winLossArray.length} games
        </p>
      ) : (
        <p className='activity-count-message'></p>
      )}
      <div className='win-loss-wrapper progressions-item-wrap'>
        <div className='win-loss-container'>
          <div className='win-loss-baseline'></div>
          {slicedArray.map((result, index) =>
            (result ? (
              <div key={index} className='win-loss-circle win-loss-lost-game'></div>
            ) : (
              <div key={index} className='win-loss-circle win-loss-won-game'></div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
