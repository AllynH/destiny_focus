import { combineReducers } from 'redux'
import counterReducer from './counter'
import isLogged from './isLogged'
import focusReducer from './focus'
import accountReducer from './account'

const allReducers = combineReducers({
  counter: counterReducer,
  focusReducer,
  accountReducer,
  isLogged,
})

export default allReducers
