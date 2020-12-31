/* eslint-disable camelcase */
/* eslint-disable no-console */

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

// import MenuAppBar from './Components/Nav/Nav'
import App from './App'

import allReducers from './Reducers'

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

console.log('Rendering App')

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('main-root'),
)
console.log(store.getState())
