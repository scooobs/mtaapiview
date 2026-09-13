import _ from "lodash";
import { STOPS } from "../gen/types/stops";

export type Stop = (typeof STOPS)[number];
export type StopId = Stop["stopId"];
export type StopName = Stop["stopName"];

export function getStopIds(stopName: StopName) {
  return _.filter(STOPS, (s) => s.stopName === stopName).map((e) => e.stopId);
}
