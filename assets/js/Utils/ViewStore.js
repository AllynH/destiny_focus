import React from 'react'
import { useSelector } from 'react-redux'

export const ViewStore = (props) => {
  console.log('ViewStore')
  const state = useSelector((state) => state)
  const { focus } = useSelector((state) => state.focusReducer)
  const { kdr, wlr, psl } = state.focusReducer.payload || {}
  // const { wlr } = state.focusReducer.payload || {}
  // const { kdr } = state.focusReducer.payload || {}

  // if (state.focusReducer.payload) {
  //   console.log('Setting kdr & wlr from state:')
  //   const { kdr, wlr } = state.focusReducer.payload
  // }
  // else {
  //   console.log('Defaulting kdr & wlr:')
  //   const kdr = ''
  //   const wlr = ''
  // }
  console.log('Inside ViewStore:')
  console.log(props)
  console.log(state)
  console.log(focus)
  return (
    <div>
      <p>
        Focus: {focus} K/D R: {kdr || ''} W/L R: {wlr || ''} Shots landed: {psl}
      </p>
      {/* <p>Focus from state.focusReducer: {focus}</p> */}
    </div>
  )
}
