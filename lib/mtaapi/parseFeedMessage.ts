/**
 * Helpers to supplement a GTFS Feed Message with all the NYC Transit
 * extensions.
 */

import { getExtension, hasExtension } from "@bufbuild/protobuf"
import type {
  FeedEntity,
  FeedHeader,
  FeedMessage,
  TripDescriptor,
  TripUpdate,
  TripUpdate_StopTimeUpdate,
  VehiclePosition,
} from "@/lib/mtaapi/gen/realtime-gtfs_pb"
import {
  nyct_feed_header,
  nyct_stop_time_update,
  nyct_trip_descriptor,
} from "@/lib/mtaapi/gen/nyct_pb"
import { invariant } from "@/lib/invariant"
import _ from "lodash"

export function parseFeedMessage(feedMessage: FeedMessage) {
  return {
    ...feedMessage,
    header: parseFeedHeader(feedMessage.header),
    entity: [...feedMessage.entity.map(parseEntity)],
  }
}
export type NYCTFeedMessage = ReturnType<typeof parseFeedMessage>

function parseEntity(feedEntity: FeedEntity) {
  const tripUpdate = parseTripUpdate(feedEntity.tripUpdate)
  const vehicle = parseVehicle(feedEntity.vehicle)
  return {
    ...feedEntity,
    tripUpdate,
    vehicle,
  }
}

function parseFeedHeader(feedHeader: FeedHeader | undefined) {
  if (feedHeader == null) {
    return
  }
  const isExtended = hasExtension(feedHeader, nyct_feed_header)
  invariant(
    isExtended,
    "FeedHeader was not using the NYCT Feed Header Extension"
  )
  const nyctFeedHeader = getExtension(feedHeader, nyct_feed_header)

  return { ...feedHeader, nyct: nyctFeedHeader }
}

function parseTripUpdate(tripUpdate: TripUpdate | undefined) {
  if (tripUpdate == null) {
    return
  }

  const trip = parseTripDescriptor(tripUpdate.trip)
  const stopTimeUpdate = tripUpdate.stopTimeUpdate.map(parseStopTimeUpdate)
  return {
    ...tripUpdate,
    trip,
    stopTimeUpdate,
  }
}

function parseTripDescriptor(tripDescriptor: TripDescriptor | undefined) {
  if (tripDescriptor == null) {
    return
  }
  const isExtended = hasExtension(tripDescriptor, nyct_trip_descriptor)
  invariant(
    isExtended,
    "TripDescriptor was not using the NYCT Trip Descriptor Extension"
  )
  const nyctTripDescriptor = getExtension(tripDescriptor, nyct_trip_descriptor)
  return {
    ...tripDescriptor,
    nyct: nyctTripDescriptor,
  }
}

function parseStopTimeUpdate(stopTimeUpdate: TripUpdate_StopTimeUpdate) {
  const isExtended = hasExtension(stopTimeUpdate, nyct_stop_time_update)
  invariant(
    isExtended,
    "TripUpdate_StopTimeUpdate was not using the NYCT Trip Update Stop Time Update Extension"
  )
  const nyctTripUpdate_StopTimeUpdate = getExtension(
    stopTimeUpdate,
    nyct_stop_time_update
  )
  return {
    ...stopTimeUpdate,
    nyct: nyctTripUpdate_StopTimeUpdate,
  }
}

function parseVehicle(vehicle: VehiclePosition | undefined) {
  if (vehicle == null) {
    return
  }
  const trip = parseTripDescriptor(vehicle.trip)
  return {
    ...vehicle,
    trip,
  }
}
