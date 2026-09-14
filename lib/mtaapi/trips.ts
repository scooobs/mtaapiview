import { invariant } from "@/lib/invariant"

// route_id,trip_id,service_id,trip_headsign,direction_id,shape_id
export interface Trip {
  routeId: string
  tripId: string
  queryableTripId: string // the trip id as represented in a Stop Time Update
  serviceId: string
  tripHeadsign: string
  directionId: string
  shapeId: string | undefined
}

const TRIP_ID_REGEX = /_(\d\d\d\d\d\d_\w[\w|\.]+\w)\w\w\w$/

export function createTrip(line: string): Trip {
  const [routeId, tripId, serviceId, tripHeadsign, directionId, shapeId] =
    line.split(",")
  invariant(
    routeId && tripId && serviceId && tripHeadsign && directionId && shapeId
  )

  const match = tripId.match(TRIP_ID_REGEX)
  invariant(match)
  // The Queryable Trip ID is not unique, and should be used
  // as a quick index into all trips. It is not guaranteed that
  // a realtime Trip ID will match a static Trip ID and partial
  // matches are treated as appropriate.
  const queryableTripId = match[1]
  invariant(queryableTripId)

  return {
    routeId,
    tripId,
    serviceId,
    tripHeadsign,
    directionId,
    shapeId,
    queryableTripId,
  }
}
