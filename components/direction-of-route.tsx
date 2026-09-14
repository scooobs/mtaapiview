import { StopTimeUpdate } from "@/lib/mtaapi/getStopTimeUpdates"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import _, { now } from "lodash"

interface IProps {
  tripHeadsign: string
  stopTimeUpdates: StopTimeUpdate[]
}

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

export function DirectionOfRoute({ tripHeadsign, stopTimeUpdates }: IProps) {
  const now = Math.round(_.now() / 60000)
  const closestUpdates = _.chain(stopTimeUpdates)
    .orderBy((u) => u.arrival.time, "asc")
    // .take(3)
    .map((u) =>
      rtf.format(Math.round(Number(u.arrival.time) / 60 - now), "minutes")
    )
    .value()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Headed to {tripHeadsign}</CardTitle>
        <CardDescription>Direction</CardDescription>
      </CardHeader>
      <CardContent>Arriving {closestUpdates.join(", ")}</CardContent>
    </Card>
  )
}
