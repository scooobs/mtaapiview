import { REALTIME_SUBWAY_API_URL } from "@/lib/consts"
import { getStopTimeUpdates, parseFeedMessage } from "@/lib/mtaapi"
import { FeedMessageSchema } from "@/lib/mtaapi/gen/realtime-gtfs_pb"
import { fromBinary } from "@bufbuild/protobuf"
import _ from "lodash"

async function useSubwayDataQuery() {
  const res = await fetch(REALTIME_SUBWAY_API_URL)
  const buffer = new Uint8Array(await res.arrayBuffer())
  const decoded = fromBinary(FeedMessageSchema, buffer)
  const parsed = parseFeedMessage(decoded)
  return getStopTimeUpdates(parsed).filter((stu) => (stu.routeId = "L"))
}

export default useSubwayDataQuery
