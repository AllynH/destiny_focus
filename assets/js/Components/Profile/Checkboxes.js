import React from 'react'

export default function Checkboxes(props) {
  /*
  Creates a series of 5 div'c containing boxes.
  This displays the users win streak.
  Wins are denoted by filled check boxes.

  */

  const { streakArray, modeColour } = props

  return (
    <div className='checkbox-wrapper'>
      {streakArray.map((streak, index) => (
        <StreakBox key={index} win={streak} modeColour={modeColour} />
      ))}
    </div>
  )
}

function StreakBox(props) {
  const { win, modeColour } = props

  const boxStyle = win ? { backgroundColor: modeColour } : {}
  const classStyle = win ? 'checkbox-box filled-box' : 'checkbox-box'

  return (
    <div className={classStyle} style={boxStyle}></div>
  )
}
