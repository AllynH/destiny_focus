import { DateTime, DurationObjectUnits, DurationUnits } from 'luxon'


const DATE_UNITS: DurationUnits = ['years', 'months', 'days', 'hours', 'minutes', 'seconds']

/*
  Get dateTime with luxon: https://stackoverflow.com/questions/53713772/displaying-time-relative-to-a-given-using-luxon-library

*/
/**
 *
 * @param ts : DurationObjectUnits - A luxon Type, "years, months, days, etc..."
 * @returns String "2 hours ago"
 */
export const makeTimestampHumanReadable = (ts: DurationObjectUnits) =>
/* eslint-disable no-nested-ternary */
(ts.years > 0 ? `${ts.years} years ago`
    : ts.months > 0   ? `${ts.months} months ago`
    : ts.days > 0     ? `${ts.days} days ago`
    : ts.hours > 0    ? `${ts.hours} hours ago`
    : ts.minutes > 0  ? `${ts.minutes} mins ago`
    : `${ts.seconds.toFixed(0)} seconds ago`)
/* eslint-enable no-nested-ternary */

/**
 * Date object formatted in ISO 8601.
 *  Format: 2022-05-17T22:21:11Z
 * Returns a human readable format: "2 hours ago"
 * @param timestamp : Date object formatted in ISO 8601.
 * @returns : String "2 hours ago"
 */
export const getDatePlayedFromTimestamp = (timestamp: string) => {
  const now = DateTime.local()
  const end = DateTime.fromISO(timestamp)

  const diff = now.diff(end, DATE_UNITS).toObject()

  return makeTimestampHumanReadable(diff)
  }

/**
 * Convert the time in seconds to an ISO 8601 object.
   then convert this to a human readable time format
 * @param timestamp : String the time in seconds
 * @returns String "2 hours ago"
 */
export const convertTimestampSecsToHumanReadable = (timestamp: string) => {
  const myDate = new Date(Number(timestamp) * 1000).toISOString()
  const humanReadableTime = getDatePlayedFromTimestamp(myDate)
  return humanReadableTime

}

export const getDayMonthYear = (inputDate: Date) => {
  const dateToConvert = new Date(inputDate)
  // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  return dateToConvert.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

}
