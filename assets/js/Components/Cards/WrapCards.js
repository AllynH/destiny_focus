/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React from 'react'
import ReactDOM from 'react-dom';
import Card from './Card'
import Character_Plate from '../../Character_Plate'

import CrucibleImage from '../../../img/cards/Crucible.png'
import GambitImage from '../../../img/cards/Gambit.png'
import RaidImage from '../../../img/cards/Raid.png'


export default function WrapCards(props) {
  // console.log("Testing props")
  // console.log(props)
  // console.log(props.match.params)
  const focus_details = {
    Crucible: {
      focus: 'Crucible',
      description: 'Hone your skills and win glory in battle against other Guardians.',
      image: CrucibleImage,
      colours: {
        colour_1: 'var(--crucible-red)',
        colour_2: 'var(--crucible-dark-1)',
        colour_3: 'var(--crucible-dark-2)',
      },
    },
    Gambit: {
      focus: 'Gambit',
      description: 'Defeat the enemies of humanity, collect their Motes, and bank them to summon a Primeval. First team to destroy their Primeval wins.',
      image: GambitImage,
      colours: {
        colour_1: 'forestgreen',
        colour_2: 'forestgreen',
        colour_3: 'forestgreen',
      }
    },
    Raid: {
      focus: 'Raid',
      description: 'Form a fireteam of six and brave the strange and powerful realms of our enemies.',
      image: RaidImage,
      colours: {
        colour_1: 'var(--vanguard-blue)',
        colour_2: 'var(--vanguard-dark-1)',
        colour_3: 'var(--vanguard-dark-2)',
      }
    },
  }
  return (
      <div className='card-wrapper'>
          <div className="card-root-1">
              <Card focus='Crucible' description={focus_details.Crucible.description} image={focus_details.Crucible.image} theme={focus_details.Crucible.colours} />
          </div>
          <div className="card-root-2">
              <Card focus='Gambit' description={focus_details.Gambit.description} image={focus_details.Gambit.image} theme={focus_details.Gambit.colours}/>
          </div>
          <div className="card-root-3">
            <Card focus='Raid' description={focus_details.Raid.description} image={focus_details.Raid.image} theme={focus_details.Raid.colours}/>
          </div>
    </div>
  )

}
