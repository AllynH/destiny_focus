/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

import React, { useState, useEffect } from 'react'

import { VictoryPie, VictoryTooltip } from 'victory'

import './style.css'

import Spinner from '../../Utils/Loading/Spinner'

export default function AbilitiesPie(props) {
  // console.log('AbilitiesPie')
  // console.log(props)
  const { data } = props

  const [formattedData, setFormattedData] = useState(false)

  /* Legacy debug items: */
  // const orange = { base: 'gold', highlight: 'darkOrange' }

  // const red = { base: 'tomato', highlight: 'orangeRed' }

  // const innerRadius = 30

  // const style = {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // }

  // const testData = [
  //   { x: 1, y: 2, label: 'one' },
  //   { x: 2, y: 3, label: 'two' },
  //   { x: 3, y: 5, label: 'three' },
  // ]

  useEffect(() => {
    // console.log('Inside useEffect: AbilitiesPie')
    // console.log(data)
    const makeChartData = () => {
      const count = 0

      const formatted = []

      for (const [key, value] of Object.entries(data)) {
        const accountForZero = value > 0 ? value : 0.1
        const vals = {
          x: count,
          y: accountForZero,
          label: `${key}: ${value}`,
          stroke: 'var(--crucible-red)',
          filter: 'drop-shadow( 3px 3px 7px rgba(255, 255, 255, .5))',
        }
        formatted.push(vals)
      }

      // console.log(formatted)
      setFormattedData(formatted)
      return formatted
    }
    makeChartData()
  }, [data])

  // console.log('Checking state:')
  // console.log(formattedData)
  return (
    <>
      {formattedData ? (
        <>
          <p className='chart-body-heading'>Hover for details...</p>
          <svg style={{ height: 0, width: 0 }}>
            <defs>
              <linearGradient id='gradient1' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' stopColor='var(--crucible-red)' />
                <stop offset='100%' stopColor='var(--crucible-dark-2)' />
              </linearGradient>
              <linearGradient id='gradient2' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' stopColor='var(--vanguard-blue)' />
                <stop offset='100%' stopColor='var(--vanguard-dark-2)' />
              </linearGradient>
              <linearGradient id='gradient3' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' stopColor='var(--gambit-green)' />
                <stop offset='100%' stopColor='var(--gambit-green-dark-1)' />
              </linearGradient>
              <linearGradient id='gradient4' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' stopColor='var(--bungie-power-light-1)' />
                <stop offset='100%' stopColor='var(--bungie-power-dark-1)' />
              </linearGradient>
            </defs>
          </svg>
          <VictoryPie
            padding={40}
            labelComponent={<VictoryTooltip />}
            style={{
              data: { filter: 'drop-shadow( 3px 3px 7px rgba(200, 200, 200, .5))' },
              labels: {
                fill: 'var(--vanguard-dark-4)',
                fontSize: 20,
                fontFamily: 'unset',
                padding: 30,
              },
            }}
            padAngle={2}
            innerRadius={80}
            data={formattedData}
            //   colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
            colorScale={[
              'url(#gradient1)',
              'url(#gradient2)',
              'url(#gradient3)',
              'url(#gradient4)',
            ]}
          />
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}
