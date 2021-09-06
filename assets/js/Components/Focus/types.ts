/*
  Reusable Types for FOCUS_DETAILS object.

*/

export const enum FocusDetailKey {
  Crucible = 'Crucible',
  CrucibleComp = 'CrucibleComp',
  Gambit = 'Gambit',
  Raid = 'Raid',
  Trials = 'Trials',
  Dungeon = 'Dungeon',
  Nightfall = 'Nightfall',
}

// export type FocusDetailKey =
//   "Crucible" |
//   "CrucibleComp" |
//   "Gambit" |
//   "Raid" |
//   "Trials" |
//   "Dungeon" |
//   "Nightfall"

export interface FocusDetailParams {
  readonly activityMode: number,
  readonly activityName: string,
  readonly focusName: string,
  readonly focus: string,
  readonly description: string,
  readonly Image: Object,
  readonly colours: {
    readonly colour_1: string,
    readonly colour_2: string,
    readonly colour_3: string,
  }
}

export type FocusDetailTypes = {
  [ key in FocusDetailKey ] : FocusDetailParams
}
