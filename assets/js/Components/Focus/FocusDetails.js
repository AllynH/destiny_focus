import CrucibleImage from '../../../img/cards/Crucible.png'
import GambitImage from '../../../img/cards/Gambit.png'
import RaidImage from '../../../img/cards/Raid.png'

export const FOCUS_DETAILS = {
  Crucible: {
    focusName: 'Crucible',
    focus: 'pvp',
    description: 'Hone your skills and win glory in battle against other Guardians.',
    image: CrucibleImage,
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
    image: GambitImage,
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
    image: RaidImage,
    colours: {
      colour_1: 'var(--vanguard-blue)',
      colour_2: 'var(--vanguard-dark-1)',
      colour_3: 'var(--vanguard-dark-2)',
    },
  },
}
