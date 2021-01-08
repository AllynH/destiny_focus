/* eslint-disable no-nested-ternary */
import { DateTime, Duration } from 'luxon'

const DATE_UNITS = ['years', 'months', 'days', 'hours', 'minutes', 'seconds']

/*
  Get dateTime with luxon: https://stackoverflow.com/questions/53713772/displaying-time-relative-to-a-given-using-luxon-library

*/

export const getDatePlayedFromTimestamp = (timestamp) => {
  const now = DateTime.local()
  const end = DateTime.fromISO(timestamp)

  const diff = now.diff(end, DATE_UNITS).toObject()

  // return diff.years > 0 ? `${diff.years} years ago`
  //   : diff.months > 0   ? `${diff.months} months ago`
  //   : diff.days > 0     ? `${diff.days} days ago`
  //   : diff.hours > 0    ? `${diff.hours} hours ago`
  //   : diff.minutes > 0  ? `${diff.minutes} minutes ago`
  //   : `${diff.seconds} seconds ago`

  return makeTimestampHumanReadable(diff)
  }

export const makeTimestampHumanReadable = (ts) => {
  return ts.years > 0 ? `${ts.years} years ago`
    : ts.months > 0   ? `${ts.months} months ago`
    : ts.days > 0     ? `${ts.days} days ago`
    : ts.hours > 0    ? `${ts.hours} hours ago`
    : ts.minutes > 0  ? `${ts.minutes} minutes ago`
    : `${ts.seconds} seconds ago`

}
