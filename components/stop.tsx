"use client"
import useSubwayDataQuery from "@/queries/useSubwayDataQuery"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { useQuery } from "@tanstack/react-query"
import _ from "lodash"
import { RouteOfStop } from "./route-of-stop"
import { SubwayIcon } from "@phosphor-icons/react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

interface IProps {
  stopName: string
}
export function Stop({ stopName }: IProps) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["subway"],
    queryFn: useSubwayDataQuery,
    refetchInterval: 10000,
  })
  if (isLoading || error || data == null) {
    return
  }
  const isMyStop = stopName === "Bedford Av"
  const tooltip = isMyStop ? (
    <Tooltip>
      <TooltipTrigger>
        <span className="flex size-2 rounded-full bg-blue-500" />
      </TooltipTrigger>
      <TooltipContent>This is my stop fyi</TooltipContent>
    </Tooltip>
  ) : undefined
  const relevantUpdates = data.filter((s) => s.stopName === stopName)
  const byRoute = _.chain(relevantUpdates)
    .groupBy((u) => u.routeId)
    .entries()
    .value()

  if (byRoute.length === 0) {
    return
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1 align-middle">
          {tooltip}
          <SubwayIcon />
          {stopName}
        </CardTitle>
        <CardDescription>Subway Stop</CardDescription>
      </CardHeader>
      <CardContent>
        {byRoute.map(([route, stopTimeUpdates]) => (
          <RouteOfStop
            key={route}
            route={route}
            stopTimeUpdates={stopTimeUpdates}
          />
        ))}
      </CardContent>
    </Card>
  )
}
