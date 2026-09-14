import { Stop } from "@/components/stop"
import { STOP_NAMES } from "@/lib/mtaapi/resources/stops"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col gap-4 p-6">
      {STOP_NAMES.map((s) => (
        <Stop key={s} stopName={s} />
      ))}
    </div>
  )
}
