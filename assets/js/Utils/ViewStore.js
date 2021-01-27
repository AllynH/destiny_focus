import React from 'react'
import { useSelector } from 'react-redux'

export const ViewStore = (props) => {
  console.log('ViewStore')
  const state = useSelector((state) => state)
  const { focus } = useSelector((state) => state.focusReducer)
  const {
    killDeathRatio, winLossRatio, precisionShotsLanded, avgLifeTime,
  } = state.focusReducer.payload || {}

  // console.log('Inside ViewStore:')
  // console.log(props)
  // console.log(state)
  // console.log(state.focusReducer)
  // console.log(focus)
  return (
    <div>
      <ul>
        <li>Focus: {focus}</li>
        <li>K/D R: {killDeathRatio || ''}</li>
        <li>W/L R: {winLossRatio || ''}</li>
        <li>Precision shots: {precisionShotsLanded}</li>
        <li>Average Life Time: {avgLifeTime}</li>
      </ul>
    </div>
  )
}
