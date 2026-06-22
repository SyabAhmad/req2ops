const PRIORITY_BORDER = {
  P0: 'border-l-red-500',
  P1: 'border-l-amber-500',
  P2: 'border-l-gray-300',
}

const PRIORITY_BADGE = {
  P0: 'bg-red-50 text-red-600',
  P1: 'bg-amber-50 text-amber-600',
  P2: 'bg-gray-100 text-gray-500',
}

export default function TasksView({ data }) {
  if (!data?.tasks?.length) return <EmptyState />
  return (
    <div className="space-y-2 py-6">
      {data.tasks.map(task => (
        <div
          key={task.id}
          className={`rounded-r-lg border border-l-4 border-gray-200 bg-white px-4 py-3.5 ${PRIORITY_BORDER[task.priority] || 'border-l-gray-300'}`}
        >
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-medium text-gray-900">{task.title}</p>
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${PRIORITY_BADGE[task.priority] || 'bg-gray-100 text-gray-500'}`}>
                  {task.priority}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-gray-400">{task.id}</p>
              {task.description && (
                <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{task.description}</p>
              )}
            </div>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
            <span className="font-medium">Effort: {task.estimated_effort}</span>
            {task.assignee_role && <span>Role: <span className="font-medium">{task.assignee_role}</span></span>}
            {task.dependencies?.length > 0 && (
              <span>Depends on: <span className="font-medium">{task.dependencies.join(', ')}</span></span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex items-center justify-center py-16">
      <p className="text-sm text-gray-400">No tasks yet.</p>
    </div>
  )
}
