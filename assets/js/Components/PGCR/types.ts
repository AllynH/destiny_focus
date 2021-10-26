import { DestinyPostGameCarnageReportEntry } from "bungie-api-ts/destiny2";
import { PgcrTypes } from "../../Data/destinyEnums";

export interface PgcrPlayerInterface {
  entry: DestinyPostGameCarnageReportEntry
  activityMode: PgcrTypes
  index: number
  team: string
}
