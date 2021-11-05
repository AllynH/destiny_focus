import React, { useState, useEffect } from 'react'

import { VictoryPie, VictoryTooltip } from 'victory'
import { AbilityDataInterface } from '../../Utils/HelperFunctions/KdrFunctions'
import Spinner from '../../Utils/Loading/Spinner'

import './style.css'

interface AbilitiesPiePropsInterface {
  data: AbilityDataInterface,
}

interface chartDataInterface {
  x: number,
  y: number,
  label: string,
  stroke: string,
  filter: string,
}

export default function AbilitiesPie(props: AbilitiesPiePropsInterface) {
  // console.log('AbilitiesPie')
  // console.log(props)
  const { data } = props
  const [formattedData, setFormattedData] = useState(null)

  useEffect(() => {
    const makeChartData = () => {
      /*
        Format the data first.
        As often there is a lot of 0's in the values - set lowest value to 0.1 - to still display a small wedge.
      */
      const count = 0
      const formatted: chartDataInterface[] = []
      Object.keys(data).forEach((key: keyof AbilityDataInterface) => {
        const accountForZero = data[key] > 0 ? data[key] : 0.1
        const values: chartDataInterface = {
          x: count,
          y: accountForZero,
          label: `${key}: ${data[key]}`,
          stroke: 'var(--crucible-red)',
          filter: 'drop-shadow( 3px 3px 7px rgba(255, 255, 255, .5))',
        }
        formatted.push(values)
      })

      setFormattedData(formatted)
      return formatted
    }
    makeChartData()
  }, [data])

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
                <stop offset='0%' stopColor='var(--vanguard-dark-1)' />
                <stop offset='100%' stopColor='var(--gambit-green-dark-1)' />
              </linearGradient>
              <linearGradient id='gradient4' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' stopColor='var(--bungie-power-light-1)' />
                <stop offset='100%' stopColor='var(--bungie-power-dark-1)' />
              </linearGradient>
              <linearGradient id='gradient5' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' stopColor='var(--gambit-green)' />
                <stop offset='100%' stopColor='var(--gambit-green-dark-1)' />
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
              'url(#gradient5)',
            ]}
          />
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}
