import React, { ChangeEvent, useEffect, useState } from "react";

import { ServerResponse } from "bungie-api-ts/common";
import { UserSearchResponse } from "bungie-api-ts/user";
import { DestinyLinkedProfilesResponse } from "bungie-api-ts/destiny2";

import { GetLinkedProfiles, SearchByGlobalNamePost } from "../../Utils/API/API_Requests";
import DisplayMember from "../Clan/DisplayMember";

import './style.css'
import ViewLinkedProfile from "./ViewLinkedAccount";
import ViewUserSearch from "./ViewUserSearch";

// TODO: Remove the hardcoded user index: [0]
// TODO: Add a debounce for state changes.
export default function Search() {

  const [ searchResult, setSearchResult ] = useState<ServerResponse<UserSearchResponse>> (null)
  const [ linkedProfile, setLinkedProfile ] = useState<ServerResponse<DestinyLinkedProfilesResponse>>(null)
  const [ foundAccount, setFoundAccount ] = useState(false)
  const [ foundMultipleAccount, setFoundMultipleAccount ] = useState(false)
  const [ foundLinkedAccount, setFoundLinkedAccount ] = useState(false)
  const [ inputValue, setInputValue ] = useState<string>('')

  // Find a users Bungie account:
  useEffect(() => {
    const fetchSearch = async () => {
      const result = await SearchByGlobalNamePost({
        jsonData: {
          displayNamePrefix: inputValue,
        },
        params: { page: 0,}
      })
      setSearchResult(result)
      // console.log('SearchByGlobalNamePost:')
      // console.log(result)
      setFoundAccount(searchResult && searchResult?.Response?.searchResults?.length === 1)
    }
    if (inputValue.length > 0) {
      fetchSearch()
    }
  }, [inputValue])

  // Handle setting flags for both search results:
  useEffect(() => {
    setFoundAccount(searchResult &&
                      searchResult?.Response?.searchResults?.length >= 1 &&
                      inputValue.toLowerCase() === searchResult.Response.searchResults[0].bungieGlobalDisplayName.toLowerCase())
    setFoundMultipleAccount(searchResult && searchResult?.Response?.searchResults?.length > 1)
    setFoundLinkedAccount(linkedProfile && linkedProfile?.ErrorCode === 1)
    if (!foundAccount) {
      setLinkedProfile(null)
    }
  }, [searchResult, linkedProfile, inputValue])

  // Search for the found users linked Destiny account:
  useEffect(() => {
    const fetchGetLinkedProfiles = async () => {
      const result = await GetLinkedProfiles({
        params: {
          membershipType: '254',
          membershipId: searchResult.Response.searchResults[0].bungieNetMembershipId,
        },
      })
      setLinkedProfile(result)
      // console.log('GetLinkedProfiles:')
      // console.log(result)
    }
    if (foundAccount) {
      fetchGetLinkedProfiles()
    }
  }, [foundAccount])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim())
  }

  return (
    <section className='search-container'>
      <h1>Search for a player:</h1>
      <div className='background-dark-container search-results-wrapper'>
        <div className='search-box-wrapper'>
          <div className="profile-sub-heading">Enter username:</div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <input
              autoFocus
              spellCheck={false}
              className='search-box-input'
              type='text'
              onChange={onChange}
              placeholder={'BungieNetName#1234'}
            />
          </form>
        </div>
        <div className='search-results'>
        {foundAccount && foundLinkedAccount && (
            <><ViewUserSearch destinyMemberships={searchResult.Response.searchResults[0].destinyMemberships} /><ViewLinkedProfile profile={linkedProfile} /></>
          )}
          {foundMultipleAccount && (
            <div className="profile-warning-label">Found {searchResult?.Response?.searchResults?.length} accounts - displaying first match!</div>
          )}
        </div>
      </div>
      <div className='background-dark-container search-results-wrapper justify-center'>

        <div className='list-accounts'>
          {foundAccount && foundLinkedAccount ? (
            <DisplayMember
              membershipId={linkedProfile.Response.profiles[0].membershipId}
              membershipType={String(linkedProfile.Response.profiles[0].membershipType)}
            />
          ) : (
            <div className="profile-sub-heading">
            Search for a user to view their linked accounts.
          </div>
          )}
        </div>
      </div>
    </section>
  )
}
