import { GroupMember, SearchResultOfGroupMember, ServerResponse } from 'bungie-api-ts/groupv2'
import React, { useEffect, useState } from 'react'
// import { SearchByGlobalNamePost } from '../../Utils/API/API_Requests'
// import { GetClanAggregateStats } from '../../Utils/API/API_Requests'
import { GetMembersOfGroup } from '../../Utils/API/API_Requests'
import { convertTimestampSecsToHumanReadable } from '../../Utils/HelperFunctions/getDateTime'
import DisplayMember from './DisplayMember'

export default function ClanRoster(){
  const [clanData, setClanData] = useState<ServerResponse<SearchResultOfGroupMember>>(null)
  const [ open, setOpen ] = useState<string[]>([])

  // const playerSearch = {params: {groupId: 118535, page: 0}, method: "POST", body: JSON.stringify({displayNamePrefix: 'ChimpAhoy'})}
  const groupMembersSearch = {params: {groupId: 118535}}

  useEffect(() => {
    const fetchLikes = async () => {
      const result = await GetMembersOfGroup(groupMembersSearch)
      setClanData(result)
      }
    fetchLikes()
  }, [open])

  useEffect(() => {
    console.log('useEffect:', open)
  }, [open])

  const toggleOpen = async (id: string) => {
    console.log('Detected click:', id, open)
    let newArray = []
    if (open.includes(id))
    {
      console.log('Removing')
      newArray = open.filter((e) => e !== id)
      await setOpen(newArray)
    }
    else{
      console.log('Adding')
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


            <div key={`${index} ${open.includes(u?.destinyUserInfo?.membershipId) ? ' active' : ''}`} className='hover-animation'>
            <div
              className={`roster-character-row`}
              role='button'
              onClick={() => toggleOpen(u.destinyUserInfo.membershipId)}
            >
              <div className="roster-member-profile-wrapper">

              </div>
                <div className={`roster-user-grid`}>
                  <div className={`roster-user-online-status ${u.isOnline ? 'online' : 'offline' }`}></div>
                  <div
                    className='align-left padding-left roster-icon'
                    style={{backgroundImage: `url(https://www.bungie.net${u.bungieNetUserInfo?.iconPath || u.destinyUserInfo?.iconPath })`}} ></div>
                  <div className='align-left padding-left roster-user-item'>{u.destinyUserInfo.displayName}</div>
                  {/* <div className='align-left padding-left'>{u.destinyUserInfo.bungieGlobalDisplayName}</div> */}
                  <div className='align-left padding-left roster-user-item'>{u.destinyUserInfo.membershipType}</div>
                  <div className='align-left padding-left roster-user-item'>{u.destinyUserInfo.membershipId}</div>
                  <div className='align-left padding-left roster-user-item'>
                    {convertTimestampSecsToHumanReadable(`${u.lastOnlineStatusChange}`)}</div>
                    {/* <DisplayMember membershipType={String(u.destinyUserInfo.membershipType)} membershipId={u.destinyUserInfo.membershipId} /> */}
                </div>
              </div>
              <ExpandMember
                      membershipType={String(u.destinyUserInfo.membershipType)}
                      membershipId={u.destinyUserInfo.membershipId}
                      expanded={open.includes(u?.destinyUserInfo?.membershipId)} />
            </div>

          ))
        }

      </div>
    </section>
  )
}

interface DisplayMemberInterface {
  membershipId: string,
  membershipType: string,
  expanded: boolean,
}

function ExpandMember(props: DisplayMemberInterface) {
  const {membershipType, membershipId, expanded} = props
  if( expanded){
    console.log('ExpandMember', membershipId)
    console.log(expanded)

  }
  // const [ open, setOpen ] = useState(false)

  // const toggleOpen = () => {
  //   setOpen(!open)
  // }
  return (
    <div className={`roster-member-collapsible${expanded ? ' active' : ''}`}
      // onClick={() => toggleOpen()}
    >
    {
      expanded &&
        <DisplayMember membershipType={membershipType} membershipId={membershipId} />

    }
    </div>


  )
}
