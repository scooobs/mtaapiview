import _ from "lodash"
import { createStop } from "./stops"
import { createTrip } from "./trips"
import { invariant } from "@/lib/invariant"

const STATIC_GTFS_SUBWAY_DIR = "lib/mtaapi/static/gtfs_subway"
const GEN_OUTPUT_DIR = "lib/mtaapi/gen/types"

/* --------------------- STOPS --------------------- */
{
  const STOPS_INPUT = "stops.txt"
  const STOPS_OUTPUT = "stops.ts"

  const stopsInputFile = Bun.file(`${STATIC_GTFS_SUBWAY_DIR}/${STOPS_INPUT}`)
  const contents = await stopsInputFile.text()
  const [_header, ...lines] = contents.trim().split("\n")

  const stops = lines.map(createStop)
  const out = `export const STOPS = [
${stops
  .map(
    ({ stopId, stopName, stopLat, stopLon, parentStation }) => `{
    stopId: "${stopId}",
    stopName: "${stopName}",
    parentStation: ${parentStation != null ? `"${parentStation}"` : "undefined"}
}`
  )
  .join(",\n")}
] as const;`

  invariant(
    _.uniqBy(stops, (s) => s.stopId).length === stops.length,
    "There were duplicate stopIds"
  )
  const stopsOutputFile = Bun.file(`${GEN_OUTPUT_DIR}/${STOPS_OUTPUT}`)
  stopsOutputFile.write(out)
}

/* --------------------- TRIPS --------------------- */
{
  const TRIPS_INPUT = "trips.txt"
  const TRIPS_OUTPUT = "trips.ts"

  const tripsInputFile = Bun.file(`${STATIC_GTFS_SUBWAY_DIR}/${TRIPS_INPUT}`)
  const contents = await tripsInputFile.text()
  const [_header, ...lines] = contents.trim().split("\n")

  const trips = lines.map(createTrip)
  const out = `export const TRIPS = [
${trips
  .map(
    ({
      routeId,
      tripId,
      queryableTripId,
      serviceId,
      tripHeadsign,
      directionId,
      shapeId,
    }) => `{
    routeId: "${routeId}",
    tripId: "${tripId}",
    queryableTripId: "${queryableTripId}",
    serviceId: "${serviceId}",
    tripHeadsign: "${tripHeadsign}",
    directionId: "${directionId}",
    shapeId: "${shapeId}"
}`
  )
  .join(",\n")}
]`

  invariant(
    _.uniqBy(trips, (s) => s.tripId).length === trips.length,
    "There were duplicate tripIds"
  )

  const stopsOutputFile = Bun.file(`${GEN_OUTPUT_DIR}/${TRIPS_OUTPUT}`)
  stopsOutputFile.write(out)
}
