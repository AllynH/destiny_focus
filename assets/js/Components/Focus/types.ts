/*
  Put Types here:

let endpoints: Endpoint = {
    auth: {
        login: "http://localhost:8079/auth/login"
    }
};

type EndpointAuth = {
    login: string;
}

type Endpoint = {
    auth: EndpointAuth;
}

export const enum DestinyGender {
  Male = 0,
  Female = 1,
  Unknown = 2
}

export interface DestinyClassDefinition {
  readonly classType: DestinyClass;
  readonly displayProperties: DestinyDisplayPropertiesDefinition;
  readonly genderedClassNames: { [key in DestinyGender]: string };
  readonly genderedClassNamesByGenderHash: { [key: number]: string };
  readonly mentorVendorHash?: number;
  readonly hash: number;
  readonly index: number;
  readonly redacted: boolean;
}

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

interface FocusDetailParams {
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
