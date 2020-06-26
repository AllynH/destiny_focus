import { combineReducers } from 'redux';
import counterReducer from './counter';
import isLogged from './isLogged';
import focusReducer from './focus'

const allReducers = combineReducers({
  counter: counterReducer,
  focusReducer,
  isLogged,
});

export default allReducers;
