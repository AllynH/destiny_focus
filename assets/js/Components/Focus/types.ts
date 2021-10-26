/*
  Reusable Types for FOCUS_DETAILS object.

*/
export type FocusDetailKey =
  'Crucible' |
  'CrucibleComp' |
  'Gambit' |
  'Raid' |
  'Trials' |
  'IronBanner' |
  'Dungeon' |
  'Nightfall'

  export type FocusGoalTypes =
  'crucible' |
  'cruciblecomp' |
  'gambit' |
  'raid' |
  'trials' |
  'ironbanner' |
  'dungeon' |
  'nightfall'

export interface FocusDetailParams {
  readonly activityMode: number,
  readonly activityName: string,
  readonly focusName: string,
  readonly focus: string,
  readonly description: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  readonly Image: Object,
  readonly colours: {
    readonly colour1: string,
    readonly colour2: string,
    readonly colour3: string,
  }
}

export type FocusDetailTypes = {
  [ key in FocusDetailKey ] : FocusDetailParams
}
