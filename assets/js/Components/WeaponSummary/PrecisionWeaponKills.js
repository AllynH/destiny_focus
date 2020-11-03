import React, { useState, useEffect } from 'react'

import Shimmer from '../../Utils/Loading/Shimmer'
import WeaponDropdown from './WeaponDropdown'

import './style.css'

export default function PrecisionWeaponKills(props) {
  var weapon_id_list = []
  var weapon_name_list = []
  props.Response.map((p, index) => {
    // In case of no weapon kills:
    try {
      p.data.extended.weapons.map((w) => {
        // weapon_id_list.indexOf(w.referenceId) === -1 ? weapons.push(w.referenceId) : null
        weapon_name_list.indexOf(w.definition.displayProperties.name) === -1
          ? weapon_name_list.push(w.definition.displayProperties.name)
          : null
      })
    } catch (e) {
      // null
      // console.log(e)
      // console.log(p)
    }
    // console.log(weapons)
  })

  console.log('weapons')
  console.log(weapon_name_list)
  // console.log(weapon_id_list)

  // Mida Multi-Tool: 1331482397

  const WeaponList = () => {
    const weapons = weapon_name_list.map((w, index) => {
      return <li key={index}>{w}</li>
    })

    const weaponList = <ul>{weapons}</ul>
    return weapon_name_list
  }

  return (
    <div>
      <WeaponDropdown {...props} weaponList={weapon_name_list} />
    </div>
  )
}
