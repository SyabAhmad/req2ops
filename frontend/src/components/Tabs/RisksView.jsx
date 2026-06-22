const SEVERITY_BORDER = {
  high: 'border-l-red-500',
  medium: 'border-l-amber-500',
  low: 'border-l-gray-300',
}

const SEVERITY_BADGE = {
  high: 'bg-red-50 text-red-600',
  medium: 'bg-amber-50 text-amber-600',
  low: 'bg-gray-100 text-gray-500',
}

export default function RisksView({ data }) {
  if (!data) return <EmptyState />
  return (
    <div className="space-y-8 py-6">
      {data.missing_info?.length > 0 && (
        <Section title="Missing Information">
          <div className="space-y-2">
            {data.missing_info.map((item, i) => (
              <div key={i} className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5">
                <p className="text-sm text-amber-800">{item}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
      {data.risks?.length > 0 && (
        <Section title="Risks">
          <div className="space-y-2">
            {data.risks.map((risk, i) => (
              <div
                key={i}
                className={`rounded-r-lg border border-l-4 border-gray-200 bg-white px-4 py-2.5 ${SEVERITY_BORDER[risk.severity] || 'border-l-gray-300'}`}
              >
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${SEVERITY_BADGE[risk.severity] || 'bg-gray-100 text-gray-500'}`}>
                  {risk.severity}
                </span>
                <p className="mt-1 text-sm text-gray-600">{risk.description}</p>
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
      <p className="text-sm text-gray-400">No risks identified.</p>
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
