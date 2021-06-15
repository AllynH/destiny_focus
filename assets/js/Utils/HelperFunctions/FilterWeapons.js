import { WEAPON_TYPES } from '../../Data/destinyEnums'

export const filterWeaponDefList = (weapDefObj, filter = 'kinetic') => {
  /*
      Filters wepDefObj for weapons of a given bucketTypeHash.
      Hashes are:
        kinetic
        energy
        power
    */
  const wepHash = WEAPON_TYPES[filter]
  const filtered = Object.keys(weapDefObj)
    .filter((hash) => weapDefObj[hash].inventory.bucketTypeHash === wepHash)
    .reduce((accumulator, hash) => {
      accumulator[hash] = weapDefObj[hash]
      return accumulator
    }, {})
  return filtered
}

// eslint-disable-next-line no-unused-vars
export const filterWeaponDefListByHash = (
  weapDefObj,
  filter = 'kinetic',
  selectedHash = 1364093401,
) => {
  /*
      Filters wepDefObj for weapons of a given bucketTypeHash.
      Hashes are:
        kinetic
        energy
        power
    */
  const wepHash = WEAPON_TYPES[filter]
  const filtered = Object.keys(weapDefObj)
    .filter((hash) => weapDefObj[hash].inventory.bucketTypeHash === wepHash)
    .filter((hash) => weapDefObj[hash].hash === selectedHash)
    .reduce((accumulator, hash) => {
      accumulator[hash] = weapDefObj[hash]
      return accumulator
    }, {})
  return filtered
}
