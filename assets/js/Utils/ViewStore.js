import React from 'react'
import { useSelector } from 'react-redux'

export const ViewStore = (props) => {
  console.log('ViewStore')
  const state = useSelector((state) => state)
  const { focus } = useSelector((state) => state.focusReducer)
  const { kdr, wlr, psl } = state.focusReducer.payload || {}

  // console.log('Inside ViewStore:')
  // console.log(props)
  // console.log(state)
  // console.log(state.focusReducer)
  // console.log(focus)
  return (
    <div>
      <ul>
        <li>Focus: {focus}</li>
        <li>K/D R: {kdr || ''}</li>
        <li>W/L R: {wlr || ''}</li>
        <li>Presion shots: {psl}</li>
      </ul>
    </div>
  )
}
