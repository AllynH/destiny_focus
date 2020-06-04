/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React from 'react'
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import MenuAppBar from './Components/Nav/Nav'
// import Character_Plate from './Character_Plate'
// import WrapCards from './Components/Cards/WrapCards'
// import PvPChart from './Components/PvP/PVPCharts';
import App from './App'


import allReducers from './Reducers'

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

console.log('Rendering App')
const url = window.location.href.toLowerCase();

const header_details = {
  background: 'https://www.bungie.net/common/destiny2_content/icons/f89f81b46cdbb7d07f7bddad12eebf35.jpg',
}
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MenuAppBar background={header_details.background} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('header-root')
)
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('main-root')
)
console.log(store.getState())
