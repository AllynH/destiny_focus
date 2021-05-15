import React from 'react'

// interface ReloadProgressBarProps {
//   value: number,
//   max: number,
// }

// const ReloadProgressBar = ({ value, max }: ReloadProgressBarProps) => {
export default function ReloadProgressBar({ value, max }) {
  const progress = Math.max(0, Math.round((value / max) * 10000) / 100)
  console.log(progress)
  return (
    <div className='reload-progress-bar'>
      <div className='reload-progress-bar-inner' style={{ width: `${progress}%` }}></div>
    </div>
  )
}
