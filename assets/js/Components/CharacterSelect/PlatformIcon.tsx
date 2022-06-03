import React from "react"

import PlatformPC from '../../../img/icons/Platforms/platform_pc.svg'
import PlatformPS from '../../../img/icons/Platforms/platform_playstation.svg'
import PlatformXb from '../../../img/icons/Platforms/platform_xbox.svg'


export default function PlatformIcon(props: { membershipType: string }) {
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
            alignSelf: 'center',
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
            alignSelf: 'center',
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
            alignSelf: 'center',
            fill: 'white',
            zIndex: 1,
            filter: 'drop-shadow( 3px 3px 5px rgba(0, 0, 0, .8))',
          }}
        />
      )
  }
}
