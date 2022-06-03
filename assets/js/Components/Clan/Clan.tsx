import React, { useEffect, useState } from 'react'
import { GetGroupsForMember } from '../../Utils/API/API_Requests'
import { getUrlDetails } from '../../Utils/HelperFunctions'
import ClanDetails from './ClanDetails'
import ClanRoster from './ClanRoster'
import ClanBanner from '../../../destiny-icons/general/clan.svg'


export default function Clan() {
  const { membershipType, membershipId } = getUrlDetails()

  const [groups, setGroups] = useState(null)

  useEffect(() => {
    const fetchLikes = async () => {
      const result = await GetGroupsForMember({
        params: {
          membershipId,
          membershipType,
          // characterId,
        },
      })
      setGroups(result)
      // console.log('groups:')
      // console.log(result)
    }
    fetchLikes()
  }, [membershipType, membershipId])

  return (
    <section className='clan-section-wrapper'>
      <div className="clan-banner">
        <ClanBanner
          className='clan-icon'
          width={300}
          height={300}
          // viewBox={'0 0 188 192'}
/>
        </div>
      <div className='clan-wrapper'>
        {groups?.Response?.results[0]?.group.groupId
        ? <ClanDetails group={groups?.Response.results[0].group} />
        : <div>No clan found...</div>
        }
      </div>
      <div className='roster-wrapper'>
        {groups?.Response && (
          <ClanRoster groupId={Number(groups?.Response.results[0].group.groupId)} />
        )}
      </div>
    </section>
  )
}
