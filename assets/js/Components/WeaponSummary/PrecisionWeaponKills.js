import React from 'react'

import WeaponDropdown from './WeaponDropdown'
import { WEAPON_TYPES } from '../../Data/destinyEnums'

import './style.css'

const createWeaponDefList = (Response) => {
  /*
    Creates an object containing all unique weapons, a player has achieved a kill with.
    This uses a 'try catch', as in some cases the user may not
      have gotten a weapon kill in a given game.
  */
  let wepDefObjs = {}
  Response.forEach((p) => {
    try {
      p.data.extended.weapons.forEach((w) => {
        if (Object.keys(wepDefObjs).indexOf(w.referenceId) === -1) {
          wepDefObjs = { ...wepDefObjs, [w.referenceId]: w.definition }
        }
      })
    } catch (e) {
      // console.log(e)
    }
  })
  return wepDefObjs
}

const filterWeaponDefList = (weapDefObj, filter = 'kinetic') => {
  /*
    Filters wepDefObj for weapons of a given bucketTypeHash.
    Hashes are:
      kinetic
      energy
      power
  */
  const wepHash = WEAPON_TYPES[filter]
  const filtered = Object.keys(weapDefObj)
    .filter((hash) => weapDefObj[hash].inventory.bucketTypeHash === wepHash)
    .reduce((accumulator, hash) => {
      accumulator[hash] = weapDefObj[hash]
      return accumulator
    }, {})
  return filtered
}

const filterWeaponDefListByHash = (weapDefObj, filter = 'kinetic', selectedHash = 1364093401) => {
  /*
    Filters wepDefObj for weapons of a given bucketTypeHash.
    Hashes are:
      kinetic
      energy
      power
  */
  const wepHash = WEAPON_TYPES[filter]
  const filtered = Object.keys(weapDefObj)
    .filter((hash) => weapDefObj[hash].inventory.bucketTypeHash === wepHash)
    .filter((hash) => weapDefObj[hash].hash === selectedHash)
    .reduce((accumulator, hash) => {
      accumulator[hash] = weapDefObj[hash]
      return accumulator
    }, {})
  return filtered
}

export default function PrecisionWeaponKills(props) {
  const { Response } = props || {}
  const allWeaponDefs = createWeaponDefList(Response)
  // const filteredWeapons = filterWeaponDefList(allWeaponDefs, 'energy')
  // const TLW = filterWeaponDefListByHash(allWeaponDefs, 'kinetic', 1364093401)

  // console.log('Weapon filters:')
  // console.log(allWeaponDefs)
  // console.log(filteredWeapons)
  // console.log(TLW)

  return (
    <div>
      <WeaponDropdown
        {...props}
        allWeaponDefs={allWeaponDefs} />
    </div>
  )
}
