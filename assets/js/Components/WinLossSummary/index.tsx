import React from 'react'

import './style.css'
import { WinLossProps } from './types'

export default function WinLossSummary(props: WinLossProps) {
  const { winLossArray, winLossPercent } = props

  return (
    <div className='win-loss-title-wrap'>
      <h2 className='win-loss-title'>Win / Loss percent: {winLossPercent}</h2>
      <div className='win-loss-wrapper progressions-item-wrap'>
        <div className='win-loss-container'>
          <div className='win-loss-baseline'></div>
          {winLossArray.map((result) =>
            (result ? (
              <div className='win-loss-circle win-loss-lost-game'></div>
            ) : (
              <div className='win-loss-circle win-loss-won-game'></div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
