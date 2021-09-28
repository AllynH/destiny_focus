import { GAFocusSetEvent } from "../../Components/Analytics/Events"

export interface FocusReducerInterface {
  focus: string,
  killDeathRatio: number,
  winLossRatio: number,
  precisionKillsCount: number,
  avgLifeTime: number,
  focusReducer: any
}

interface FocusActionInterface {
  type: string,
  payload: {
    kdr: number,
    wlr: number,
    pkc: number,
    alt: number,
  },
}

const focusReducer = (state: any = {}, action: FocusActionInterface) => {
  // console.log('focusReducer');
  // console.log(action);
  switch (action.type) {
    case 'gambit':
    case 'dungeon':
    case 'nightfall':
    case 'pvpcomp':
    case 'trials':
    case 'ironbanner':
    case 'raid':
    case 'pvp': {
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
