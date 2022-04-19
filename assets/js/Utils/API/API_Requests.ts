/* eslint-disable max-len */


const BUNGIE_API_KEY = process.env.DF_BUNGIE_API_KEY
const ORIGIN_HEADER = process.env.DF_ORIGIN_HEADER

export const bungieBaseUrl = 'https://www.bungie.net/Platform/Destiny2/'
export const bungieBaseStatsUrl = 'https://stats.bungie.net/Platform/Destiny2/'


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

  console.log(url, updatedOptions)
  console.log(BUNGIE_API_KEY)
  return fetch(url, updatedOptions).then((res) => res.json())

}

export const GetPVPData = async (options: BungieRequestInit) => apiRequest(`/auth/get/pvp/${options.params.membershipType}/${options.params.membershipId}/${options.params.characterId}/`, {
  ...options,
})

export const GetGambitData = async (options: BungieRequestInit) => apiRequest(`/auth/get/gambit/${options.params.membershipType}/${options.params.membershipId}/${options.params.characterId}/`, {
  ...options,
})

export const GetRaidData = async (options: BungieRequestInit) => apiRequest(`/auth/get/raid/${options.params.membershipType}/${options.params.membershipId}/${options.params.characterId}/?game_mode=${options.params.gameMode}`, {
  ...options,
})

interface BungieRequestInit extends RequestInit {
  params: {
    activityId?: string,
    definition?: string,
    defHash?: string;
    characterId?: string,
    gameMode?: number,
    membershipId?: string,
    membershipType?: string,
    season?: string,
  }
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

export const GetPGCRUnauth = async (options: BungieRequestInit) => apiRequestWithHeaders(`${bungieBaseStatsUrl}/Stats/PostGameCarnageReport/${options.params.activityId}/`, {
  ...options,
})

export const GetActivityDefinition = async (options: BungieRequestInit) => apiRequest(`/auth/get/manifest/${options.params.definition}/${options.params.defHash}/`, {
  ...options,
})
export const GetActivityDefinitionUnauth = async (options: BungieRequestInit) => apiRequest(`/get/manifest/${options.params.definition}/${options.params.defHash}/`, {
  ...options,
})

export const GetPGCRList = async (options: BungieRequestInit) => apiRequest(
  `/auth/get/pgcr_list/${options.params.membershipType}/${options.params.membershipId}/${options.params.characterId}/?game_mode=${options.params.gameMode}`,
  {
    ...options,
  },
)

export const GetCharacters = async (options: BungieRequestInit) => apiRequest('/auth/get/get_characters/', {
  ...options,
})

export const GetProfile = async (options: BungieRequestInit) => apiRequest('/auth/get/get_profile', {
  ...options,
})

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
