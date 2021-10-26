import React, { useState, useEffect } from 'react'

import {
  DestinyHistoricalWeaponStats,
  DestinyInventoryItemDefinition,
  DestinyPostGameCarnageReportEntry,
} from 'bungie-api-ts/destiny2'
import parsePgcrData from './parsePgcrData'

import { GetActivityDefinitionUnauth } from '../../Utils/API/API_Requests'

import Melee from '../../../destiny-icons/weapons/melee.svg'
import Grenade from '../../../destiny-icons/weapons/grenade.svg'
import Super from '../../../destiny-icons/supers/arc_titan.svg'
import { PgcrTypes } from '../../Data/destinyEnums'

interface PlayerPropsInterface {
  activeUserId: string
  modeIsRaid: boolean
  entry: DestinyPostGameCarnageReportEntry
  activityMode: PgcrTypes
}

export default function Player(props: PlayerPropsInterface) {
  const { activeUserId, entry, activityMode } = props
  const pgcrData = parsePgcrData(entry, activityMode, activeUserId)
  const gridLen = `pgcr_splash_grid_${pgcrData.values.length + 1}`
  const dnf = entry.values.completed.basic.displayValue !== 'Yes'

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
          <div className={`${dnf ? 'pgcr-dnf' : ''}`}>{dnf ? 'DNF' : ''}</div>
          {pgcrData.values.map((value, index) => (
            <div key={index}>{value}</div>
          ))}
        </div>
      </div>
      {open ? <PlayerDropdown {...entry} /> : ''}
    </div>
  )
}

interface DropDownInterface {
  index: number
  weaponName: string
  kills: number
  precision: boolean | string
  iconStyle?: React.CSSProperties
  iconSvg?: JSX.Element
}

const DropdownDataRow: React.FC<DropDownInterface> = ({
  index,
  weaponName,
  kills,
  precision,
  iconStyle,
  iconSvg,
}) => (
  <li key={index} className='list-style-none margin-top-bottom'>
    <div className='pgcr-weapon-wrapper'>
      <div className='pgcr-weapon-icon' style={iconStyle as React.CSSProperties}>
        {iconSvg}
      </div>
      <div>{weaponName}</div>
      <div>{kills}</div>
      <div>{precision ? `${precision}` : ''}</div>
    </div>
  </li>
)
function PlayerDropdown(entry: DestinyPostGameCarnageReportEntry) {
  return (
    <>
      <ul className='no-margin dark-transparent-bg'>
        <DropdownDataRow index={1} weaponName={'Weapon'} kills={0} precision={'Precision:'} />
      </ul>

      <ul className='no-margin dark-transparent-bg'>
        {entry.extended.weapons?.map((w: DestinyHistoricalWeaponStats, index: number) => (
          <DisplayWeapon key={index} weaponHash={w.referenceId.toString()} index={index} w={w} />
        ))}

        {/* Add Melee, Grenade and Super kills */}
        <DropdownDataRow
          index={1}
          weaponName={'Melee'}
          iconSvg={<Melee width={32} style={{ fill: 'white' }} />}
          kills={entry.extended.values.weaponKillsMelee.basic.value}
          precision={false}
        />

        <DropdownDataRow
          index={1}
          weaponName={'Grenade'}
          iconSvg={<Grenade width={32} style={{ fill: 'white' }} />}
          kills={entry.extended.values.weaponKillsGrenade.basic.value}
          precision={false}
        />

        <DropdownDataRow
          index={1}
          weaponName={'Super'}
          iconSvg={<Super width={32} viewBox={'0 -10 50 50'} style={{ fill: 'white' }} />}
          kills={entry.extended.values.weaponKillsSuper.basic.value}
          precision={false}
        />
      </ul>
    </>
  )
}

interface DisplayWeaponInterface {
  weaponHash: string
  index: number
  w: DestinyHistoricalWeaponStats
}

function DisplayWeapon(props: DisplayWeaponInterface) {
  const { weaponHash, index, w } = props
  const [weapon, setWeapon] = useState<DestinyInventoryItemDefinition>(null)

  useEffect(() => {
    const fetchWeapon = async (hash: string) => {
      const result = await GetActivityDefinitionUnauth({
        params: { definition: 'DestinyInventoryItemDefinition', defHash: hash },
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
