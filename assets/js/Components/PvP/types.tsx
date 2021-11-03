import { DestinyPostGameCarnageReportEntry, DestinyActivityHistoryResults, ServerResponse } from "bungie-api-ts/destiny2";

export interface DvrPgcrListResponseInterface {
  count: number
  instanceId: string
  PGCR: number
  period: string
  standing: number
  activityDurationSeconds: string
  averageLifeTime: number
  precisionKills: string
  data: DestinyPostGameCarnageReportEntry
}
export interface pgcrSummaryInterface {
  ErrorStatus: string
  StatusCode: number
  Response: DvrPgcrListResponseInterface[]
}
export interface ChartDropdownInterface {
  activityList: ServerResponse<DestinyActivityHistoryResults>
  pgcrSummary: pgcrSummaryInterface
}


export interface PgcrSummaryPropsInterface {
  activityList: ServerResponse<DestinyActivityHistoryResults>,


}
