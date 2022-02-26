import React from 'react'

import { FOCUS_DETAILS } from '../Focus/FocusDetails'
import { FocusDetailKey } from '../Focus/types'
import FlipCard from './FlipCard'

export default function FlipCardDeck() {
  return (
    <div>
      <div className='focus-header'>
        <h1>Choose a focus:</h1>
      </div>

      <div className='card-wrapper'>
        {Object.keys(FOCUS_DETAILS).map((f: FocusDetailKey, index: number) => (
          <div key={index} className='flip-card-wrap'>
            <FlipCard focusDetails={FOCUS_DETAILS[f]} />
          </div>
        ))}
      </div>

    </div>
  )
}
