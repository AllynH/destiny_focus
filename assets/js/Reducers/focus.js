const focusReducer = (state = 'pvp', action) => {
  switch (action.type) {
    case 'gambit':
    case 'raid':
    case 'pvp':
      console.log('Setting focus state')
      console.log(action)
      state = {
        // ...state,
        focus: action.type,
        payload: action.payload,
      }
      console.log(state)
      console.log('Returned state')
      return state
    default:
      return state
  }
}

export default focusReducer
