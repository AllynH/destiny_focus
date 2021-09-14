// export const increment = (nr) => ({
//   type: 'INCREMENT',
//   payload: nr,
// })
// export const decrement = (nr) => ({
//   type: 'DECREMENT',
//   payload: nr,
// })
// export const setPvp = (data) => ({
//   type: 'pvp',
//   payload: data,
// })
// export const setGambit = (data) => ({
//   type: 'gambit',
//   payload: data,
// })
// export const setRaid = (data) => ({
//   type: 'raid',
//   payload: data,
// })
export const setFocusMode = (mode: string, data: any) => ({
  type: mode,
  payload: data,
})

interface AccountReducerInterface {
  membershipType: number
  membershipId: number
  characterId: number
}
export const setAccount = (data: AccountReducerInterface) => ({
  type: 'select_account',
  account: {
    characterId: data.characterId,
    membershipType: data.membershipType,
    membershipId: data.membershipId,
  },
})

interface ProgressionsInterface {
  progressions: any
}
export const setProgressions = (data: ProgressionsInterface) => ({
  type: 'SET_PROGRESSIONS',
  progressions: data.progressions,
})
