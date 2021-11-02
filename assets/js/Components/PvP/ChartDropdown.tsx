import React, { useState } from 'react'

// import { ExtendedDataTypes } from '../../Data/destinyEnums'
import './style.css'
import { Button, makeStyles, Menu, MenuItem } from '@material-ui/core'
import { getAverageFromArray, getStatsFromPgcrEntry } from '../../Utils/HelperFunctions/FilterStats'
import { ChartDropdownInterface } from './types'
import LargeBarChart from '../Charts/LargeBarChart'
import { RemovedStats } from '../../Data/destinyEnums'

export default function ChartDropdown(props: ChartDropdownInterface) {
  const { pgcrSummary } = props
  // const { activityList } = props
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedStat, setSelectedStat] = useState('kills')

  const availableActivities = Object.keys(pgcrSummary.Response[0]?.data?.values)
  const extendedActivities = Object.keys(pgcrSummary.Response[0]?.data?.extended?.values)
  const allStats = [...availableActivities, ...extendedActivities]

  const filteredStats = allStats.filter((item) => !RemovedStats.includes(item))
  // console.log('ChartDropDown.tsx')
  // console.log(allStats)

  const toggleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen(!open)
  }

  const selectStatClick = (event: React.MouseEvent<HTMLElement>) => {
    setSelectedStat(event.currentTarget.getAttribute('value') || selectedStat)
    setAnchorEl(null)
  }

  const useStyles = makeStyles({
    button: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 5,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'var(--grey-bg)',
      width: 200,
      textAlign: 'center',
    },
  })
  const classes = useStyles()

  return (
    <div className='chart-dropdown-wrapper'>
      <div className='chart-dropdown-button-spacer'>
        <Button className={`dropdown-button ${classes.button}`} onClick={toggleOpen}>
          Select a stat
        </Button>
        <Menu anchorEl={anchorEl} keepMounted onClose={selectStatClick} open={Boolean(anchorEl)}>
          {filteredStats.map((entry, index: number) => (
            <MenuItem key={index} value={entry} onClick={selectStatClick}>
              {entry}
            </MenuItem>
          ))}
        </Menu>
      </div>
      {selectedStat ? (
        // <ChartWithProps
        //   statName={selectedStat}
        //   statValues={getStatsFromPgcrEntry(selectedStat, pgcrSummary)}
        //   average={getAverageFromArray(getStatsFromPgcrEntry(selectedStat, pgcrSummary))}
        // />
        <LargeBarChart
          chartTitle={selectedStat}
          chartData={getStatsFromPgcrEntry(selectedStat, pgcrSummary)}
          average={getAverageFromArray(getStatsFromPgcrEntry(selectedStat, pgcrSummary))}
        />
      ) : (
        ''
      )}
    </div>
  )
}
