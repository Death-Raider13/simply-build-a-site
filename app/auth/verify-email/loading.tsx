import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Loader2 className="h-12 w-12 animate-spin text-green-600" />
    </div>
  )
}
