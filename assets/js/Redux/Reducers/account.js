const accountReducer = (state = {}, action) => {
  switch (action.type) {
    case 'select_account': {
      const newState = {
        ...state,
        action: action.type,
        account: {
          membershipType: action?.account?.membershipType,
          membershipId: action?.account?.membershipId,
          characterId: action?.account?.characterId,
        },
      }
      // console.log('accountReducer:')
      // console.log(newState)
      return newState
    }
    default:
      return state
  }
}

export default accountReducer
