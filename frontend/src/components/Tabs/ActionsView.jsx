import { txt, map, Section } from '../../utils/safe'

export default function ActionsView({ data }) {
  if (!data) return <EmptyState />
  return (
    <div className="space-y-8 py-6">
      {Array.isArray(data.next_actions) && data.next_actions.length > 0 && (
        <Section title="Next Actions">
          <div className="space-y-2">
            {data.next_actions.map((a, i) => (
              <div key={i} className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-blue-800">{txt(a.action)}</p>
                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-blue-600">
                      <span>Owner: <span className="font-medium">{txt(a.owner)}</span></span>
                      {a.reason && <span className="text-blue-500">{txt(a.reason)}</span>}
                      {a.priority && (
                        <span className={`font-medium ${a.priority === 'P0' ? 'text-red-500' : a.priority === 'P1' ? 'text-amber-500' : 'text-blue-400'}`}>
                          {txt(a.priority)}
                        </span>
                      )}
                      {a.estimated_effort && <span>Effort: <span className="font-medium">{txt(a.estimated_effort)}</span></span>}
                    </div>
                    {map(a.depends_on, (dep, j) => (
                      <p key={j} className="mt-0.5 text-[10px] text-blue-400">Depends on: {txt(dep)}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {Array.isArray(data.follow_up_triggers) && data.follow_up_triggers.length > 0 && (
        <Section title="Follow-up Triggers">
          <ul className="space-y-1.5">
            {data.follow_up_triggers.map((t, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                {txt(t)}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {Array.isArray(data.blocked_items) && data.blocked_items.length > 0 && (
        <Section title="Blocked Items">
          <div className="space-y-2">
            {data.blocked_items.map((b, i) => (
              <div key={i} className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5">
                <p className="text-sm text-red-700">{txt(b)}</p>
                {data.blocked_item_unblockers?.[i] && (
                  <p className="mt-1 text-xs text-red-500 italic">Unblocker: {txt(data.blocked_item_unblockers[i])}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}

function EmptyState() {
  return <div className="flex items-center justify-center py-16"><p className="text-sm text-gray-400">No next actions defined.</p></div>
}
