import Crucible from '../../../img/icons/Crucible.svg'
import Raid from '../../../img/icons/Raid.svg'
import Gambit from '../../../img/icons/Gambit.svg'
import Trials from '../../../img/icons/faction_osiris2.svg'
import Nightfall from '../../../img/icons/Nightfall.svg'

// eslint complaining about single (non-default) export but I want to add more data to this file:
// eslint-disable-next-line import/prefer-default-export
export const FOCUS_DETAILS = {
  Crucible: {
    activityMode: 5,
    focusName: 'Crucible',
    focus: 'pvp',
    description: 'Hone your skills and win glory in battle against other Guardians.',
    Image: Crucible,
    colours: {
      colour_1: 'var(--crucible-red)',
      colour_2: 'var(--crucible-dark-1)',
      colour_3: 'var(--crucible-dark-2)',
    },
  },
  Gambit: {
    activityMode: 63,
    focus: 'gambit',
    focusName: 'Gambit',
    description:
      'Defeat the enemies of humanity, collect their Motes, and bank them to summon a Primeval. First team to destroy their Primeval wins.',
    Image: Gambit,
    colours: {
      colour_1: 'var(--gambit-green)',
      colour_2: 'var(--gambit-green)',
      colour_3: 'var(--gambit-green)',
    },
  },
  Raid: {
    activityMode: 4,
    focus: 'raid',
    focusName: 'Raid',
    description:
      'Form a fireteam of six and brave the strange and powerful realms of our enemies.',
    Image: Raid,
    colours: {
      colour_1: 'var(--vanguard-blue)',
      colour_2: 'var(--vanguard-dark-1)',
      colour_3: 'var(--vanguard-dark-2)',
    },
  },
  Trials: {
    activityMode: 84,
    focus: 'trials',
    focusName: 'Trials',
    description:
      'Compete in a fireteam-required event version of Elimination. Earn as many wins on a ticket as you can. Three losses and you\'re out.',
    Image: Trials,
    colours: {
      colour_1: 'var(--bungie-power)',
      colour_2: 'var(--bungie-power)',
      colour_3: 'var(--bungie-power)',
    },

  },
  Dungeon: {
    activityMode: 82,
    focus: 'dungeon',
    focusName: 'Dungeon',
    description:
      'Form a fireteam of up to three, and brave the strange and powerful realms of our enemies.',
    Image: Raid,
    colours: {
      colour_1: 'var(--vanguard-dark-5)',
      colour_2: 'black',
      colour_3: 'var(--vanguard-dark-5)',
    },
  },
  Nightfall: {
    activityMode: 46,
    focus: 'nightfall',
    focusName: 'Nightfall',
    description:
      'Join a fireteam of three and face the most feared minions of the Darkness.',
    Image: Nightfall,
    colours: {
      colour_1: 'var(--vanguard-dark-3)',
      colour_2: 'var(--vanguard-dark-4)',
      colour_3: 'var(--vanguard-dark-5)',
    },
  },
}
