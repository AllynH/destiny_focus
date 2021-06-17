import React from 'react'

import PrecisionWeaponChart from './PrecisionWeaponChart'
import { filterWeaponDefList } from '../../Utils/HelperFunctions/FilterWeapons'

export default function SimpleMenu(props) {
  const { allWeaponDefs } = props
  const [selectedWeapon, setSelectedWeapon] = React.useState(Object.keys(allWeaponDefs)[0] || '')

  const kineticWeapons = filterWeaponDefList(allWeaponDefs, 'kinetic')
  const energyWeapons = filterWeaponDefList(allWeaponDefs, 'energy')
  const powerWeapons = filterWeaponDefList(allWeaponDefs, 'power')

  const handleClose = (event) => {
    setSelectedWeapon(event.currentTarget.getAttribute('value'))
  }

  const WeaponGroup = (p) => {
    const { weaponObject, weaponType } = p
    return (
      <div className='weapon-selector-group'>
        <div className='weapon-selector-image-text-wrap'>
          <h3 className='weapon-selector-title'>{weaponType}</h3>
          <div className='weapon-selector-item-list'>
            {Object.keys(weaponObject).map((weapon, index) => (
              <div key={index} className=''>
                <div
                  // eslint-disable-next-line max-len
                  className={`weapon-selector-icon weapon-selector-item ${selectedWeapon === weapon ? 'highlighted-weapon' : ''}`}
                  key={index}
                  onClick={handleClose}
                  value={weapon}
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  style={{
                    background: `url(${`https://www.bungie.net${weaponObject[weapon]?.displayProperties?.icon}`}`,
                    backgroundSize: 'contain',
                    backgrouudRepeat: 'no-repeat',
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>

      {selectedWeapon ? (
        <PrecisionWeaponChart
          weaponName={allWeaponDefs[selectedWeapon].displayProperties.name}
          {...props}
        />
      ) : (
        ''
      )}
      <div className='weapon-selector-list weapon-precision-wrapper'>
        <WeaponGroup weaponObject={kineticWeapons} weaponType='Kinetic' />
        <WeaponGroup weaponObject={energyWeapons} weaponType='Energy' />
        <WeaponGroup weaponObject={powerWeapons} weaponType='Power' />
      </div>
    </div>
  )
}
