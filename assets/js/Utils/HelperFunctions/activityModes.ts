import { FOCUS_DETAILS } from "../../Components/Focus/FocusDetails"
import { FocusGoalTypes, FocusDetailKey, FocusDetailParams } from '../../Components/Focus/types'

// eslint-disable-next-line import/prefer-default-export
export function returnFocusFromActivityId(activityId: string | number): FocusGoalTypes {
  const focusList = Object.keys(FOCUS_DETAILS)
    .map((f: FocusDetailKey) => (f))
    .filter((f: FocusDetailKey) => (FOCUS_DETAILS[f].activityMode === Number(activityId)))[0]

  return FOCUS_DETAILS[focusList].focus
}

export function returnFocusDetailsFromActivityId(activityId: string | number): FocusDetailParams {
  const focusList = Object.keys(FOCUS_DETAILS)
    .map((f: FocusDetailKey) => (f))
    .filter((f: FocusDetailKey) => (FOCUS_DETAILS[f].activityMode === Number(activityId)))[0]

  return FOCUS_DETAILS[focusList]
}
