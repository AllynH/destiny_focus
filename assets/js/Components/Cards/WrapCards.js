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
  const focus_details = {
    Crucible: {
      focus: 'Crucible',
      description: 'Hone your skills and win glory in battle against other Guardians.',
      image: CrucibleImage,
      colour: 'darkred',
    },
    Gambit: {
      focus: 'Gambit',
      description: 'Defeat the enemies of humanity, collect their Motes, and bank them to summon a Primeval. First team to destroy their Primeval wins.',
      image: GambitImage,
      colour: 'forestgreen',
    },
    Raid: {
      focus: 'Raid',
      description: 'Form a fireteam of six and brave the strange and powerful realms of our enemies.',
      image: RaidImage,
      colour: 'dodgerblue',
    },
  }
  return (
      <div>
          <div className="card-root-1">
              <Card focus='Crucible' description={focus_details.Crucible.description} image={focus_details.Crucible.image} theme={focus_details.Crucible.colour} />
          </div>
          <div className="card-root-2">
              <Card focus='Gambit' description={focus_details.Gambit.description} image={focus_details.Gambit.image} theme={focus_details.Gambit.colour}/>
          </div>
          <div className="card-root-3">
            <Card focus='Raid' description={focus_details.Raid.description} image={focus_details.Raid.image} theme={focus_details.Raid.colour}/>
          </div>
    </div>
  )

}
