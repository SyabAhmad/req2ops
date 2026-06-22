export default function DesignView({ data }) {
  if (!data) return <EmptyState />
  return (
    <div className="space-y-8 py-6">
      <Section title="Screens">
        <div className="space-y-2">
          {data.screens?.map((s, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-sm font-medium text-gray-900">{s.name}</p>
              {s.description && (
                <p className="mt-0.5 text-xs text-gray-500">{s.description}</p>
              )}
            </div>
          ))}
        </div>
      </Section>
      <Section title="UI Components">
        <List items={data.ui_components} />
      </Section>
      <Section title="User Flows">
        <List items={data.user_flows} />
      </Section>
      <Section title="UX Notes">
        <List items={data.ux_notes} />
      </Section>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex items-center justify-center py-16">
      <p className="text-sm text-gray-400">No design plan yet.</p>
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

function List({ items }) {
  if (!items?.length) return null
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
          {item}
        </li>
      ))}
    </ul>
  )
}
