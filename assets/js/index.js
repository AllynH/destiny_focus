/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React from 'react'
import ReactDOM from 'react-dom';
import Character_Plate from './Character_Plate'
import WrapCards from './Components/Cards/WrapCards'
import MenuAppBar from './Components/Nav/Nav'
import PvPChart from './Components/PvP/PVPCharts';
// import allReducers from './Reducers'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'

// const store = createStore(allReducers)

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
  ReactDOM.render(<WrapCards/>, document.getElementById('main-root'));
}
if (url.includes('/pvp/')) {
  console.log('PvP focus!')
  ReactDOM.render(<PvPChart/>, document.getElementById('main-root'));
}
