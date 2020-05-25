import { combineReducers } from 'redux'
import counterReducer from './counter'
import isLogged from './isLogged'

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged,
});

export default allReducers
