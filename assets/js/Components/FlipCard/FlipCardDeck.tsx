import React from 'react'
import { RouteComponentProps } from 'react-router'
import { CharacterPropsInterface } from '../../Data/CharacterProps'
import ClickableCharacterList from '../CharacterSelect/ClickableCharacterList'

import { FOCUS_DETAILS } from '../Focus/FocusDetails'
import { FocusDetailKey } from '../Focus/types'

import FlipCard from './FlipCard'

export default function FlipCardDeck(props: RouteComponentProps) {
  const { membershipType, membershipId, characterId } = props.match
    .params as CharacterPropsInterface

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
      <h2>Choose a character:</h2>
      <div className='character-select-wrapper'>
        <ClickableCharacterList memberships={{ membershipId, membershipType, characterId }} />
      </div>
    </div>
  )
}
