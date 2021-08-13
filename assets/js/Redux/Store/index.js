/* eslint-disable no-console */
/*  Code examples here:
    https://dev.to/link2twenty/react-redux-and-localstorage-2lih
    no-console disabled - as we want to see output if state fails.
*/
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import allReducers from '../Reducers'

// Convert Object to string and save to localStorage:
function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state)
    localStorage.setItem('Destiny-Focus-State', serialisedState)
  } catch (e) {
    console.warn(e)
  }
}

// Load string from localStorage and convert to an Object
// Invalid output must be undefined.
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem('Destiny-Focus-State')
    if (serialisedState === null) return undefined
    return JSON.parse(serialisedState)
  } catch (e) {
    console.warn(e)
    return undefined
  }
}

// Create our Store from our allReducers and use loadFromLocalStorage
// to overwrite any values that we already have saved.
// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  allReducers,
  loadFromLocalStorage(),
  composeEnhancer(applyMiddleware(thunk)),
)

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
