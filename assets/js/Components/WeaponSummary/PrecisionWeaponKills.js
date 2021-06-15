/* eslint-disable no-unused-vars */
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
