import { invariant } from "@/lib/invariant"

// stop_id,stop_name,stop_lat,stop_lon,location_type,parent_station
export interface Stop {
  stopId: string
  stopName: string
  stopLat: number
  stopLon: number
  locationType: string | undefined
  parentStation: string | undefined
}

export function createStop(line: string): Stop {
  const [stopId, stopName, stopLat, stopLon, locationType, parentStation] =
    line.split(",")
  invariant(
    stopId && stopName && stopLat && stopLon,
    "Required stop fields were not all there"
  )
  return {
    stopId,
    stopName,
    stopLat: parseFloat(stopLat),
    stopLon: parseFloat(stopLat),
    locationType: blank(locationType),
    parentStation: blank(parentStation),
  }
}

const blank = (val: string | undefined) => (val?.length === 0 ? undefined : val)
