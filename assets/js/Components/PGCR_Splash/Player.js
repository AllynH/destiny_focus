import React, { useState, useEffect } from 'react'

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
  const [open, setOpen] = useState(false)
  console.log('activityMode', activityMode)
  /*
    Takes an individual entry from mapping: pgcr.Response.entries
  */
  const completedDiv = (s) => {
    console.log('completed div', s)
    if (s) {
      return 'pgcr_splash-completed'
    }
    return 'pgcr_splash-failed'
  }

  const membershipId = entry.player?.destinyUserInfo?.membershipId

  const setActive = Boolean(membershipId === activeUserId)
  const activeUser = setActive ? 'active' : ''

  const username = entry.player?.destinyUserInfo?.displayName
  const kills = entry.values?.kills?.basic?.value
  const deaths = entry.values?.deaths?.basic?.value
  const primevalDamage = entry.extended?.values?.primevalDamage?.basic?.value
  const assists = entry.values?.assists?.basic?.value
  const score = entry.score?.basic?.value
  const kdr = calculateKillDeathRatio(kills, deaths)
  const standing = entry.values?.completed?.basic?.displayValue === 'Yes'
  const completed = completedDiv(standing)
  const playerIcon = entry.player?.destinyUserInfo?.iconPath
  const iconStyle = {
    backgroundImage: `url(https://www.bungie.net${playerIcon})`,
    height: 30,
    width: 30,
    backgroundSize: 'contain',
  }
  const toggleOpen = () => {
    setOpen(!open)
  }

  const getLastValue = (m) => {
    switch (returnSimpleActivity(m)) {
      case 'AllPvP':
      case 'TrialsOfOsiris':
      default:
        return { completedFlag: '', value: kdr }
      // return { completedFlag: '', values: [{ name: 'kills', value: kills }, { name: 'deaths', value: deaths }, { name: 'assists', value: assists }, { name: 'kdr', value: kdr }] }
      case 'Gambit':
        return { completedFlag: '', value: primevalDamage }
      case 'Nightfall':
        return { completedFlag: '', value: score }
      case 'Raid':
        return { completedFlag: completed, value: score }
    }
  }
  const lastValues = getLastValue(activityMode)
  return (
    <div className='pgcr-splash-player-wrapper hover-animation'>
      <div
        className={`pgcr-splash-character-row ${activeUser} ${lastValues.completedFlag}`}
        role='button'
        onClick={() => toggleOpen()}
      >
        <div className='pgcr-splash-character-details raid-details'>
          <div className='pgcr-splash-icon' style={iconStyle}></div>
          <div className='align-left padding-left'>{username}</div>
          <div>{kills}</div>
          <div>{deaths}</div>
          <div>{assists}</div>
          <div>{lastValues.value}</div>
        </div>
      </div>
      {open ? <PlayerDropdown {...entry} /> : ''}
    </div>
  )
}

function PlayerDropdown(entry) {
  return (
    <>
      <ul className='no-margin'>
        <DropdownDataRow
          index={1}
          weaponName={'Weapon'}
          kills={'Kills:'}
          precision={'Precision:'}
        />
      </ul>
      {/* <div className='pgcr-weapon-wrapper'>
        <div></div>
        <div>Weapon</div>
        <div>Kills:</div>
        <div>Precision:</div>
      </div> */}
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
          kills={entry.extended.values.weaponKillsMelee.basic.value}
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
