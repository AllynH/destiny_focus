import React from 'react'

import Crucible from '../../../destiny-icons/factions/faction_crucible.svg'
import Gambit from '../../../destiny-icons/gambit/gambit2.svg'
import Trials from '../../../img/icons/faction_osiris2.svg'
import Ironbanner from '../../../img/icons/faction_ironbanner2.svg'
import Raid from '../../../destiny-icons/explore/raid_complex.svg'
import Nightfall from '../../../img/icons/Nightfall.svg'
import Dungeon from '../../../img/icons/Dungeon.svg'

import DualSpinner from '../../Utils/Loading/SpinnerDualRing'

import './style.css'

export default function SelectActivityIcon(props) {
  const { activityMode } = props
  const { iconStyle } = props || 'smallIconPgcr'

  // This needs refactor - can now use FOCUS_DETAILS to choose all of these.
  // eslint-disable-next-line radar/cognitive-complexity
  const ReturnActivityIcon = () => {
    const activities = props.activityMode
    const m = activities.toLowerCase()
    // console.log('Activity Icon:')
    // console.log(m)
    let iconStyleVars = {}

    switch (iconStyle) {
      case 'smallIconPgcr':
      default:
        iconStyleVars = {
          iconWidth: 150,
          iconHeight: 150,
          iconColour: 'white',
          filterValue: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))',
        }
        break
      case 'largeIconPgcr':
        iconStyleVars = {
          iconWidth: 300,
          iconHeight: 345,
          iconColour: null,
          filterValue: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))',
        }
        break
        case 'cardIcon':
          iconStyleVars = {
            iconWidth: 300,
            iconHeight: 345,
            iconColour: 'white',
            filterValue: 'drop-shadow( 5px 5px 5px rgba(0, 0, 0, .8))',
          }
          break
      case 'cardSmallIcon':
        iconStyleVars = {
          iconWidth: 110,
          iconHeight: 110,
          iconColour: 'rgba(255, 255, 255, 0.2)',
          filterValue: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))',
        }
        break
        case 'smallIconAccountSelect':
        iconStyleVars = {
          iconWidth: 64,
          iconHeight: 64,
          iconColour: 'white',
          filterValue: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))',
        }
        break
    }

    switch (m) {
      case 'raid':
      default:
        return (
          <Raid
            width={iconStyleVars.iconWidth}
            height={iconStyleVars.iconHeight}
            viewBox={'0 0 30 32'}
            style={{
              fill: iconStyleVars.iconColour ? iconStyleVars.iconColour : 'var(--grey-light-2)',
              zIndex: 1,
              filter: iconStyleVars.filterValue,
            }}
          />
        )
      case 'pvp':
      case 'allpvp':
      case 'pvpcomp':
      case 'all pvp':
      case 'survival':
      case 'control':
      case 'control: quickplay':
      case 'elimination':
      case 'clash':
      case 'rumble':
        return (
          <Crucible
            width={iconStyleVars.iconWidth}
            height={iconStyleVars.iconHeight}
            viewBox={'0 0 30 32'}
            style={{
              fill: iconStyleVars.iconColour ? iconStyleVars.iconColour : 'var(--crucible-red)',
              zIndex: 1,
              filter: iconStyleVars.filterValue,
            }}
          />
        )
      case 'gambit':
        return (
          <Gambit
            width={iconStyleVars.iconWidth}
            height={iconStyleVars.iconHeight}
            viewBox={'0 0 30 32'}
            style={{
              fill: iconStyleVars.iconColour ? iconStyleVars.iconColour : 'var(--gambit-green)',
              zIndex: 1,
              filter: iconStyleVars.filterValue,
            }}
          />
        )
      case 'ironbanner':
      case 'IronBanner':
        return (
          <Ironbanner
            width={iconStyleVars.iconWidth}
            height={iconStyleVars.iconHeight}
            // Values taken from .svg
            viewBox={'0 0 25.4 25.4'}
            style={{
              fill: iconStyleVars.iconColour ? iconStyleVars.iconColour : 'var(--gambit-green)',
              // stroke: 'var(--bungie-power)',
              zIndex: 1,
              filter: iconStyleVars.filterValue,
            }}
          />
        )
      case 'trials':
      case 'Trials':
      case 'trialsofosiris':
      case 'trials of osiris':
        return (
          <Trials
            width={iconStyleVars.iconWidth}
            height={iconStyleVars.iconHeight}
            // Values taken from .svg
            viewBox={'0 0 8.4 8.4'}
            style={{
              fill: iconStyleVars.iconColour ? iconStyleVars.iconColour : 'var(--bungie-power)',
              // stroke: 'var(--bungie-power)',
              zIndex: 1,
              filter: iconStyleVars.filterValue,
            }}
          />
        )
      case 'nightfall':
        return (
          <Nightfall
            width={iconStyleVars.iconWidth}
            height={iconStyleVars.iconHeight}
            viewBox={'0 0 25 25'}
            style={{
              fill: iconStyleVars.iconColour ? iconStyleVars.iconColour : 'var(--grey-light-2)',
              zIndex: 1,
              filter: iconStyleVars.filterValue,
            }}
          />
        )
      case 'dungeon':
        return (
          <Dungeon
            width={iconStyleVars.iconWidth}
            height={iconStyleVars.iconHeight}
            viewBox={'0 0 8.4 8.4'}
            style={{
              fill: iconStyleVars.iconColour ? iconStyleVars.iconColour : 'var(--grey-light-2)',
              zIndex: 1,
              filter: iconStyleVars.filterValue,
            }}
          />
        )
      case 'unknown':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              alignItems: 'center',
            }}
          >
            <DualSpinner />
          </div>
        )
    }
  }

  return <ReturnActivityIcon activityMode={activityMode} />
  // return {ReturnActivityIcon(activityMode)}
}
