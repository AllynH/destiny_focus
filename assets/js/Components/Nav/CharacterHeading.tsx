/* eslint-disable camelcase */
import React from 'react'

import Warlock from '../../../destiny-icons/general/class_warlock.svg'
import Titan from '../../../destiny-icons/general/class_titan.svg'
import Hunter from '../../../destiny-icons/general/class_hunter.svg'

import PlatformPC from '../../../destiny-icons/platforms/platform_pc.svg'
import PlatformPS from '../../../destiny-icons/platforms/platform_playstation.svg'
import PlatformXb from '../../../destiny-icons/platforms/platform_xbox.svg'

import { SingleCharacterInterface } from '../../Types/DestinyFocus/GetCharacter'

import './style.css'

interface CharacterHeadingInterface {
  profile: SingleCharacterInterface
  loggedInUser: boolean
}

interface ClassIconProps {
  className: string
}
const ClassIcon = (props: ClassIconProps) => {
  const { className } = props
  if (className === 'Hunter') {
    return (
      <Hunter
        width={22}
        height={22}
        viewBox={'0 0 30 32'}
        style={{
          fill: 'white',
          zIndex: 1,
          filter: 'drop-shadow( 3px 3px 5px rgba(0, 0, 0, .8))',
        }}
      />
    )
  }
  if (className === 'Titan') {
    return (
      <Titan
        width={22}
        height={22}
        viewBox={'0 0 30 32'}
        style={{
          fill: 'white',
          zIndex: 1,
          filter: 'drop-shadow( 3px 3px 5px rgba(0, 0, 0, .8))',
        }}
      />
    )
  }
  return (
    <Warlock
      width={22}
      height={22}
      viewBox={'0 0 30 32'}
      style={{
        fill: 'white',
        zIndex: 1,
        filter: 'drop-shadow( 3px 3px 5px rgba(0, 0, 0, .8))',
      }}
    />
  )
}

const PlatformIcon = (props: { membershipType: string }) => {
  const { membershipType } = props
  switch (membershipType) {
    default:
    case '1':
      return (
        <PlatformXb
          width={22}
          height={22}
          viewBox={'0 0 32 32'}
          style={{
            fill: 'white',
            zIndex: 1,
            filter: 'drop-shadow( 3px 3px 5px rgba(0, 0, 0, .8))',
          }}
        />
      )
    case '2':
      return (
        <PlatformPS
          width={22}
          height={22}
          viewBox={'0 0 32 32'}
          style={{
            fill: 'white',
            zIndex: 1,
            filter: 'drop-shadow( 3px 3px 5px rgba(0, 0, 0, .8))',
          }}
        />
      )
    case '3':
      return (
        <PlatformPC
          width={22}
          height={22}
          viewBox={'0 0 32 32'}
          style={{
            fill: 'white',
            zIndex: 1,
            filter: 'drop-shadow( 3px 3px 5px rgba(0, 0, 0, .8))',
          }}
        />
      )
  }
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
