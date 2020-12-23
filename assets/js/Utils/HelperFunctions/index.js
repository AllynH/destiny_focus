export function getUrlDetails() {
  const pathArray = window.location.pathname.split('/');
  const url = {
    auth: pathArray[1],
    gameMode: pathArray[2],
    membershipType: pathArray[3],
    membershipId: pathArray[4],
    characterId: pathArray[5],
  }
  // console.log(window.location.pathname)
  // console.log(pathArray)
  // console.log(url)
  return url
}

export const ACCOUNTTYPES = {
  0: 'None',
  1: 'Xbox',
  2: 'PlayStation',
  3: 'Steam',
  4: 'Blizzard',
  5: 'Stadia',
  10: 'TigerDeamon',
  254: 'BungieNext',
  all: 'All',
}
