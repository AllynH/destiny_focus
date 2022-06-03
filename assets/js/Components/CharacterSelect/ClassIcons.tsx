import React from 'react'

import Warlock from '../../../destiny-icons/general/class_warlock.svg'
import Titan from '../../../destiny-icons/general/class_titan.svg'
import Hunter from '../../../destiny-icons/general/class_hunter.svg'

interface ClassIconProps {
  className: string
}
export default function ClassIcon(props: ClassIconProps){
  const { className } = props
  if (className.toLowerCase() === 'hunter') {
    return (
      <Hunter
        width={32}
        height={32}
        // viewBox={'0 0 32 32'}
        style={{
          fill: 'white',
          zIndex: 1,
          filter: 'drop-shadow( 3px 3px 5px rgba(0, 0, 0, .8))',
        }}
      />
    )
  }
  if (className.toLowerCase() === 'titan') {
    return (
      <Titan
        width={32}
        height={32}
        // viewBox={'0 0 32 32'}
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
      width={32}
      height={32}
      // viewBox={'0 0 32 32'}
      style={{
        fill: 'white',
        zIndex: 1,
        filter: 'drop-shadow( 3px 3px 5px rgba(0, 0, 0, .8))',
      }}
    />
  )
}
