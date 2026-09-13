import _ from "lodash"
import type { NYCTFeedMessage } from "./parseFeedMessage"
import { getServiceId } from "./getServiceId"
import { getTrip } from "./resources/trips"

export function getStopTimeUpdates(feedMessage: NYCTFeedMessage) {
  return _.chain(feedMessage.entity)
    .map((e) => e.tripUpdate)
    .compact()
    .flatMap((tripUpdate) => {
      const trip = tripUpdate.trip
      if (trip == null) {
        // There was no trip associated with this trip update
        // so we can not be certain which route this is for.
        return
      }

      const {
        nyct: { direction },
        routeId,
        tripId,
        startDate,
      } = trip

      const serviceId = getServiceId(startDate)
      const { tripHeadsign } = getTrip(tripId, serviceId)

      return tripUpdate.stopTimeUpdate.map((stu) => {
        const { arrival, departure, stopId, stopSequence } = stu
        if (arrival == null || departure == null) {
          // no arrival or departure estimates
          return
        }
        return {
          tripId,
          stopSequence,
          arrival,
          departure,
          stopId,
          direction,
          routeId,
          tripHeadsign,
        }
      })
    })
    .compact()
    .value()
}
