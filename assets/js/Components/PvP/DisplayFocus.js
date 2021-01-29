/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'
import { useSelector } from 'react-redux'

import { projectKdrAverage } from '../../Utils/HelperFunctions/KdrFunctions'

import './style.css'

export default function DisplayKdrFocus(props) {
  const getFocus = useSelector((state) => state.focus)
  const { avgKdr } = props
  const { focusReducer } = props
  const { data } = props
  const focusGoals = props.focusReducer?.payload
  // const spacer = {&nsbp&nsbp}

  console.log('DisplayKdrFocus')
  console.log(props)

  const projectedKdr = (kdrData) => {
    return (
      <div className='focus-kdr-details'>
        <p>See how your KD/R can increase by focusing on staying alive:</p>
        {/* <div className='focus-kdr'>KDR with 0.5 less deaths per game: {projectKdrAverage(kdrData, 0, 0.5)}</div> */}
        <div className='focus-kdr-row'>
          <span className='ability-detail-title'>KDR with 1 less deaths per game: </span>
          <span className='ability-detail-value'>{projectKdrAverage(kdrData, 0, 1)}</span>
        </div>
        {/* <div className='focus-kdr'>KDR with   2 less deaths per game: {projectKdrAverage(kdrData, 0, 2)}</div> */}
        {/* <div className='focus-kdr'>KDR with 0.5 more kills per game: {projectKdrAverage(kdrData, 0.5, 0)}</div> */}
        <div className='focus-kdr-row'>
          <span className='ability-detail-title'>KDR with 1 more kills per game: </span>
          <span className='ability-detail-value'>{projectKdrAverage(kdrData, 1, 0)}</span>
        </div>
        {/* <div className='focus-kdr'>KDR with   2 more kills per game: {projectKdrAverage(kdrData, 2, 0)}</div> */}
        <div className='focus-kdr-row'>
          <span className='ability-detail-title'>KDR with -1 death +1 kill per game: </span>
          <span className='ability-detail-value'>{projectKdrAverage(kdrData, 1, 1)}</span>
        </div>
      </div>
    )
  }

  const CompareResults = (avg, goal) => {
    return (
      <div className='focus-kdr-details'>
        <div className='focus-kdr-grid'>
          <span className='ability-detail-title'>Avg KDR: </span>
          <span className='ability-detail-value'>{avg.toFixed(1)}</span>
        </div>
        <div className='focus-kdr-grid'>
          <span className='ability-detail-title'>Goal KDR: </span>
          <span className='ability-detail-value'>{parseFloat(goal).toFixed(1)}</span>
        </div>
      </div>
    )
  }

  const DisplayFocus = (avg, goal, data) => (
    <div className='focus-kdr-wrapper'>
      <h3>Focus goals are set:</h3>
      <div className='focus-kdr-'>{CompareResults(avg, goal)}</div>
      <div className='focus-kdr-'>{projectedKdr(data)}</div>
    </div>
  )

  return (
    <>
      <div>
        {focusGoals ? (
          DisplayFocus(avgKdr, focusGoals.killDeathRatio, data)
        ) : (
          <p>Customise your focus goals to see more data.</p>
        )}
      </div>
    </>
  )
}
