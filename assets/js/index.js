/* eslint-disable linebreak-style */
/* eslint-disable semi */

import React from 'react'
import ReactDOM from 'react-dom';
import Character_Plate from './Character_Plate'

console.log('Rendering App')
let url = window.location.href.toLowerCase();

console.log(url)
if (url.endsWith('/auth/')) {
  console.log('Bingpot!')
  ReactDOM.render(<Character_Plate/>, document.getElementById('character_plate'));
}
