import React from 'react'

import { useHistory } from 'react-router'

import { useDispatch } from 'react-redux'
import { FocusGoalTypes } from '../../Components/Focus/types'

import { setFocusMode } from '../../Redux/Actions'

/*
https://stackoverflow.com/questions/56322667/how-to-type-a-form-component-with-onsubmit
*/

interface FormElements extends HTMLFormControlsCollection {
  // yourInputName: HTMLInputElement
  killDeathRatio: HTMLInputElement,
  precisionKillsCount: HTMLInputElement,
  avgLifeTime: HTMLInputElement,
  winLossRatio?: HTMLInputElement,

}
interface focusFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

interface FocusFormInterface {
  focus: FocusGoalTypes
  focusUrl: string
}

export default function FocusForm(props: FocusFormInterface) {
  const { focus, focusUrl } = props

  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (e: React.FormEvent<focusFormElement>) => {
    e.preventDefault()

    const killDeathRatio = Number(e.currentTarget.elements.killDeathRatio.value) || 0
    const precisionKillsCount = Number(e.currentTarget.elements.precisionKillsCount.value) || 0
    const avgLifeTime = Number(e.currentTarget.elements.avgLifeTime.value) || 0

    if (killDeathRatio !== 0 && precisionKillsCount !== 0 && avgLifeTime !== 0) {
      dispatch(
        setFocusMode(focus, {
          killDeathRatio,
          // winLossRatio,
          precisionKillsCount,
          avgLifeTime,
        })
      )
    }
    history.push(focusUrl)
    return false
  }
  return (
    <form className='flip-card-form-wrap' onSubmit={handleSubmit}>
      <label className='flip-card-form-item' id='killDeathRatio' htmlFor='killDeathRatio'>
        Kill / Death Ratio
      </label>
      <input
        className='flip-card-form-item'
        type='number'
        id='killDeathRatio'
        min='0.25'
        max='10'
        step='any'
        placeholder='1.2'
        // onChange={(e) => setKillDeathRatio(Number(e.currentTarget.value))}
        // defaultValue='1.2'
      ></input>
      <label className='flip-card-form-item' id='precisionKillsCount' htmlFor='precisionKillsCount'>
        Precision Kills per game (count)
      </label>
      <input
        className='flip-card-form-item'
        type='number'
        id='precisionKillsCount'
        min='1'
        max='1000'
        step='1'
        placeholder='10'
        // onChange={(e) => setPrecisionKillsCount(Number(e.currentTarget.value))}
        // defaultValue='10'
      ></input>
      <label className='flip-card-form-item' id='avgLifeTime' htmlFor='avgLifeTime'>
        Average time alive (seconds)
      </label>
      <input
        className='flip-card-form-item'
        type='number'
        id='avgLifeTime'
        min='1'
        max='1000'
        step='1'
        placeholder='90'
        // onChange={(e) => setAvgLifeTime(Number(e.currentTarget.value))}
        // defaultValue='90'
      ></input>
      <input
        className='flip-card-form-item'
        type='submit'
        // onClick={handleSubmit}
        value='Submit'
        id='card-submit-button'
      ></input>
    </form>
  )
}
