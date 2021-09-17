export type AllowedWinLoss = 0 | 1
// export type AllowedWinLoss = number

export interface WinLossProps {
  winLossArray: AllowedWinLoss[],
  winLossPercent: string
}
