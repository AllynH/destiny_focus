/* eslint-disable linebreak-style */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */

import React from 'react'
import ReactDOM from 'react-dom';
import Character_Plate from './Character_Plate'
import Card from './Components/Card'

console.log('Rendering App')
const url = window.location.href.toLowerCase();

console.log(url)
if (url.endsWith('/auth/')) {
  console.log('Bingpot!')
  ReactDOM.render(<Character_Plate/>, document.getElementById('character_plate'));
}
if (url.endsWith('choose_track/')) {

  const description = {
    Crucible: 'Hone your skills and win glory in battle against other Guardians.',
    Gambit: 'Defeat the enemies of humanity, collect their Motes, and bank them to summon a Primeval. First team to destroy their Primeval wins.',
    Raid: 'Form a fireteam of six and brave the strange and powerful realms of our enemies.',
  }
  console.log('Choose track!')
  ReactDOM.render(<Character_Plate/>, document.getElementById('character_plate'));

  ReactDOM.render(<Card track='Crucible' description={description.Crucible} />, document.getElementById('card-root-1'));
  ReactDOM.render(<Card track='Gambit' description={description.Gambit}/>, document.getElementById('card-root-2'));
  ReactDOM.render(<Card track='Raid' description={description.Raid}/>, document.getElementById('card-root-3'));
}
