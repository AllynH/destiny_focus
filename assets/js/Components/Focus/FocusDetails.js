import Crucible from '../../../img/icons/Crucible.svg'
import Raid from '../../../img/icons/Raid.svg'
import Gambit from '../../../img/icons/Gambit.svg'

// eslint complaining about single (non-default) export but I want to add more data to this file:
// eslint-disable-next-line import/prefer-default-export
export const FOCUS_DETAILS = {
  Crucible: {
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
}
