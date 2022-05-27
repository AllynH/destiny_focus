/* eslint-disable camelcase */
import React from 'react'

import { Link } from 'react-router-dom'

import { SingleCharacterInterface } from '../../Types/DestinyFocus/GetCharacter'

import './style.css'
import PlatformIcon from './PlatformIcon'
import ClassIcon from './ClassIcons'

interface CharacterHeadingInterface {
  profile: SingleCharacterInterface
  loggedInUser: boolean
  membershipType?: string
  membershipId?: string
}

export default function CharacterCardMinimal(props: CharacterHeadingInterface) {
  const { profile, membershipType, membershipId } = props
  const { displayName, light, destiny_class, character_id } = props.profile
  const iconStyle = {
    background: `url(https://www.bungie.net${profile.emblemBackgroundPath})`,
  }
  const linkUrl = `/auth/choose_focus/${membershipType}/${membershipId}/${character_id}/`
  return (
    <div className='character-card-wrap'>
      <Link to={linkUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className='character-heading-wrapper hover-animation' style={iconStyle}>
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
      </Link>
    </div>
  )
}
