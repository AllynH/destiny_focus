import React from 'react'
import { GroupV2 } from 'bungie-api-ts/groupv2'
import { getDayMonthYear } from '../../Utils/HelperFunctions/getDateTime'

interface ClanDetailsInterface {
  group: GroupV2
}

export default function ClanDetails(props: ClanDetailsInterface) {
  const { group } = props
  return (
    <div className='clan-details-wrapper'>
      <h1 className='clan-details-heading'>{group.name}</h1>
      <div className='clan-details-title'>
        <i>{group.motto}</i>
      </div>
      <div className='clan-details-title-value-wrap'>
        <div className='clan-details-title'>Founded</div>
        <div className='clan-details-value'>{getDayMonthYear(new Date(group.creationDate))}</div>
      </div>
      <div className='clan-details-title-value-wrap'>
        <div className='clan-details-title'>Members</div>
        <div className='clan-details-value'>{group.memberCount}</div>
      </div>
      <div className='clan-details-title-value-wrap'>
        <div className='clan-details-title'>About</div>
        <div className='clan-details-value'>{group.about}</div>
      </div>
    </div>
  )
}
