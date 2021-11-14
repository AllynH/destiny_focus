import React from 'react'
import { AbilityDataInterface, getPercentage } from '../../Utils/HelperFunctions/KdrFunctions'
import { ProgressBar } from '../Progress/ProgressBar'

interface SuperKillsRecommendationProps {
  progress: number
  theme: string
  progressBarMessage: string
  focusMessage: string
  quoteMessage?: string
}
const SuperKillsRecommendation = (p: SuperKillsRecommendationProps) => {
  const { progress, theme, progressBarMessage, focusMessage, quoteMessage } = p
  const steps = `${progress.toFixed(1)}% / 100%`
  return (
    <>
      <h2 className='focus-heading-h2'>{progressBarMessage}</h2>
      <p className='focus-kdr-recommendation-description'>{focusMessage}</p>
      {quoteMessage && (
        <blockquote className='focus-kdr-recommendation-subtitle'>
          <cite>{quoteMessage}</cite> - Lord Shaxx
        </blockquote>
      )}
      <ProgressBar message={progressBarMessage} progress={progress} steps={steps} theme={theme} />
    </>
  )
}

const SuperKillRatio = (props: { superKillsRatio: number }) => {
  const { superKillsRatio } = props
  let quoteMessage = ''
  let focusMessage = ''
  let progressBarMessage = ''

  switch (true) {
    case superKillsRatio > 50:
    default:
      focusMessage =
        'Focus on improving your weapon skills, greater than 50% of your kills are coming from your super ability.'
      progressBarMessage = 'Stop using super ability as a crutch!'
      return (
        <SuperKillsRecommendation
          progress={100 - superKillsRatio}
          theme='warn'
          progressBarMessage={progressBarMessage}
          focusMessage={focusMessage}
        />
      )
    case superKillsRatio > 20 && superKillsRatio < 50:
      quoteMessage = 'Destroy them with your Light!'
      focusMessage = 'Focus on damage, you are relying too much on your super ability.'
      progressBarMessage = 'Weapon to super kills ratio is poor.'
      return (
        <SuperKillsRecommendation
          progress={100 - superKillsRatio}
          theme='good'
          progressBarMessage={progressBarMessage}
          focusMessage={focusMessage}
        />
      )
    case superKillsRatio < 20:
      quoteMessage = 'Your weapon defines you.'
      focusMessage = 'Less than 20% of your kills were with your super ability.'
      progressBarMessage = 'Weapon to super kills ratio is very good.'
      return (
        <SuperKillsRecommendation
          progress={100 - superKillsRatio}
          theme='success'
          progressBarMessage={progressBarMessage}
          focusMessage={focusMessage}
          quoteMessage={quoteMessage}
        />
      )
  }
}

const GrenadeKillRatio = (props: { grenadeKillsRatio: number }) => {
  const { grenadeKillsRatio } = props
  let quoteMessage = ''
  let focusMessage = ''
  let progressBarMessage = ''

  switch (true) {
    case grenadeKillsRatio === 0:
    default:
      quoteMessage="Did you see that grenade toss? He's a danger only to himself!"
      focusMessage = "You haven't gotten any grenade kills in the last 10 games."
      progressBarMessage = 'No grenade kills!'
      return (
        <SuperKillsRecommendation
          progress={grenadeKillsRatio}
          theme='warn'
          progressBarMessage={progressBarMessage}
          focusMessage={focusMessage}
          quoteMessage={quoteMessage}
        />
      )
    case grenadeKillsRatio > 10:
      // quoteMessage = 'Your weapon defines you.'
      focusMessage = `${grenadeKillsRatio} of your kills are with grenades.`
      progressBarMessage = 'Weapon to grenade kills ratio is very good.'
      return (
        <SuperKillsRecommendation
          progress={100 - grenadeKillsRatio}
          theme='success'
          progressBarMessage={progressBarMessage}
          focusMessage={focusMessage}
          // quoteMessage={quoteMessage}
        />
      )
  }
}

interface ChoicesPropInterface {
  weaponKills: number
  noGrenadeMeleeAbilityKills: boolean
  superKillsPercent: number
  grenadeKillsPercent: number
}

interface AbilityKillFocusPropsInterface {
  chartData: AbilityDataInterface
  choices?: ChoicesPropInterface
}

function AbilityRecommendation(props: AbilityKillFocusPropsInterface){
  const { chartData, choices } = props

  const totalKills = Object.keys(chartData).reduce(
    (prev, curr: keyof AbilityDataInterface) => chartData[curr] + prev,
    0
  )
  const superKillsPercent = getPercentage(chartData.supers, totalKills)
  const grenadeKillsPercent = getPercentage(chartData.grenades, totalKills)

  switch (true) {
    default:
    case choices.superKillsPercent > 20:
      return <SuperKillRatio superKillsRatio={superKillsPercent} />
    case choices.noGrenadeMeleeAbilityKills === false:
      return <GrenadeKillRatio grenadeKillsRatio={grenadeKillsPercent} />
    case choices.grenadeKillsPercent === 0:
      return <GrenadeKillRatio grenadeKillsRatio={grenadeKillsPercent} />
  }
}

export default function AbilityKillFocus(props: AbilityKillFocusPropsInterface) {
  const { chartData } = props

  const totalKills = Object.keys(chartData).reduce(
    (prev, curr: keyof AbilityDataInterface) => chartData[curr] + prev,
    0
  ) || 0

  const weaponKills = chartData.weapons
  const grenadeKills = chartData.grenades
  const meleeKills = chartData.melee
  const abilityKills = chartData.abilities

  const noGrenadeMeleeAbilityKills = grenadeKills === 0 && meleeKills === 0 && abilityKills === 0
  // const superKillsPercent = getPercentage(chartData.supers, totalKills)
  // const grenadeKillsPercent = getPercentage(chartData.grenades, totalKills)


  const superKillsPercent = 21
  const grenadeKillsPercent = getPercentage(chartData.grenades, totalKills)

  const choices = {
    weaponKills,
    noGrenadeMeleeAbilityKills,
    superKillsPercent,
    grenadeKillsPercent,
  }
  // const superKillsPercent = 50
  // const grenadeKillsPercent = 20

  // console.log('AbilityKillFocus')
  // console.log(props)
  // console.log(grenadeKillsPercent)
  // console.log(totalKills)


  return (
    <div className='ability-chart-wrap flex-direction width-100'>
      <div className='focus-kdr-wrapper'>
        {
          AbilityRecommendation({chartData, choices})
        }
      </div>
    </div>
  )
}
