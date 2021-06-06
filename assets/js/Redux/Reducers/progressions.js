const progressionsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PROGRESSIONS': {
      const newState = {
        ...state,
        action: action.type,
        progressions: action.progressions,

      }
      return newState
    }
    default:
      return state
  }
}

export default progressionsReducer
