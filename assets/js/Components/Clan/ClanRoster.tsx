import React, { useEffect, useState } from 'react'
import { GroupMember, SearchResultOfGroupMember, ServerResponse } from 'bungie-api-ts/groupv2'

// import { GetClanAggregateStats } from '../../Utils/API/API_Requests'
import { GetMembersOfGroup } from '../../Utils/API/API_Requests'
import { convertTimestampSecsToHumanReadable } from '../../Utils/HelperFunctions/getDateTime'
import DisplayMember from './DisplayMember'
import PlatformIcon from '../CharacterSelect/PlatformIcon'

interface ClanRosterInterface {
  groupId: number
}

export default function ClanRoster(props: ClanRosterInterface){
  const { groupId } = props
  const [clanData, setClanData] = useState<ServerResponse<SearchResultOfGroupMember>>(null)
  const [ open, setOpen ] = useState<string[]>([])

  // const playerSearch = {params: {groupId: 118535, page: 0}, method: "POST", body: JSON.stringify({displayNamePrefix: 'ChimpAhoy'})}
  const groupMembersSearch = {params: {groupId}}

  useEffect(() => {
    const fetchGetMembersOfGroup = async () => {
      const result = await GetMembersOfGroup(groupMembersSearch)
      setClanData(result)
      // console.log('GetMembersOfGroup')
      // console.log(result)
      }
      fetchGetMembersOfGroup()
  }, [open])


  useEffect(() => {
    setOpen(open)
  }, [open])


  const toggleOpen = async (id: string) => {
    // console.log('Detected click:', id, open)
    let newArray = []
    if (open.includes(id))
    {
      // console.log('Removing')
      newArray = open.filter((e) => e !== id)
      await setOpen(newArray)
    }
    else{
      // console.log('Adding')
      newArray =[...open, id]
      await setOpen(newArray)
    }
  }

  return(
    <section className="clan-roster-container">
      <div className='clan-roster-wrapper'>

        { clanData &&
          clanData.Response.results
            .sort((a: GroupMember, b: GroupMember) => (Number(b.lastOnlineStatusChange) - Number(a.lastOnlineStatusChange)))
            .map((u: GroupMember, index: number) => (
              <div key={index}>

              <div className={'hover-animation'}>
              <div
                className={`roster-character-row`}
                role='button'
                onClick={() => toggleOpen(u.destinyUserInfo.membershipId)}
              >
                <div className="roster-member-profile-wrapper"></div>
                <div className={`roster-user-grid`}>
                  <div className={`roster-user-online-status ${u.isOnline ? 'online' : 'offline' }`}></div>
                  <div
                    className='align-left padding-left roster-icon'
                    style={{backgroundImage: `url(https://www.bungie.net${u.bungieNetUserInfo?.iconPath || u.destinyUserInfo?.iconPath })`}} ></div>
                    <div className="roster-user-name-wrap">
                      <div className='align-left padding-left roster-user-item'>{u.destinyUserInfo.displayName}</div>
                      <div className='roster-user-bungie-name-code'>
                        {`${u.bungieNetUserInfo?.bungieGlobalDisplayNameCode ?  ['#', u.bungieNetUserInfo?.bungieGlobalDisplayNameCode].join('') : ''}`}
                        </div>
                    </div>
                  <PlatformIcon membershipType={String(u.destinyUserInfo.membershipType)} />
                  <div className='align-left padding-left roster-user-item'>{/* Placeholder */}</div>
                  <div className='align-left padding-left roster-user-item'>{/* Placeholder */}</div>
                  <div className='align-left padding-left roster-user-item'>
                    {convertTimestampSecsToHumanReadable(`${u.lastOnlineStatusChange}`)}</div>
                </div>
              </div>
            </div>
            <ExpandMember
              membershipType={String(u.destinyUserInfo.membershipType)}
              membershipId={u.destinyUserInfo.membershipId}
              expanded={open.includes(u?.destinyUserInfo?.membershipId)}
            />

              </div>

          ))
        }

      </div>
    </section>
  )
}

interface DisplayMemberInterface {
  membershipId: string
  membershipType: string
  expanded: boolean
}

function ExpandMember(props: DisplayMemberInterface) {
  const { membershipType, membershipId, expanded } = props

  return (
    <div className={`roster-member-collapsible${expanded ? ' active' : ''}`}>
      {expanded && <DisplayMember membershipType={membershipType} membershipId={membershipId} />}
    </div>
  )
}
