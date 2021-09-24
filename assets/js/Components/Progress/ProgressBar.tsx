/* eslint-disable import/prefer-default-export */
import React from 'react'

import './style.css'

interface ProgressBarInterface {
  progress: number,
  theme: string,
  message: string,
  steps: string,
}

export const ProgressBar = (props: ProgressBarInterface = {
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
    case ('trials'):
      colour = 'var(--bungie-power)'
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
          <div className='progress-bar-text'>{message}</div>
          <div className='progress-bar-percent'>{steps}</div>
        </div>
        <div className='progress-bar-fill' style={{ width: pWidth, backgroundColor: colour }}></div>
      </div>
    </div>
  )
}
