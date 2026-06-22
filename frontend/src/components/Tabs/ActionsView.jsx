export default function ActionsView({ data }) {
  if (!data?.next_actions?.length) return <EmptyState />
  return (
    <div className="space-y-8 py-6">
      {data.next_actions?.length > 0 && (
        <Section title="Next Actions">
          <div className="space-y-2">
            {data.next_actions.map((a, i) => (
              <div key={i} className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
                <p className="text-sm font-medium text-blue-800">{a.action}</p>
                <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-blue-600">
                  <span>Owner: <span className="font-medium">{a.owner}</span></span>
                  <span className="text-blue-500">{a.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
      {data.follow_up_triggers?.length > 0 && (
        <Section title="Follow-up Triggers">
          <ul className="space-y-1.5">
            {data.follow_up_triggers.map((t, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                {t}
              </li>
            ))}
          </ul>
        </Section>
      )}
      {data.blocked_items?.length > 0 && (
        <Section title="Blocked Items">
          <div className="space-y-2">
            {data.blocked_items.map((b, i) => (
              <div key={i} className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5">
                <p className="text-sm text-red-700">{b}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex items-center justify-center py-16">
      <p className="text-sm text-gray-400">No next actions defined.</p>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">{title}</h3>
      {children}
    </div>
  )
}
