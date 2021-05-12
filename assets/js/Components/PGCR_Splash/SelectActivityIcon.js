import React from 'react'

import Crucible from '../../../destiny-icons/factions/faction_crucible.svg'
import Gambit from '../../../destiny-icons/gambit/gambit2.svg'
import Trials from '../../../img/icons/faction_osiris2.svg'
import Raid from '../../../destiny-icons/explore/raid_complex.svg'

import DualSpinner from '../../Utils/Loading/SpinnerDualRing'

import './style.css'

export default function SelectActivityIcon(props) {
  const { activityMode } = props
  const { smallIcon } = props || false

  const iconWidth = smallIcon ? 150 : 300
  const iconHeight = smallIcon ? 150 : 345
  const iconColour = smallIcon ? 'white' : null

  const ReturnActivityIcon = () => {
    const m = props.activityMode
    switch (m) {
      case 'Raid':
      case 'Nightfall':
      default:
        return (
          <Raid
            width={iconWidth}
            height={iconHeight}
            viewBox={'0 0 30 32'}
            style={{
              fill: smallIcon ? iconColour : 'var(--grey-light-2)',
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
            width={iconWidth}
            height={iconHeight}
            viewBox={'0 0 30 32'}
            style={{
              fill: smallIcon ? iconColour : 'var(--crucible-red)',
              zIndex: 1,
              filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))',
            }}
          />
        )
      case 'Gambit':
        return (
          <Gambit
            width={iconWidth}
            height={iconHeight}
            viewBox={'0 0 30 32'}
            style={{
              fill: smallIcon ? iconColour : 'var(--gambit-green)',
              zIndex: 1,
              filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))',
            }}
          />
        )
      case 'TrialsOfOsiris':
        return (
          <Trials
            width={iconWidth}
            height={iconHeight}
            // Values taken from .svg
            viewBox={'0 0 8.4 8.4'}
            style={{
              fill: smallIcon ? iconColour : 'var(--bungie-power)',
              // stroke: 'var(--bungie-power)',
              zIndex: 1,
              filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))',
            }}
          />
        )
      case 'Unknown':
        return (
        <div
        style={{ display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center' }}
        ><DualSpinner /></div> )
    }
  }

  return <ReturnActivityIcon activityMode={activityMode} />
  // return {ReturnActivityIcon(activityMode)}
}
