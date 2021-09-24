import React from 'react'

interface CheckboxesInterface {
  streakArray: boolean[],
  modeColour: string,
}

export default function Checkboxes(props: CheckboxesInterface) {
  /*
  Creates a series of 5 div's containing boxes.
  This displays the users win streak.
  Wins are denoted by filled check boxes.

  */

  const { streakArray, modeColour } = props

  return (
    <div className='checkbox-wrapper'>
      {streakArray.map((streak, index) => (
        <SingleCheckBox key={index} win={streak} modeColour={modeColour} />
      ))}
    </div>
  )
}

interface CheckSingleBoxInterface {
  win: boolean,
  modeColour: string,
}

export function SingleCheckBox(props: CheckSingleBoxInterface) {
  const { win, modeColour } = props

  const boxStyle = win ? { backgroundColor: modeColour } : {}
  const classStyle = win ? 'checkbox-box filled-box' : 'checkbox-box'

  return (
    <div className={classStyle} style={boxStyle}></div>
  )
}
