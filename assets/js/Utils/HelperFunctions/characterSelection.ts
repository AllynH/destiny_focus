import store from '../../Redux/Store'

/**
 * Checks to see if the current account is the same as the account stored in the Redux store.
 * This is used when viewing other accounts -> to prevent storing their details.
 * Details are used to remember user account preferences for login
 * @param currentMembershipType
 * @param currentMembershipId
 * @returns Boolean
 */
export default function checkLoggedInCharacter(
  currentMembershipType: string,
  currentMembershipId: string
): boolean {
  const { accountReducer } = store.getState()
  const { membershipType, membershipId } = accountReducer.account

  if (
    String(membershipId) === currentMembershipId &&
    String(membershipType) === currentMembershipType
  ) {
    return true
  }
  return false
}



export function getLoggedInUserUrl(focusRoute = 'choose_focus'): string {
  const { accountReducer } = store.getState()
  const { membershipType, membershipId, characterId } = accountReducer.account

  return `/auth/${focusRoute}/${membershipType}/${membershipId}/${characterId}/`
}
