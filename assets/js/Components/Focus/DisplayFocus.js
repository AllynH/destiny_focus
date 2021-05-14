import React from 'react'

import { projectKdrAverage } from '../../Utils/HelperFunctions/KdrFunctions'
import CustomizeMessage from './CustomizeMessage'
import { getUrlDetails } from '../../Utils/HelperFunctions'

import './style.css'

export default function DisplayKdrFocus(props) {
  const { avgKdr } = props
  const { focusReducer } = props
  const { data } = props
  const focusGoals = props.focusReducer?.payload
  const { gameMode } = getUrlDetails()
  // const spacer = {&nsbp&nsbp}

  // console.log('DisplayKdrFocus')
  // console.log(props)

  const kdrRecommendation = (lessDeathsKdr, moreKillsKdr) => {
    if (moreKillsKdr > lessDeathsKdr) {
      return (
        <>
          <h2 className='focus-heading-h2'>Focus: KILLS</h2>
          <p className='focus-kdr-recommendation-description'>
            Focus on increasing the number of kills per game to improve your KD/R the fastest.
          </p>
          <blockquote className='focus-kdr-recommendation-subtitle'>
            Don{"'"}t let up until they{"'"}re dust, Guardian.
          </blockquote>
        </>
      )
    }
    return (
      <>
        <h2 className='focus-heading-h2'>Focus: STAY ALIVE</h2>
        <p className='focus-kdr-recommendation-description'>
          Focus on increasing your average time alive per game to improve your KD/R the fastest.
        </p>
        <blockquote className='focus-kdr-recommendation-subtitle'>
          This is the moment Iron Lords live for.
        </blockquote>
      </>
    )
  }

  const projectedKdr = (kdrData) => {
    const lessDeathsKdr = projectKdrAverage(kdrData, 0, 1)
    const moreKillsKdr = projectKdrAverage(kdrData, 1, 0)
    const moreKillsLessDeathsKdr = projectKdrAverage(kdrData, 1, 1)

    const focusRecommendation = kdrRecommendation(lessDeathsKdr, moreKillsKdr)
    return (
      <>
        <div className='focus-kdr-recommendation'>{focusRecommendation}</div>
        <div className='focus-kdr-details'>
          <hr />
          <p>See how your KD/R can increase by implementing a focus path:</p>
          <div className='focus-kdr-row'>
            <span className='ability-detail-title'>KDR with 1 less death per game: </span>
            <span className='ability-detail-value'>{lessDeathsKdr}</span>
          </div>
          <div className='focus-kdr-row'>
            <span className='ability-detail-title'>KDR with 1 more kill per game: </span>
            <span className='ability-detail-value'>{moreKillsKdr}</span>
          </div>
          <div className='focus-kdr-row'>
            <span className='ability-detail-title'>KDR with -1 death +1 kill per game: </span>
            <span className='ability-detail-value'>{moreKillsLessDeathsKdr}</span>
          </div>
        </div>
      </>
    )
  }

  const CompareResults = (avg, goal) => (
    <div className='focus-goals-wrapper'>
      <h3 className='focus-heading-h2'>Focus goals are set:</h3>
      <div className='focus-kdr-details focus-kdr-grid-wrapper'>
        <div className='focus-kdr-grid'>
          <span className='ability-detail-title'>Avg KDR: </span>
          <span className='ability-detail-value'>{avg.toFixed(1)}</span>
        </div>
        <div className='focus-kdr-grid'>
          <span className='ability-detail-title'>Goal KDR: </span>
          <span className='ability-detail-value'>{parseFloat(goal).toFixed(1)}</span>
        </div>
      </div>
    </div>
  )

  function CheckCorrectFocus() {
    if (!focusGoals) {
      return <CustomizeMessage />
    }
    if (gameMode === focusReducer.focus) {
      return CompareResults(avgKdr, focusGoals.killDeathRatio)
    }
    return (
      <>
        {CompareResults(avgKdr, focusGoals.killDeathRatio)}
        <div className='focus-mismatch-warn'>
          Warning - Focus goals set for: {focusReducer.focus}
        </div>
        <CustomizeMessage />
      </>
    )
  }

  return (
    <>
      <div className='focus-kdr-wrapper'>
        <div className='focus-kdr-'>{projectedKdr(data)}</div>
        <CheckCorrectFocus />
      </div>
    </>
  )
}
