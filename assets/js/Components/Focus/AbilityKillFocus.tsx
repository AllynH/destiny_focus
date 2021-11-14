import React from 'react'
import { AbilityDataInterface, getPercentage } from '../../Utils/HelperFunctions/KdrFunctions'
import { ProgressBar } from '../Progress/ProgressBar'

import Grenade from '../../../destiny-icons/weapons/grenade.svg'
import Intellect from '../../../destiny-icons/general/intellect.svg'

interface SuperKillsRecommendationProps {
  progress: number
  theme: string
  progressBarMessage: string
  focusMessage?: string
  quoteMessage?: string
  allWarn?: boolean
}
const SuperKillsRecommendation = (p: SuperKillsRecommendationProps) => {
  const { progress, theme, progressBarMessage, focusMessage, quoteMessage } = p
  const steps = `${progress.toFixed(1)}% / 100%`
  return (
    <>
      <h2 className='focus-heading-h2 no-margin'>{progressBarMessage}</h2>
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
      quoteMessage = "The darkness may as well come in and take the place if that's all we've got."
      focusMessage =
        'Focus on improving your weapon skills, greater than 50% of your kills are coming from your super ability.'
      progressBarMessage = 'Stop using super ability as a crutch!'
      return (
        <SuperKillsRecommendation
          progress={100 - superKillsRatio}
          theme='warn'
          progressBarMessage={progressBarMessage}
          focusMessage={focusMessage}
          quoteMessage={quoteMessage}
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
      focusMessage = "Greater than 80% of your kills were with a weapon - you're not crutching on your super."
      progressBarMessage = 'Ratio of weapons Vs. super kills.'
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

function AbilityRecommendation(props: AbilityKillFocusPropsInterface) {
  const { chartData, choices } = props

  const totalKills = Object.keys(chartData).reduce(
    (prev, curr: keyof AbilityDataInterface) => chartData[curr] + prev,
    0
  )
  const superKillsPercent = getPercentage(chartData.supers, totalKills)
  const grenadeKillsPercent = getPercentage(chartData.grenades, totalKills)

  let quoteMessage = ''
  let focusMessage = ''
  let progressBarMessage = ''

  switch (true) {
    case choices.noGrenadeMeleeAbilityKills === true:
      quoteMessage = 'Let them burn in your light!'
      focusMessage = 'Tip: Try switching up your sub-class or exotic armour piece.'
      progressBarMessage = 'No grenade, melee or ability kills in the last 10 games!'
      return (
        <NoGrenadesMeleeAbility
          allWarn={true}
          progress={grenadeKillsPercent}
          theme='warn'
          progressBarMessage={progressBarMessage}
          focusMessage={focusMessage}
          quoteMessage={quoteMessage}
        />
      )
    case choices.grenadeKillsPercent === 0:
      quoteMessage = "Did you see that grenade toss? He's a danger only to himself!"
      progressBarMessage = 'No grenade kills in the last 10 games!'
      return (
        <NoGrenadesMeleeAbility
          allWarn={false}
          progress={grenadeKillsPercent}
          theme='warn'
          progressBarMessage={progressBarMessage}
          quoteMessage={quoteMessage}
        />
      )
    default:
      return <SuperKillRatio superKillsRatio={superKillsPercent} />
  }
}

function NoGrenadesMeleeAbility(p: SuperKillsRecommendationProps) {
  // const { progress, theme } = p
  const { progressBarMessage, quoteMessage, focusMessage, allWarn } = p

  return (
    <>
      <h2 className='focus-heading-h2 no-margin'>{progressBarMessage}</h2>
      <div className='focus-recommendation-wrapper'>
        {allWarn ? (
          <Intellect className={'icon-warn icon-shadow'} width={64} height={64} />
        ) : (
          <Grenade
            className={'icon-warn icon-shadow'}
            width={64}
            height={64}
            viewBox={'0 0 32 32'}
          />
        )}
        <div className='focus-recommendation-quote-wrapper'>
          {focusMessage && <p className='focus-kdr-recommendation-description'>{focusMessage}</p>}
          {quoteMessage && (
            <blockquote className='focus-kdr-recommendation-subtitle'>
              <cite>{quoteMessage}</cite> - Lord Shaxx
            </blockquote>
          )}
        </div>
      </div>
    </>
  )
}

export default function AbilityKillFocus(props: AbilityKillFocusPropsInterface) {
  const { chartData } = props

  const totalKills =
    Object.keys(chartData).reduce(
      (prev, curr: keyof AbilityDataInterface) => chartData[curr] + prev,
      0
    ) || 0

  const weaponKills = chartData.weapons
  const grenadeKills = chartData.grenades
  const meleeKills = chartData.melee
  const abilityKills = chartData.abilities
  const noGrenadeMeleeAbilityKills = grenadeKills === 0 && meleeKills === 0 && abilityKills === 0
  const superKillsPercent = getPercentage(chartData.supers, totalKills)
  const grenadeKillsPercent = getPercentage(chartData.grenades, totalKills)

  const choices = {
    weaponKills,
    noGrenadeMeleeAbilityKills,
    superKillsPercent,
    grenadeKillsPercent,
  }

  return (
    <div className='ability-chart-wrap flex-direction width-100'>
      <div className='focus-kdr-wrapper'>
        {AbilityRecommendation({ chartData, choices })}
      </div>
    </div>
  )
}
