export function getTeamName(team: string):string {
  if (team === undefined) {
    return null
  }
  if (team === "18" || team === 'Alpha'){
    return 'Alpha'
  }
  return 'Bravo'
}

export function test(){
  return true
}
