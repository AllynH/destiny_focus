import { GAFocusSetEvent } from "../../Components/Analytics/Events"

const focusReducer = (state = '', action) => {
  switch (action.type) {
    case 'gambit':
    case 'raid':
    case 'pvp': {
      // console.log('Setting focus state')
      const newState = {
        ...state,
        focus: action.type,
        focusGoals: action.payload,
        payload: action.payload,
      }
      // console.log(state)
      // console.log('Returned state')
      GAFocusSetEvent('Focus State', action.type, action.payload)
      return newState
    }
    default:
      return state
  }
}

export default focusReducer
