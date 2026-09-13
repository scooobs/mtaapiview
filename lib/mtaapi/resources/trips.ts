import _ from "lodash"
import { TRIPS } from "../gen/types/trips"
import { invariant } from "@/lib/invariant"

const tripsByQueryId = _.groupBy(TRIPS, (t) => t.queryableTripId)

export function getTrip(query: string, serviceId?: string) {
  const maybeTrips = tripsByQueryId[query]
  invariant(maybeTrips, `Could not find trip via query ${query}`)
  if (serviceId) {
    const withMatchingService = maybeTrips.filter((mt) =>
      mt.serviceId.includes(serviceId)
    )
    const matched = _.first(withMatchingService)
    if (matched != null) {
      return matched
    }
  }
  const matched = _.first(maybeTrips)
  invariant(matched, "One must be matched at this point")
  return matched
}
