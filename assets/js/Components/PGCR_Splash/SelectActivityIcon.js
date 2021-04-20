import React from 'react'

import Crucible from '../../../destiny-icons/factions/faction_crucible.svg'
import Gambit from '../../../destiny-icons/gambit/gambit2.svg'
import Trials from '../../../img/icons/faction_osiris2.svg'
import Raid from '../../../destiny-icons/explore/raid_complex.svg'

import './style.css'

export default function SelectActivityIcon(props) {
  const { activityMode } = props

  const ReturnActivityIcon = (mode) => {
    const m = props.activityMode
    console.log('Activity Icon selector:', m)
    switch (m) {
      case 'Raid':
      case 'Nightfall':
      default:
        return (
          <Raid
            width={300}
            height={345}
            viewBox={'0 0 30 30'}
            style={{
              fill: 'var(--grey-light-2)',
              zIndex: 1,
              filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))',
            }}
          />
        )
      case 'AllPvP':
      case 'Survival':
      case 'Control':
      case 'Elimination':
      case 'Clash':
      case 'Rumble':
        return (
          <Crucible
            width={300}
            height={345}
            viewBox={'0 0 30 30'}
            style={{
              fill: 'var(--crucible-red)',
              zIndex: 1,
              filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))',
            }}
          />
        )
      case 'Gambit':
        return (
          <Gambit
            width={300}
            height={345}
            viewBox={'0 0 30 30'}
            style={{
              fill: 'var(--gambit-green)',
              zIndex: 1,
              filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))',
            }}
          />
        )
      case 'TrialsOfOsiris':
        return (
          <Trials
            width={300}
            height={345}
            // Values taken from .svg
            viewBox={'0 0 8.4 8.4'}
            style={{
              fill: 'var(--bungie-power)',
              // stroke: 'var(--bungie-power)',
              zIndex: 1,
              filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))',
            }}
          />
        )
    }
  }

  return <ReturnActivityIcon activityMode={activityMode} />
  // return {ReturnActivityIcon(activityMode)}
}
