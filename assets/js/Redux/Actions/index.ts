import { FocusGoalTypes } from '../../Components/Focus/types'

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

// TODO: Make this focus goals specific.
// This would allow individual goals per focus.
/*
  goal: {
    killDeathRatio: number,
    precisionKillsCount: number,
    avgLifeTime: number
    winLossRatio?: 0,
}
*/

interface FocusReducerInterface {
  killDeathRatio: number
  precisionKillsCount: number
  avgLifeTime: number
  winLossRatio?: 0
}
export const setFocusMode = (mode: FocusGoalTypes, data: FocusReducerInterface) => ({
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

// TODO: Revisit this interface type.
interface ProgressionsInterface {
  progressions: any
}
export const setProgressions = (data: ProgressionsInterface) => ({
  type: 'SET_PROGRESSIONS',
  progressions: data.progressions,
})
