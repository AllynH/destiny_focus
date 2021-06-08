/* eslint-disable import/prefer-default-export */
import React from 'react'

import './style.css'

export const ProgressBar = (props = {
  progress: 69, theme: '--var(vanguard-blue)', message: '', steps: '666/666',
}) => {
  const {
    progress, theme, message, steps,
  } = props
  let colour = ''
  const pWidth = `${Number(progress.toFixed(1))}%`
  switch (theme) {
    case ('Valor'):
      colour = 'var(--valor)'
      break
    case ('Glory'):
      colour = 'var(--glory)'
      break
    case ('Infamy'):
      colour = 'var(--infamy)'
      break
    case ('warn'):
      colour = 'var(--crucible-red)'
      break
    case ('good'):
      colour = 'var(--vanguard-blue)'
      break
    case ('success'):
    default:
      colour = 'var(--gambit-green)'
      break
  }
  return (
    <div className='progress-bar'>
      <div className='progress-bar-text-fill-wrapper'>
        <div className='progress-bar-text-wrapper'>
          <div className='progres-bar-text'>{message}</div>
          <div className='progress-bar-percent'>{steps}</div>
        </div>
        <div className='progress-bar-fill' style={{ width: pWidth, backgroundColor: colour }}></div>
      </div>
    </div>
  )
}
