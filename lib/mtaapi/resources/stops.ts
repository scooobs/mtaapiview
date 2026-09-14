import _ from "lodash"
import { STOPS } from "../gen/types/stops"
import { invariant } from "@/lib/invariant"

export type Stop = (typeof STOPS)[number]
export type StopId = Stop["stopId"]
export type StopName = Stop["stopName"]

export const STOP_NAMES = _.uniq(STOPS.map((s) => s.stopName))

export function getStopIds(stopName: StopName) {
  return _.filter(STOPS, (s) => s.stopName === stopName).map((e) => e.stopId)
}
export function getStopName(stopId: string) {
  const stopName = _.find(STOPS, (s) => s.stopId === stopId)?.stopName
  invariant(stopName, "invalid stop id")
  return stopName
}
