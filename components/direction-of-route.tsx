import { StopTimeUpdate } from "@/lib/mtaapi/getStopTimeUpdates"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import _, { now } from "lodash"
import { ArrowCircleDownIcon, ArrowCircleUpIcon } from "@phosphor-icons/react"
import { NyctTripDescriptor_Direction } from "@/lib/mtaapi/gen/nyct_pb"

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
  const direction = getDirectionParts(_.first(stopTimeUpdates)?.direction!)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Headed to {tripHeadsign}</CardTitle>
        <CardDescription className="flex flex-row items-center gap-1 align-middle">
          {direction.icon}
          {direction.text}
        </CardDescription>
      </CardHeader>
      <CardContent>Arriving {closestUpdates.join(", ")}</CardContent>
    </Card>
  )
}

function getDirectionParts(direction: NyctTripDescriptor_Direction) {
  if (direction === 1) {
    return {
      icon: <ArrowCircleUpIcon />,
      text: "Northbound",
    }
  } else {
    return {
      icon: <ArrowCircleDownIcon />,
      text: "Southbound",
    }
  }
}
