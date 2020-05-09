/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React from 'react'
import ReactDOM from 'react-dom';
import Character_Plate from './Character_Plate'
import Card from './Components/Card'
import MenuAppBar from './Components/Nav/Nav'

import CrucibleImage from '../img/cards/Crucible.png'
import GambitImage from '../img/cards/Gambit.png'
import RaidImage from '../img/cards/Raid.png'

console.log('Rendering App')
const url = window.location.href.toLowerCase();

const header_details = {
  background: 'https://www.bungie.net/common/destiny2_content/icons/f89f81b46cdbb7d07f7bddad12eebf35.jpg',
}
ReactDOM.render(<MenuAppBar background={header_details.background} />, document.getElementById('header-root'));

console.log(url)
if (url.endsWith('/auth/')) {
  console.log('Bingpot!')
  ReactDOM.render(<Character_Plate/>, document.getElementById('character_plate'));
}
if (url.includes('choose_focus/')) {
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
  console.log('Choose focus!')
  ReactDOM.render(<Character_Plate/>, document.getElementById('character_plate'));

  ReactDOM.render(<Card focus='Crucible' description={focus_details.Crucible.description} image={focus_details.Crucible.image} theme={focus_details.Crucible.colour} />, document.getElementById('card-root-1'));
  ReactDOM.render(<Card focus='Gambit' description={focus_details.Gambit.description} image={focus_details.Gambit.image} theme={focus_details.Gambit.colour}/>, document.getElementById('card-root-2'));
  ReactDOM.render(<Card focus='Raid' description={focus_details.Raid.description} image={focus_details.Raid.image} theme={focus_details.Raid.colour}/>, document.getElementById('card-root-3'));
}
