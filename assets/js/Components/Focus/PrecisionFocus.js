/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'
import { useSelector } from 'react-redux'

import {
  getPercentage,
  parsePrecisionData,
  getPrecisionAverage,
} from '../../Utils/HelperFunctions/KdrFunctions'
import { ProgressBar } from '../Progress/ProgressBar'
import CustomizeMessage from './CustomizeMessage'

import './style.css'

export default function DisplayPrecisionFocus(props) {
  const focusGoals = props.focusReducer?.payload
  const { chartData } = props
  const weaponKills = props?.chartData?.weapons
  const precisionGoal = focusGoals?.precisionKillsCount

  // console.log('DisplayPrecisionFocus')
  // console.log(props)
  // console.log(chartData)
  // console.log(focusGoals)

  const precisionData = parsePrecisionData(props)
  const average = getPrecisionAverage(precisionData)
  const percent = Number(getPercentage(average, weaponKills))

  const AccuracyRecommendation = (p) => {
    const { progress, theme, progressBarMessage, focusMessage, quoteMessage } = p
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
        focusMessage =
          'Focus on increasing your accuracy, less than 33% of your kills were precision kills.'
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
        focusMessage =
          'Focus on increasing your accuracy, less than 66% of your kills were precision kills.'
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

  return (
    <>
      <div className='focus-kdr-wrapper'>
        <PrecisionRecommendation precisionPercentage={percent} />
        {focusGoals ? (
          CompareResults(average, precisionGoal)
        ) : (
          <CustomizeMessage />
        )}
      </div>
    </>
  )
}
