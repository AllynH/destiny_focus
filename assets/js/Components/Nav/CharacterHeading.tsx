/* eslint-disable camelcase */
import React from 'react'

import PlatformIcon from '../CharacterSelect/PlatformIcon'
import ClassIcon from '../CharacterSelect/ClassIcons'

import { SingleCharacterInterface } from '../../Types/DestinyFocus/GetCharacter'

import './style.css'

interface CharacterHeadingInterface {
  profile: SingleCharacterInterface
  loggedInUser: boolean
}


export default function CharacterHeading(props: CharacterHeadingInterface) {
  const { displayName, light, destiny_class, membershipType } = props.profile
  return (
    <div className='character-heading-home-button-wrap'>
      <div className='character-heading-wrapper'>
        <div className='character-heading-platform-name-wrap'>
          <div className='character-heading-platform'>
            <PlatformIcon membershipType={membershipType} />
          </div>
          <div className='character-heading-title'>{displayName}</div>
        </div>
        <div className='character-heading-platform-name-wrap'>
          <div className='character-heading-class'>
            <ClassIcon className={destiny_class} />
          </div>
          <div className='character-heading-light-wrap'>
            <div className='character-heading-light'>✧</div>
            <div className='character-heading-light'>{light}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
