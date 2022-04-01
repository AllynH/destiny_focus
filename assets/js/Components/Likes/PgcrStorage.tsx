import React from 'react'
import { ProgressBar } from '../Progress/ProgressBar'

interface PgcrStorageViewInterface {
  pgcrAllocation: number,
  pgcrCount: number,
}

export default function PgcrStorageView(props: PgcrStorageViewInterface) {
  const { pgcrAllocation, pgcrCount } = props

  const message = "PGCR storage space"
  const progress = (pgcrCount / pgcrAllocation) * 100
  const steps = `${pgcrCount} : ${pgcrAllocation}`
  const theme = progress < 75 ? 'good' : 'warn'

  return (
    <div className='pgcr-storage-wrap'>
      <ProgressBar message={message} progress={progress} steps={steps} theme={theme} />
    </div>
  )
}
