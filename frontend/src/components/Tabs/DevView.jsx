export default function DevView({ data }) {
  if (!data) return <EmptyState />
  return (
    <div className="space-y-8 py-6">
      <Section title="System Architecture">
        <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">{data.system_architecture}</p>
      </Section>
      <Section title="Backend Modules">
        <List items={data.backend_modules} />
      </Section>
      <Section title="APIs">
        <div className="space-y-2">
          {data.apis?.map((api, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">{api.method}</span>
                <code className="text-sm text-gray-800 font-mono">{api.path}</code>
              </div>
              {api.description && (
                <p className="mt-1 text-xs text-gray-500">{api.description}</p>
              )}
            </div>
          ))}
        </div>
      </Section>
      <Section title="Database Schema">
        <div className="space-y-3">
          {data.db_schema?.map((t, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-sm font-medium text-gray-900">{t.name}</p>
              {t.columns?.length > 0 && (
                <ul className="mt-1.5 space-y-0.5">
                  {t.columns.map((c, j) => (
                    <li key={j} className="text-xs text-gray-500 font-mono pl-3 border-l border-gray-200">{c}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Section>
      <Section title="Services Breakdown">
        <List items={data.services_breakdown} />
      </Section>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex items-center justify-center py-16">
      <p className="text-sm text-gray-400">No developer plan yet.</p>
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
