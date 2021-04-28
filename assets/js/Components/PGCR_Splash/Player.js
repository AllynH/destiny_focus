import React, { useState, useEffect } from 'react'

import { parsePgcrData } from './parsePgcrData'

import { calculateKillDeathRatio } from '../../Utils/HelperFunctions/KdrFunctions'
import { returnSimpleActivity } from '../../Utils/HelperFunctions/getMode'
import { GetActivityDefinition } from '../../Utils/API/API_Requests'

import Melee from '../../../destiny-icons/weapons/melee.svg'
import Grenade from '../../../destiny-icons/weapons/grenade.svg'
import Super from '../../../destiny-icons/supers/arc_titan.svg'

export default function Player({
  activeUserId = '',
  modeIsRaid = false,
  entry = {},
  activityMode = 'Raid',
}) {
  const pgcrData = parsePgcrData(entry, activityMode, activeUserId)
  const gridLen = `pgcr_splash_grid_${pgcrData.values.length}`

  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <div className='pgcr-splash-player-wrapper hover-animation'>
      <div
        className={`pgcr-splash-character-row ${pgcrData.activeUser} ${pgcrData.completedFlag}`}
        role='button'
        onClick={() => toggleOpen()}
      >
        <div className={`pgcr-splash-character-details ${gridLen}`}>
          <div className='pgcr-splash-icon' style={pgcrData.iconStyle}></div>
          <div className='align-left padding-left'>{pgcrData.username}</div>
          {pgcrData.values.map((value, index) => (
            <div key={index}>{value}</div>
          ))}
        </div>
      </div>
      {open ? <PlayerDropdown {...entry} /> : ''}
    </div>
  )
}

function PlayerDropdown(entry) {
  return (
    <>
      <ul className='no-margin dark-transparent-bg'>
        <DropdownDataRow
          index={1}
          weaponName={'Weapon'}
          kills={'Kills:'}
          precision={'Precision:'}
        />
      </ul>

      <ul className='no-margin dark-transparent-bg'>
        {entry.extended.weapons?.map((w, index) => (
          <DisplayWeapon key={index} weaponHash={w.referenceId} index={index} w={w} />
        ))}

        {/* Add Melee, Grenade and Super kills */}
        <DropdownDataRow
          index={1}
          weaponName={'Melee'}
          iconSvg={<Melee width={32} style={{ fill: 'white' }} />}
          kills={entry.extended.values.weaponKillsMelee.basic.value}
          precision={0}
        />

        <DropdownDataRow
          index={1}
          weaponName={'Grenade'}
          iconSvg={<Grenade width={32} style={{ fill: 'white' }} />}
          kills={entry.extended.values.weaponKillsGrenade.basic.value}
          precision={0}
        />

        <DropdownDataRow
          index={1}
          weaponName={'Super'}
          iconSvg={<Super width={32} viewBox={'0 -10 50 50'} style={{ fill: 'white' }} />}
          kills={entry.extended.values.weaponKillsSuper.basic.value}
          precision={0}
        />
      </ul>
    </>
  )
}

function DisplayWeapon(props) {
  const { weaponHash, index, w } = props
  const [weapon, setWeapon] = useState()

  useEffect(() => {
    const fetchWeapon = async (activityId) => {
      const result = await GetActivityDefinition({
        params: { definition: 'DestinyInventoryItemDefinition', defHash: weaponHash },
      })
      setWeapon(result)
    }
    fetchWeapon(weaponHash)
  }, [props])

  const iconStyle = {
    backgroundImage: `url(https://www.bungie.net${weapon?.displayProperties?.icon})`,
    height: 40,
    width: 40,
    backgroundSize: 'contain',
  }
  return (
    <>
      {weapon ? (
        <DropdownDataRow
          index={index}
          weaponName={weapon.displayProperties?.name}
          iconStyle={iconStyle}
          kills={w.values.uniqueWeaponKills?.basic?.value}
          precision={w.values?.uniqueWeaponKillsPrecisionKills?.basic?.displayValue}
        />
      ) : (
        <div></div>
      )}
    </>
  )
}

function DropdownDataRow({
  index = 0,
  weaponName = {},
  iconStyle = {},
  iconSvg = '',
  kills = 0,
  precision = null,
}) {
  return (
    <li key={index} className='list-style-none margin-top-bottom'>
      <div className='pgcr-weapon-wrapper'>
        <div className='pgcr-weapon-icon' style={iconStyle}>
          {iconSvg}
        </div>
        <div>{weaponName}</div>
        <div>{kills}</div>
        <div>{precision ? `${precision}` : ''}</div>
      </div>
    </li>
  )
}
