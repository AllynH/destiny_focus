import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles';
import PrecisionWeaponChart from './PrecisionWeaponChart'

export default function SimpleMenu(props) {
  console.log(props)
  console.log(props.weaponList)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedWeapon, setSelectedWeapon] = React.useState(props.weaponList[0] || '')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event) => {
    setSelectedWeapon(event.currentTarget.getAttribute('value'))
    setAnchorEl(null)
  }


  const useStyles = makeStyles({
    button: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 5,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'var(--grey-bg)',
      width: 150,
      textAlign: 'center',
    },
  });
  const classes = useStyles();

  console.log('selectedWeapon')
  console.log(selectedWeapon)

  return (
    <div>
      <Button className={'dropdown-button'} className={classes.button} aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
        {selectedWeapon || 'Select a weapon'}
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.weaponList.map((p, index) => (
          <MenuItem key={index} value={p} onClick={handleClose}>
            {p}
          </MenuItem>
        ))}
      </Menu>
      {selectedWeapon ? (
        <PrecisionWeaponChart weaponName={selectedWeapon} {...props} />
      ) : (
        ''
      )}
    </div>
  )
}