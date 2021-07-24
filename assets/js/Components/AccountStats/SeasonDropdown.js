/* eslint-disable linebreak-style */
import React, { useRef } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'

import { SEASONS } from '../../Data/statsData'
import AccountStats from './AccountStats'

export default function SeasonMenu(props) {
  // console.log('SeasonMenu')
  // console.log(props)
  // console.log(props.season)
  // console.log(props)
  const { season, gameMode } = props
  const seasonList = [...Object.keys(SEASONS)]
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedSeason, setselectedSeason] = React.useState(
    seasonList[seasonList.length - 1] || ''
  )

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event) => {
    setselectedSeason(event.currentTarget.getAttribute('value') || selectedSeason)
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
    <div>
      <div className='season-dropdown-button'>
        <Button
          className={`dropdown-button ${classes.button}`}
          aria-controls='simple-menu'
          aria-haspopup='true'
          onClick={handleClick}
        >
          {SEASONS[selectedSeason].TITLE || 'Select a season'}
        </Button>
      </div>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.keys(SEASONS)
          // .filter((p) => p.ACTIVE === true)
          .map((p, index) => (
            <MenuItem key={index} value={p} onClick={handleClose}>
              {`${p}: ${SEASONS[p].TITLE}`}
            </MenuItem>
          ))}
      </Menu>
      {selectedSeason ? (
        <AccountStats
          {...props}
          gameMode={gameMode}
          seasonDescription={`${selectedSeason}: ${SEASONS[selectedSeason].TITLE}`}
          season={selectedSeason}
          subHeading={season.subHeading}
          heading={season.heading}
          scope={season.scope}
          apiUrl={season.apiUrl}
        />
      ) : (
        ''
      )}
    </div>
  )
}
