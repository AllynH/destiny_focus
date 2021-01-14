/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

import React, { useState, useEffect } from 'react'

import { VictoryChart, VictoryPie, VictoryTooltip, VictoryTheme } from 'victory'

import './style.css'
import { FormatBold } from '@material-ui/icons'
import ClickableCharacterList from '../CharacterSelect/ClickableCharacterList'

import Spinner from '../../Utils/Loading/Spinner'
import { getUrlDetails } from '../../Utils/HelperFunctions'

export default function AbilitiesPie(props) {
  console.log('AbilitiesPie')
  console.log(props)
  const { data } = props

  const [formattedData, setFormattedData] = useState(false)

  const orange = { base: 'gold', highlight: 'darkOrange' }

  const red = { base: 'tomato', highlight: 'orangeRed' }

  const innerRadius = 30

  const style = {
    fontSize: 18,
    fontWeight: 'bold',
  }

  const testData = [
    { x: 1, y: 2, label: 'one' },
    { x: 2, y: 3, label: 'two' },
    { x: 3, y: 5, label: 'three' },
  ]

  useEffect(() => {
    console.log('Inside useEffect: AbilitiesPie')
    console.log(data)
    const makeChartData = () => {
      const count = 0

      const formatted = []

      for (const [key, value] of Object.entries(data)) {
        console.log(key, value)
        const accountForZero = value > 0 ? value : 0.1
        const vals = {
          x: count,
          y: value,
          label: `${key}: ${value}`,
          stroke: 'var(--crucible-red)',
          filter: 'drop-shadow( 3px 3px 7px rgba(0, 0, 0, .5))',
        }
        formatted.push(vals)
      }

      console.log(formatted)
      setFormattedData(formatted)
      // setFormattedData(junk)
      return formatted
    }
    makeChartData()
  }, [props])

  console.log('Checking state:')
  console.log(formattedData)
  return (
    <>
      {formattedData ? (
        <div>
          <p className='chart-body-heading'>Hover for details...</p>
          {/* <h2 className='chart-body-heading'>Ability kills:</h2> */}
          <svg style={{ height: 0, width: 0 }}>
            <defs>
              <linearGradient id='gradient1' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' stopColor='var(--crucible-red)' />
                <stop offset='100%' stopColor='var(--crucible-dark-1)' />
              </linearGradient>
              <linearGradient id='gradient2' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' stopColor='var(--vanguard-blue)' />
                <stop offset='100%' stopColor='var(--vanguard-dark-1)' />
              </linearGradient>
              <linearGradient id='gradient3' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' stopColor='var(--gambit-green)' />
                <stop offset='100%' stopColor='darkGreen' />
              </linearGradient>
              <linearGradient id='gradient4' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' stopColor='yellowGreen' />
                <stop offset='100%' stopColor='green' />
              </linearGradient>
            </defs>
          </svg>
          <VictoryPie
            padding={40}
            labelComponent={<VictoryTooltip />}
            style={{
              data: { filter: 'drop-shadow( 3px 3px 7px rgba(50, 50, 50, .6))' },
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
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}
