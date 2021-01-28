/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'
import { useSelector } from 'react-redux'

import './style.css'

export default function DisplayKdrFocus(props) {
  const getFocus = useSelector((state) => state.focus)
  const { avgKdr } = props
  const { focusReducer } = props
  const focusGoals = props.focusReducer?.payload

  const CompareResults = (avg, goal) => {
    return (
      <div className='focus-kdr-details'>
        <div className='focus-kdr-row'>
          <span className='ability-detail-title'>Avg KDR: </span>
          <span className='ability-detail-value'>{avg.toFixed(1)}</span>
        </div>
        <div className='focus-kdr-row'>
          <span className='ability-detail-title'>Goal KDR: </span>
          <span className='ability-detail-value'>{parseFloat(goal).toFixed(1)}</span>
        </div>
      </div>
    )
  }

  const DisplayFocus = (avg, goal) => (
      <div className='focus-kdr-wrapper'>
        <h3>Focus goals are set:</h3>
        <div className='focus-kdr-'>{CompareResults(avg, goal)}</div>
      </div>
  )

  return (
    <>
      <div>
        {focusGoals ? (
          DisplayFocus(avgKdr, focusGoals.killDeathRatio)
        ) : (
          <p>Not focused, playin like a scrub :'(</p>
        )}
      </div>
    </>
  )
}
