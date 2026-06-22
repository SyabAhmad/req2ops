export default function ProcessingStatus() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="relative flex h-10 w-10 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />
        <div className="h-2 w-2 rounded-full bg-gray-900" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">Analyzing requirements</p>
        <p className="text-xs text-gray-500 mt-0.5">Building understanding &rarr; dev plan &rarr; task graph</p>
      </div>
    </div>
  )
}
