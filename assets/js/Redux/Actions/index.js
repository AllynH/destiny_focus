export const increment = (nr) => ({
  type: 'INCREMENT',
  payload: nr,
})
export const decrement = (nr) => ({
  type: 'DECREMENT',
  payload: nr,
})
export const setPvp = (data) => ({
  type: 'pvp',
  payload: data,
})
export const setGambit = (data) => ({
  type: 'gambit',
  payload: data,
})
export const setRaid = (data) => ({
  type: 'raid',
  payload: data,
})
export const setAccount = (data) => ({
  type: 'select_account',
  account: {
    characterId: data.characterId,
    membershipType: data.membershipType,
    membershipId: data.membershipId,
  },
})
