import React from 'react'

export default function ProgressionCircles(props) {
  /*
  Progress circles contain 2 circles:
    Inner circle - the current rank progress
    Outer circle - the total overall progress to reset.

  References:
    https://css-tricks.com/building-progress-ring-quickly/
    https://stackoverflow.com/questions/11496734/add-a-background-image-png-to-a-svg-circle-shape
    https://github.com/DestinyItemManager/DIM/blob/master/src/app/progress/CrucibleRank.tsx
  */
  const stroke = 4
  const radius1 = 60
  const imageHeight = 90
  const imageWidth = 90

  // const stroke = 2
  // const radius1 = 30
  // const imageHeight = 45
  // const imageWidth = 45

  const radius2 = radius1 - (stroke)
  const normalisedRadius1 = radius1 - stroke * 2
  const normalisedRadius2 = radius2 - stroke * 2
  const circumference1 = normalisedRadius1 * 2 * Math.PI
  const circumference2 = normalisedRadius2 * 2 * Math.PI

  const imageX = (radius1 * 2 - imageHeight) / 2
  const imageY = (radius1 * 2 - imageWidth) / 2

  const { progressionsData, modeProgressions, maxRank } = props

  return (
    <svg height={radius1 * 2} width={radius1 * 2}>
      <circle
        fill={'rgba(10, 10, 10, 0.3)'}
        r={normalisedRadius1}
        cx={`${radius1}`}
        cy={radius1}
      />
      <circle
        stroke={`rgba(${progressionsData.color.red}, ${progressionsData.color.green}, ${progressionsData.color.blue}, ${progressionsData.color.alpha})`}
        strokeDasharray={`${(circumference1 * modeProgressions.currentProgress) / maxRank} ${circumference1}`}
        transform={'rotate(-90)'}
        style={{ strokeDashoffset: { circumference1 } }}
        strokeWidth={stroke}
        fill={'transparent'}
        r={normalisedRadius1}
        cx={`-${radius1}`}
        cy={radius1}
      />
      <circle
        stroke='white'
        strokeDasharray={`${(circumference2 * modeProgressions.progressToNextLevel) / modeProgressions.nextLevelAt} ${circumference2}`}
        transform={'rotate(-90)'}
        style={{ strokeDashoffset: { circumference2 } }}
        strokeWidth={stroke}
        fill={'transparent'}
        r={normalisedRadius2}
        cx={`-${radius1}`}
        cy={radius1}
      />
      <image
        width={imageWidth}
        height={imageHeight}
        x={imageX}
        y={imageY}
        xlinkHref={`https://www.bungie.net${progressionsData.steps[modeProgressions.level].icon}`}
      />
    </svg>
  )
}
