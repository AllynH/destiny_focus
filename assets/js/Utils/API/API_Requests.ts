/* eslint-disable max-len */


const BUNGIE_API_KEY = process.env.DF_BUNGIE_API_KEY
const ORIGIN_HEADER = process.env.DF_ORIGIN_HEADER

export const bungieBaseUrl = 'https://www.bungie.net/Platform/Destiny2'
export const bungieBaseStatsUrl = 'https://stats.bungie.net/Platform/Destiny2'
export const bungieNetUrl = 'https://www.bungie.net/'


// No return await fetch: https://eslint.org/docs/rules/no-return-await
// Use async await with React: https://www.valentinog.com/blog/await-react/
async function apiRequest(url: string, options: RequestInit = {}) {
  return fetch(url, options).then((res) => res.json())
}


async function apiRequestWithHeaders(url: string, options: RequestInit = {}) {

  const fetchHeaders = { headers: {
    'Origin': ORIGIN_HEADER,
    'X-API-Key': BUNGIE_API_KEY,
  }}

  const updatedOptions = {...options, ...fetchHeaders}

  return fetch(url, updatedOptions).then((res) => res.json())

}

export const GetActivityHistory = async (options: BungieRequestInit) => apiRequest(`/auth/get/get_activity_history/${options.params.membershipType}/${options.params.membershipId}/${options.params.characterId}/?game_mode=${options.params.gameMode}&count=${options.params.count}`, {
  ...options,
})

interface BungieRequestInit extends RequestInit {
  params: {
    activityId?: string,
    activityName?: string,
    definition?: string,
    defHash?: string;
    characterId?: string,
    gameMode?: number,
    membershipId?: string,
    membershipType?: string,
    season?: string,
    count?: number,
    groupId?: number,
    page?: number,
  },
}

export const GetStatsData = async (options: BungieRequestInit) => apiRequest(
  `/auth/get/historical_stats/${options.params.membershipType}/${options.params.membershipId}/${options.params.characterId}/?game_mode=${options.params.gameMode}&season=${options.params.season}`,
  {
    ...options,
  },
)

export const GetStatsAllTime = async (options: BungieRequestInit) => apiRequest(
  `/auth/get/historical_stats_alltime/${options.params.membershipType}/${options.params.membershipId}/${options.params.characterId}/?game_mode=${options.params.gameMode}`,
  {
    ...options,
  },
)

export const GetPGCR = async (options: BungieRequestInit) => apiRequest(`/auth/get/pgcr/${options.params.activityId}`, {
  ...options,
})

/*
  https://bungie-net.github.io/#Destiny2.GetPostGameCarnageReport
  /Destiny2/Stats/PostGameCarnageReport/
*/
// export const GetPGCRUnauth = async (options) => apiRequest(`/get/pgcr/${options.params.activityId}`, {
//   ...options,
// })

export const GetActivityDefinition = async (options: BungieRequestInit) => apiRequest(`/auth/get/manifest/${options.params.definition}/${options.params.defHash}/`, {
  ...options,
})
export const GetActivityDefinitionUnauth = async (options: BungieRequestInit) => apiRequest(`/get/manifest/${options.params.definition}/${options.params.defHash}/`, {
  ...options,
})

export const GetPGCRList = async (options: BungieRequestInit) => apiRequest(
  `/auth/get/pgcr_list/${options.params.membershipType}/${options.params.membershipId}/${options.params.characterId}/?game_mode=${options.params.activityName}`,
  {
    ...options,
  },
)

export const GetCharacters = async (options: BungieRequestInit) => apiRequest('/auth/get/get_characters/', {
  ...options,
})

// export const GetProfile = async (options: BungieRequestInit) => apiRequest('/auth/get/get_profile', {
//   ...options,
// })

export const GetProfileWithArgs = async (options: BungieRequestInit) => apiRequest(`/auth/get/get_profile/?membershipType=${options.params.membershipType}&membershipId=${options.params.membershipId}`, {
  ...options,
})

export const GetCharactersWithArgs = async (options: BungieRequestInit) => apiRequest(`/auth/get/get_characters/?membershipType=${options.params.membershipType}&membershipId=${options.params.membershipId}`, {
  ...options,
})

export const GetCurrentBungieAccount = async (options: BungieRequestInit) => apiRequest('/auth/get/get_current_bungie_account/', {
  ...options,
})

export const GetUserPGCRList = async () => apiRequest('/auth/get/pgcr_list', {
})

export const PutPGCR = async (options: BungieRequestInit) => apiRequest(`/auth/put/pgcr/${options.params.activityId}`, {
  ...options,
})

export const DeletePGCR = async (options: BungieRequestInit) => apiRequest(`/auth/delete/pgcr/${options.params.activityId}`, {
  ...options,
})

export const ViewUserData = async () => apiRequest(`/auth/get/user_count/`, {
})

export const ViewManifestData = async () => apiRequest(`/auth/get/manifest_data/`, {
})


/*
  Bungie API requests - bypass Destiny-Focus servers:
*/

export const GetPGCRUnauth = async (options: BungieRequestInit) => apiRequestWithHeaders(`${bungieBaseStatsUrl}/Stats/PostGameCarnageReport/${options.params.activityId}/`, {
  ...options,
})

export const GetClanAggregateStats = async (options: BungieRequestInit) => apiRequestWithHeaders(`${bungieBaseStatsUrl}/Stats/AggregateClanStats/${options.params.groupId}/`, {
  ...options,
})

export const GetMembersOfGroup = async (options: BungieRequestInit) => apiRequestWithHeaders(`${bungieNetUrl}/Platform/GroupV2/${options.params.groupId}/members/`, {
  ...options,
})

// https://www.bungie.net/Platform/GroupV2/User/2/4611686018436136301/0/1/
// membershipType /  membershipId / filter / groups
export const GetGroupsForMember = async (options: BungieRequestInit) => apiRequestWithHeaders(`${bungieNetUrl}/Platform/GroupV2/User/${options.params.membershipType}/${options.params.membershipId}/0/1`, {
  ...options,
})

export const GetGroup = async (options: BungieRequestInit) => apiRequestWithHeaders(`${bungieNetUrl}/Platform/GroupV2/${options.params.groupId}/`, {
  ...options,
})

export const SearchByGlobalNamePost = async (options: BungieRequestInit) => apiRequestWithHeaders(`${bungieNetUrl}Platform/GroupV2/User/Search/GlobalName/${options.params.page}/`, {
  ...options,
})


