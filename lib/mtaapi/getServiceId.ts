import { invariant } from "@/lib/invariant"

const SUNDAY = "Sunday"
const WEEKDAY = "Weekday"
const SATURDAY = "Saturday"

const SERVICE_IDS = [
  SUNDAY,
  WEEKDAY,
  WEEKDAY,
  WEEKDAY,
  WEEKDAY,
  WEEKDAY,
  SATURDAY,
] as const

export function getServiceId(startDate: string) {
  const dayButForNonRetards = startDate.replace(
    /(\d{4})(\d{2})(\d{2})/,
    "$1-$2-$3"
  )
  const day = new Date(dayButForNonRetards).getUTCDay()
  const serviceId = SERVICE_IDS[day]
  invariant(serviceId, "Unrecognised day")
  return serviceId
}
