/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */

// No return await fetch: https://eslint.org/docs/rules/no-return-await
// Use async await with React: https://www.valentinog.com/blog/await-react/
async function apiRequest(url, options = {}) {
  return fetch(url, options).then((res) => res.json())
}

export const GetPVPData = async (options) => apiRequest(`/auth/get/pvp/${options.params.membershipType}/${options.params.membershipId}`, {
  ...options,
})

export const GetGambitData = async (options) => apiRequest(`/auth/get/gambit/${options.params.membershipType}/${options.params.membershipId}`, {
  ...options,
})

export const GetRaidData = async (options) => apiRequest(`/auth/get/raid/${options.params.membershipType}/${options.params.membershipId}`, {
  ...options,
})

export const GetStatsData = async (options) => apiRequest(
  `/auth/get/historical_stats/${options.params.membershipType}/${options.params.membershipId}`,
  {
    ...options,
  },
)

export const GetStatsAllTime = async (options) => apiRequest(
  `/auth/get/historical_stats_alltime/${options.params.membershipType}/${options.params.membershipId}`,
  {
    ...options,
  },
)

export const GetPGCR = async (options) => apiRequest(`/auth/get/pgcr/${options.params.activityId}`, {
  ...options,
})

export const GetActivityDefinition = async (options) => apiRequest(`/auth/get/manifest/${options.params.definition}/${options.params.defHash}`, {
  ...options,
})

export const GetPGCRList = async (options) => apiRequest(
  `/auth/get/pgcr_list/${options.params.membershipType}/${options.params.membershipId}/?game_mode=${options.params.gameMode}`,
  {
    ...options,
  },
)