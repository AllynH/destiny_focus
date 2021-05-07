const focusReducer = (state = '', action) => {
  switch (action.type) {
    case 'gambit':
    case 'raid':
    case 'pvp':
      console.log('Setting focus state')
      state = {
        ...state,
        focus: action.type,
        focusGoals: action.payload,
        payload: action.payload,
      }
      // console.log(state)
      // console.log('Returned state')
      console.log(state)
      return state
    default:
      return state
  }
}

export default focusReducer
