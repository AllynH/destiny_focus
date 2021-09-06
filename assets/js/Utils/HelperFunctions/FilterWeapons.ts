import { WEAPON_TYPES, WeaponTypeList } from '../../Data/destinyEnums'

// TODO: Replace weapDefObj with Destiny Tyes:
interface WeaponDefinitionInterface {
  [x: string]: { 
    inventory: {bucketTypeHash: number},
    hash: number,
  }
}

export const filterWeaponDefList = (weapDefObj: WeaponDefinitionInterface, filter: WeaponTypeList = 'kinetic'): any => {
  /*
      Filters wepDefObj for weapons of a given bucketTypeHash.
      Hashes are:
        kinetic
        energy
        power
    */   
  const wepHash: number = WEAPON_TYPES[filter]
  const filtered = Object.keys(weapDefObj)
    .filter((hash) => weapDefObj[hash].inventory.bucketTypeHash === wepHash)
    .reduce((accumulator: any, hash: string) => {
      accumulator[hash] = weapDefObj[hash]
      return accumulator
    }, {})
  return filtered
}

// eslint-disable-next-line no-unused-vars
export const filterWeaponDefListByHash = (
  weapDefObj: WeaponDefinitionInterface,
  filter: WeaponTypeList = 'kinetic',
  selectedHash: number = 1364093401,
): any => {
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
    .reduce((accumulator:any, hash) => {
      accumulator[hash] = weapDefObj[hash]
      return accumulator
    }, {})
  return filtered
}
