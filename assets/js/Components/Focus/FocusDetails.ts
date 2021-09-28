/* eslint-disable max-len */
import Crucible from '../../../img/icons/Crucible.svg'
import Raid from '../../../img/icons/Raid.svg'
import Gambit from '../../../img/icons/Gambit.svg'
import Trials from '../../../img/icons/faction_osiris2.svg'
import IronBanner from '../../../img/icons/faction_ironbanner2.svg'
import Nightfall from '../../../img/icons/Nightfall.svg'
import Dungeon from '../../../img/icons/Dungeon.svg'

import { FocusDetailTypes } from './types'

// eslint complaining about single (non-default) export but I want to add more data to this file:
// eslint-disable-next-line import/prefer-default-export
export const FOCUS_DETAILS: FocusDetailTypes = {
  Crucible: {
    activityMode: 5,
    activityName: 'All PvP',
    focusName: 'Crucible',
    focus: 'pvp',
    description: 'Hone your skills and win glory in battle against other Guardians.',
    Image: Crucible,
    colours: {
      colour1: 'var(--crucible-red)',
      colour2: 'var(--crucible-dark-1)',
      colour3: 'var(--crucible-dark-2)',
    },
  },
  CrucibleComp: {
    activityMode: 37,
    activityName: 'Competitive PvP',
    focusName: 'CrucibleComp',
    focus: 'pvpcomp',
    description: 'Hone your skills and win glory in battle against other Guardians.',
    Image: Crucible,
    colours: {
      colour1: 'var(--glory)',
      colour2: 'var(--crucible-dark-1)',
      colour3: 'var(--crucible-dark-2)',
    },
  },
  Gambit: {
    activityMode: 63,
    activityName: 'Gambit',
    focus: 'gambit',
    focusName: 'Gambit',
    description:
      'Defeat the enemies of humanity, collect their Motes, and bank them to summon a Primeval. First team to destroy their Primeval wins.',
    Image: Gambit,
    colours: {
      colour1: 'var(--gambit-green)',
      colour2: 'var(--gambit-green-dark-1)',
      colour3: 'var(--gambit-green)',
    },
  },
  Raid: {
    activityName: 'Raid',
    activityMode: 4,
    focus: 'raid',
    focusName: 'Raid',
    description:
      'Form a fireteam of six and brave the strange and powerful realms of our enemies.',
    Image: Raid,
    colours: {
      colour1: 'var(--vanguard-blue)',
      colour2: 'var(--vanguard-dark-1)',
      colour3: 'var(--vanguard-dark-2)',
    },
  },
  Trials: {
    activityMode: 84,
    activityName: 'Trials of Osiris',
    focus: 'trials',
    focusName: 'Trials',
    description:
      'Compete in a fireteam-required event version of Elimination. Earn as many wins on a ticket as you can. Three losses and you\'re out.',
    Image: Trials,
    colours: {
      colour1: 'var(--bungie-power)',
      colour2: 'var(--bungie-power-dark-1)',
      colour3: 'var(--bungie-power)',
    },

  },
  IronBanner: {
    activityMode: 43,
    activityName: 'Iron Banner: Control',
    focus: 'ironbanner',
    focusName: 'IronBanner',
    description:
      'Capture zones to increase points for each opponent defeated. Capture all three to lock the zones and hunt your opponents.',
    Image: IronBanner,
    colours: {
      colour1: 'var(--gambit-green-dark-1)',
      colour2: 'var(--gambit-green)',
      colour3: 'var(--gambit-green-dark-1)',
    },

  },
  Dungeon: {
    activityMode: 82,
    activityName: 'Dungeon',
    focus: 'dungeon',
    focusName: 'Dungeon',
    description:
      'Form a fireteam of up to three, and brave the strange and powerful realms of our enemies.',
    Image: Dungeon,
    colours: {
      colour1: 'var(--vanguard-dark-5)',
      colour2: 'black',
      colour3: 'var(--vanguard-dark-5)',
    },
  },
  Nightfall: {
    activityMode: 46,
    activityName: 'Nightfall',
    focus: 'nightfall',
    focusName: 'Nightfall',
    description:
      'Join a fireteam of three and face the most feared minions of the Darkness.',
    Image: Nightfall,
    colours: {
      colour1: 'var(--vanguard-dark-3)',
      colour2: 'var(--vanguard-dark-4)',
      colour3: 'var(--vanguard-dark-5)',
    },
  },
}
