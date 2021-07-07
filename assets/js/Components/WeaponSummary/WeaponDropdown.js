import React, { useRef } from 'react'

import ReactTooltip from 'react-tooltip'

import PrecisionWeaponChart from './PrecisionWeaponChart'
import ItemModal from '../Item'
import { filterWeaponDefList } from '../../Utils/HelperFunctions/FilterWeapons'

export default function SimpleMenu(props) {
  const inputEl = useRef(null)
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
      <section>
        <div className='weapon-selector-group'>
          <div className='weapon-selector-image-text-wrap'>
            <h3 className='weapon-selector-title'>{weaponType}</h3>
            <div className='weapon-selector-item-list position-relative'>
              {Object.keys(weaponObject).map((weapon, index) => (
                <div key={index} className=''>
                  <div
                    className='weapon-selector-icon weapon-selector-item position-relative'
                    key={index}
                    onClick={handleClose}
                    value={weapon}
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    ref={inputEl}
                    data-tip
                    data-for='highlighted-weapon'
                    style={{
                      background: `url(${`https://www.bungie.net${weaponObject[weapon]?.displayProperties?.icon}`}`,
                      backgroundSize: 'contain',
                      backgrouudRepeat: 'no-repeat',
                    }}
                  ></div>
                  <ReactTooltip place='top' id={'highlighted-weapon'} type='dark' ref={inputEl}>
                    {/* Hello, world! */}
                    <ItemModal {...weaponObject[weapon]} />
                  </ReactTooltip>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
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
      <div className='weapon-selector-list'>
        <WeaponGroup weaponObject={kineticWeapons} weaponType='Kinetic' />
        <WeaponGroup weaponObject={energyWeapons} weaponType='Energy' />
        <WeaponGroup weaponObject={powerWeapons} weaponType='Power' />
      </div>
    </div>
  )
}
