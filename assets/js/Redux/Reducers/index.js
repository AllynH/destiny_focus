import { combineReducers } from 'redux'
import counterReducer from './counter'
import isLogged from './isLogged'
import focusReducer from './focus'
import accountReducer from './account'
import progressionsReducer from './progressions'

const allReducers = combineReducers({
  counter: counterReducer,
  focusReducer,
  accountReducer,
  progressionsReducer,
  isLogged,
})

export default allReducers
