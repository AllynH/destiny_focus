import React from 'react'
import { useSelector } from 'react-redux'

const ViewStore = () => {
  // console.log('ViewStore')
  const state = useSelector((s) => s)
  const { focus } = useSelector((s) => s.focusReducer)
  // const { account } = useSelector((s) => s.accountReducer)
  const {
    killDeathRatio, winLossRatio, precisionKillsCount, avgLifeTime,
  } = state.focusReducer.payload || {}
  const {
    membershipType, membershipId, characterId,
  } = state.accountReducer.account || {}

  // console.log('Inside ViewStore:')
  // console.log(state)
  // console.log(state.focusReducer)
  // console.log(focus)
  // console.log(account)
  return (
    <div>
      <ul>
        <li>Focus: {focus}</li>
        <li>K/D R: {killDeathRatio || ''}</li>
        <li>W/L R: {winLossRatio || ''}</li>
        <li>Precision shots: {precisionKillsCount}</li>
        <li>Average Life Time: {avgLifeTime}</li>
        <li>membershipType: {membershipType}</li>
        <li>membershipId: {membershipId}</li>
        <li>characterId: {characterId}</li>
      </ul>
    </div>
  )
}
export default ViewStore
