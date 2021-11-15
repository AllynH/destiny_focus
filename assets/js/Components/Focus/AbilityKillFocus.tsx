import React from 'react'
import { AbilityDataInterface, getPercentage } from '../../Utils/HelperFunctions/KdrFunctions'
import { ProgressBar } from '../Progress/ProgressBar'

import Grenade from '../../../destiny-icons/weapons/grenade.svg'
import Intellect from '../../../destiny-icons/general/intellect.svg'
import Melee from '../../../destiny-icons/weapons/melee.svg'

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
      focusMessage =
        "Greater than 80% of your kills were with a weapon - you're not crutching on your super."
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
  meleeKills: number
  noGrenadeMeleeAbilityKills: boolean
  superKillsPercent: number
  grenadeKillsPercent: number
}

interface AbilityKillFocusPropsInterface {
  chartData: AbilityDataInterface
  choices?: ChoicesPropInterface
}

function AbilityRecommendation(props: AbilityKillFocusPropsInterface) {
  const { choices } = props

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
          progress={choices.grenadeKillsPercent}
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
            progress={choices.grenadeKillsPercent}
            theme='warn'
            progressBarMessage={progressBarMessage}
            quoteMessage={quoteMessage}
          />
        )
    case choices.meleeKills === 0:
      quoteMessage = "No holding back! Your enemies won't!"
      progressBarMessage = 'No melee kills in the last 10 games!'
      return (
        <NoMelee
          progress={choices.meleeKills}
          theme='warn'
          progressBarMessage={progressBarMessage}
          quoteMessage={quoteMessage}
        />
      )
      default:
      return <SuperKillRatio superKillsRatio={choices.superKillsPercent} />
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

function NoMelee(p: SuperKillsRecommendationProps) {
  // const { progress, theme } = p
  const { progressBarMessage, quoteMessage, focusMessage } = p

  return (
    <>
      <h2 className='focus-heading-h2 no-margin'>{progressBarMessage}</h2>
      <div className='focus-recommendation-wrapper'>
        <Melee className={'icon-warn icon-shadow'} width={64} height={64} viewBox={'0 0 32 32'} />
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
    meleeKills,
    noGrenadeMeleeAbilityKills,
    superKillsPercent,
    grenadeKillsPercent,
    totalKills,
  }

  // Debug - use this for testing values:
  // const choices = {
  //   weaponKills: 2,
  //   meleeKills: 0,
  //   noGrenadeMeleeAbilityKills:  false,
  //   superKillsPercent: 10,
  //   grenadeKillsPercent: 10,
  //   totalKills,
  // }

  return (
    <div className='ability-chart-wrap flex-direction width-100'>
      <div className='focus-kdr-wrapper flex-column flex-grow'>{AbilityRecommendation({ chartData, choices })}</div>
    </div>
  )
}
