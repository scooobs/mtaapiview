import _ from "lodash"
import { TRIPS } from "../gen/types/trips"
import { invariant } from "@/lib/invariant"

const tripsByQueryId = _.groupBy(TRIPS, (t) => t.queryableTripId)

const FALLBACK_REGEX = /\d\d\d\d\d\d_([\w|\.]+)/

export function getTrip(query: string) {
  const maybeTrips = tripsByQueryId[query]
  if (maybeTrips != null) {
    const matched = _.first(maybeTrips)
    invariant(matched, "One must be matched at this point")
    return matched
  }
  const match = query.match(FALLBACK_REGEX)
  invariant(match, "Couldn't get the backup query extracted")
  const backupQuery = match[1]
  const backupTrip = _.find(TRIPS, (t) => t.tripId.includes(backupQuery))

  invariant(backupTrip, `Could not find trip via backup query ${backupQuery}`)
  return backupTrip
}
