import { txt, map, entries, List, Section } from '../../utils/safe'

const PRIORITY_BORDER = { P0: 'border-l-red-500', P1: 'border-l-amber-500', P2: 'border-l-gray-300' }
const PRIORITY_BADGE = { P0: 'bg-red-50 text-red-600', P1: 'bg-amber-50 text-amber-600', P2: 'bg-gray-100 text-gray-500' }

export default function TasksView({ data }) {
  if (!data) return <EmptyState />
  return (
    <div className="space-y-8 py-6">
      {Array.isArray(data.project_phases) && data.project_phases.length > 0 && (
        <Section title="Project Phases">
          <div className="space-y-2">
            {data.project_phases.map((p, i) => (
              <div key={i} className="rounded-lg border border-gray-200 bg-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{txt(p.phase_name)}</p>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">{txt(p.sprint_count_estimate)} sprints</span>
                </div>
                {p.description && <p className="mt-1 text-xs text-gray-500">{txt(p.description)}</p>}
                {p.milestone && <p className="mt-1 text-[10px] text-gray-400">Milestone: {txt(p.milestone)}</p>}
                {map(p.tasks, (t, j) => (
                  <div key={j} className="mt-2 flex flex-wrap gap-1">
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono">{txt(t)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Section>
      )}

      {Array.isArray(data.milestones) && data.milestones.length > 0 && (
        <Section title="Milestones">
          <div className="space-y-2">
            {data.milestones.map((m, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">M</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{txt(m.name)}</p>
                  {m.description && <p className="text-xs text-gray-500">{txt(m.description)}</p>}
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-[10px] text-gray-400">
                    {m.target_date_estimate && <span>Target: {txt(m.target_date_estimate)}</span>}
                    {map(m.dependencies, (dep, j) => (
                      <span key={j}>Depends: {txt(dep)}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section title="Tasks">
        <div className="space-y-2">
          {map(data.tasks, task => (
            <div key={task.id} className={`rounded-r-lg border border-l-4 border-gray-200 bg-white px-4 py-3.5 ${PRIORITY_BORDER[task.priority] || 'border-l-gray-300'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-gray-900">{txt(task.title)}</p>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${PRIORITY_BADGE[task.priority] || 'bg-gray-100 text-gray-500'}`}>{txt(task.priority)}</span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-gray-400 font-mono">{txt(task.id)}</p>
                  {task.description && <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{txt(task.description)}</p>}
                  {map(task.acceptance_criteria, (ac, j) => (
                    <div key={j} className="mt-2 space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Acceptance Criteria</p>
                      <div className="rounded bg-gray-50 px-3 py-1.5 text-[11px] text-gray-600">
                        <span className="font-medium text-gray-700">Given</span> {txt(ac.given)}<br />
                        <span className="font-medium text-gray-700">When</span> {txt(ac.when)}<br />
                        <span className="font-medium text-gray-700">Then</span> {txt(ac.then)}
                      </div>
                    </div>
                  ))}
                  {map(task.definition_of_done, (d, j) => (
                    <div key={j} className="mt-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Definition of Done</p>
                      <ul className="mt-0.5 space-y-0.5">
                        <li className="flex items-start gap-1.5 text-[11px] text-gray-500">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                          {txt(d)}
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500">
                <span className="font-medium">Effort: {txt(task.estimated_effort)}</span>
                {task.effort_breakdown && typeof task.effort_breakdown === 'object' && !Array.isArray(task.effort_breakdown) && (
                  <span>Breakdown: {entries(task.effort_breakdown).map(([k, v]) => `${k}: ${txt(v)}`).join(', ')}</span>
                )}
                {task.assignee_role && <span>Role: <span className="font-medium">{txt(task.assignee_role)}</span></span>}
                {task.deliverable && <span>Deliverable: <span className="font-medium">{txt(task.deliverable)}</span></span>}
                {map(task.dependencies, (dep, j) => (
                  <span key={j}>Depends on: <span className="font-medium">{txt(dep)}</span></span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {Array.isArray(data.critical_path) && data.critical_path.length > 0 && (
        <Section title="Critical Path">
          <div className="flex flex-wrap gap-1.5">
            {data.critical_path.map((id, i) => (
              <span key={id} className="text-[11px] font-mono bg-red-50 text-red-600 px-1.5 py-0.5 rounded">
                {txt(id)}{i < data.critical_path.length - 1 ? ' →' : ''}
              </span>
            ))}
          </div>
        </Section>
      )}

      {Array.isArray(data.parallel_tracks) && data.parallel_tracks.length > 0 && (
        <Section title="Parallel Tracks">
          <List items={data.parallel_tracks} />
        </Section>
      )}
    </div>
  )
}

function EmptyState() {
  return <div className="flex items-center justify-center py-16"><p className="text-sm text-gray-400">No tasks yet.</p></div>
}
