import React from 'react'

import {
  getPercentage,
  parsePrecisionData,
  getPrecisionAverage,
} from '../../Utils/HelperFunctions/KdrFunctions'
import { ProgressBar } from '../Progress/ProgressBar'
import CustomizeMessage from './CustomizeMessage'
import { getUrlDetails } from '../../Utils/HelperFunctions'

import './style.css'

export default function DisplayPrecisionFocus(props) {
  const weaponKills = props?.chartData?.weapons
  const { focusReducer } = props
  const focusGoals = props.focusReducer?.payload
  const { gameMode } = getUrlDetails()
  // console.log('DisplayPrecisionFocus')
  // console.log(props)
  // console.log(chartData)
  // console.log(focusGoals)

  const precisionData = parsePrecisionData(props)
  const average = getPrecisionAverage(precisionData)
  const percent = Number(getPercentage(average, weaponKills))

  const AccuracyRecommendation = (p) => {
    const {
      progress, theme, progressBarMessage, focusMessage, quoteMessage,
    } = p
    const steps = `${progress.toFixed(1)}% / 100%`
    return (
      <>
        <h2 className='focus-heading-h2'>{progressBarMessage}</h2>
        <p className='focus-kdr-recommendation-description'>{focusMessage}</p>
        {quoteMessage && (
          <blockquote className='focus-kdr-recommendation-subtitle'>
            <cite>{quoteMessage}</cite> - Lord Saladin
          </blockquote>
        )}
        <ProgressBar message={progressBarMessage} progress={progress} steps={steps} theme={theme} />
      </>
    )
  }

  const PrecisionRecommendation = (p) => {
    const { precisionPercentage } = p
    let quoteMessage = ''
    let focusMessage = ''
    let progressBarMessage = ''
    // console.log('PrecisionRecommendation')
    // console.log(precisionPercentage)
    // console.log(typeof precisionPercentage)

    switch (true) {
      case precisionPercentage < 33:
      default:
        focusMessage = 'Focus on increasing your accuracy, less than 33% of your kills were precision kills.'
        progressBarMessage = 'Focus: Accuracy is poor'
        return (
          <AccuracyRecommendation
            progress={precisionPercentage}
            theme='warn'
            progressBarMessage={progressBarMessage}
            focusMessage={focusMessage}
          />
        )
      case precisionPercentage > 33 && precisionPercentage < 66:
        focusMessage = 'Focus on increasing your accuracy, less than 66% of your kills were precision kills.'
        progressBarMessage = 'Focus: Accuracy is good'
        return (
          <AccuracyRecommendation
            progress={precisionPercentage}
            theme='good'
            progressBarMessage={progressBarMessage}
            focusMessage={focusMessage}
          />
        )
      case precisionPercentage > 66:
        quoteMessage = 'Your weapon defines you.'
        focusMessage = 'Greater than 66% of your kills were precision kills.'
        progressBarMessage = 'Focus: Accuracy is excellent'
        return (
          <AccuracyRecommendation
            progress={precisionPercentage}
            theme='success'
            progressBarMessage={progressBarMessage}
            focusMessage={focusMessage}
            quoteMessage={quoteMessage}
          />
        )
    }
  }

  const CompareResults = (avg, per) => (
    <div className='focus-goals-wrapper'>
    <h2 className='focus-heading-h2'>Focus goals are set:</h2>
    <div className='focus-kdr-details focus-kdr-grid-wrapper'>
      <div className='focus-kdr-grid'>
        <span className='ability-detail-title'>Avg precision kills: </span>
        <span className='ability-detail-value'>{avg.toFixed(1)}</span>
      </div>
      <div className='focus-kdr-grid'>
        <span className='ability-detail-title'>Goal precision kills: </span>
        <span className='ability-detail-value'>{parseFloat(per).toFixed(1)}</span>
      </div>
    </div>
    </div>
  )

  function CheckCorrectFocus() {
    if (!focusGoals) {
      return <CustomizeMessage />
    }
    if (gameMode === focusReducer.focus) {
      return CompareResults(average, focusGoals.killDeathRatio)
    }
    return (
      <>
        {CompareResults(average, focusGoals.precisionKillsCount)}
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
        <PrecisionRecommendation precisionPercentage={percent} />
        <CheckCorrectFocus />
      </div>
    </>
  )
}
