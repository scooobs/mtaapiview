import { StopTimeUpdate } from "@/lib/mtaapi/getStopTimeUpdates"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import _ from "lodash"
import { DirectionOfRoute } from "./direction-of-route"
import { TrainIcon } from "@phosphor-icons/react"

interface IProps {
  route: string
  stopTimeUpdates: StopTimeUpdate[]
}
export function RouteOfStop({ route, stopTimeUpdates }: IProps) {
  const byTripHeadsign = _.chain(stopTimeUpdates)
    .groupBy((s) => s.tripHeadsign)
    .entries()
    .value()
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1 align-middle">
          <TrainIcon />
          {route} Line
        </CardTitle>
        <CardDescription>Subway Line</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {byTripHeadsign.map(([tripHeadsign, updates]) => (
            <DirectionOfRoute
              key={tripHeadsign}
              tripHeadsign={tripHeadsign}
              stopTimeUpdates={updates}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
