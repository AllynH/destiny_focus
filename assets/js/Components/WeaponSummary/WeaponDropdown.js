import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PrecisionWeaponChart from './PrecisionWeaponChart'

export default function SimpleMenu(props) {
  console.log(props)
  console.log(props.weaponList)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedWeapon, setSelectedWeapon] = React.useState()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event) => {
    setSelectedWeapon(event.currentTarget.getAttribute('value'))
    setAnchorEl(null)
  }

  console.log('selectedWeapon')
  console.log(selectedWeapon)

  return (
    <div>
      <Button className={'dropdown-button'} aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
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
