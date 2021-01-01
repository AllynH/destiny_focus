import React, { useRef } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SaveIcon from '@material-ui/icons/Save'
import { makeStyles } from '@material-ui/core/styles'
import { exportComponentAsJPEG } from 'react-component-export-image'

import { SEASONS } from '../../Data/statsData'
import AccountStats from './AccountStats'

export default function SeasonMenu(props) {
  // console.log('SeasonMenu')
  // console.log(props)
  // console.log(props.season)
  // console.log(props)
  const { season } = props
  const seasonList = [...Object.keys(SEASONS)]
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedSeason, setselectedSeason] = React.useState(
    seasonList[seasonList.length - 1] || '',
  )
  const componentRef = useRef()

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
      <Button
        className={'dropdown-button'}
        className={classes.button}
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        {SEASONS[selectedSeason].TITLE || 'Select a season'}
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.keys(SEASONS).map((p, index) => (
          <MenuItem key={index} value={p} onClick={handleClose}>
            {`${p}: ${SEASONS[p].TITLE}`}
          </MenuItem>
        ))}
      </Menu>
      {selectedSeason ? (
        <div className='button-wrapper'>
          <AccountStats
            {...props}
            ref={componentRef}
            seasonDescription={`${selectedSeason}: ${SEASONS[selectedSeason].TITLE}`}
            season={selectedSeason}
            subHeading={season.subHeading}
            heading={season.heading}
            scope={season.scope}
            apiUrl={season.apiUrl}
          />
          <Button
            variant='contained'
            color='primary'
            size='small'
            // className={classes.button}
            startIcon={<SaveIcon />}
            onClick={() => exportComponentAsJPEG(componentRef)}
          >
            Share
          </Button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
