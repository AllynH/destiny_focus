import { GACharacterSelectEvent } from "../../Components/Analytics/Events"

const accountReducer = (state = {}, action) => {
  // eslint-disable-next-line radar/no-small-switch
  switch (action.type) {
    case 'select_account': {
      // console.log('Changing character:', action?.account?.membershipType)
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
      GACharacterSelectEvent(
        'Account',
        `Change character + ${action?.account?.membershipType}`,
        action?.account?.membershipId
      )
      return newState
    }
    default:
      return state
  }
}

export default accountReducer
