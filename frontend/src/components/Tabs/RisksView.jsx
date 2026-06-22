import { txt, map, List, Section } from '../../utils/safe'

const SEVERITY_BORDER = { high: 'border-l-red-500', medium: 'border-l-amber-500', low: 'border-l-gray-300' }
const SEVERITY_BADGE = { high: 'bg-red-50 text-red-600', medium: 'bg-amber-50 text-amber-600', low: 'bg-gray-100 text-gray-500' }

export default function RisksView({ data }) {
  if (!data) return <EmptyState />
  return (
    <div className="space-y-8 py-6">
      {Array.isArray(data.missing_info) && data.missing_info.length > 0 && (
        <Section title="Missing Information">
          <div className="space-y-2">
            {data.missing_info.map((item, i) => (
              <div key={i} className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5">
                <p className="text-sm text-amber-800">{txt(item)}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {Array.isArray(data.risks) && data.risks.length > 0 && (
        <Section title="Risks">
          <div className="space-y-2">
            {data.risks.map((risk, i) => (
              <div key={i} className={`rounded-r-lg border border-l-4 border-gray-200 bg-white px-4 py-3 ${SEVERITY_BORDER[risk.severity] || 'border-l-gray-300'}`}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${SEVERITY_BADGE[risk.severity] || 'bg-gray-100 text-gray-500'}`}>{txt(risk.severity)}</span>
                  {risk.likelihood && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Likelihood: {txt(risk.likelihood)}</span>}
                  {risk.impact && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Impact: {txt(risk.impact)}</span>}
                </div>
                <p className="mt-1.5 text-sm text-gray-700">{txt(risk.description)}</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-gray-500">
                  {risk.mitigation && <span><span className="font-medium">Mitigation:</span> {txt(risk.mitigation)}</span>}
                  {risk.contingency && <span><span className="font-medium">Contingency:</span> {txt(risk.contingency)}</span>}
                  {risk.owner && <span><span className="font-medium">Owner:</span> {txt(risk.owner)}</span>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {Array.isArray(data.assumptions_to_validate) && data.assumptions_to_validate.length > 0 && (
        <Section title="Assumptions to Validate">
          <div className="space-y-2">
            {data.assumptions_to_validate.map((a, i) => (
              <div key={i} className="rounded-lg border border-purple-200 bg-purple-50 px-4 py-2.5">
                <p className="text-sm text-purple-800">{txt(a)}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {Array.isArray(data.decisions) && data.decisions.length > 0 && (
        <Section title="Decision Log">
          <div className="space-y-2">
            {data.decisions.map((d, i) => (
              <div key={i} className="rounded-lg border border-gray-200 bg-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{txt(d.decision)}</p>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                    d.status === 'accepted' ? 'bg-green-50 text-green-600' :
                    d.status === 'proposed' ? 'bg-blue-50 text-blue-600' :
                    d.status === 'rejected' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'
                  }`}>{txt(d.status)}</span>
                </div>
                {d.context && <p className="mt-1 text-xs text-gray-500">{txt(d.context)}</p>}
                {Array.isArray(d.options) && d.options.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    <span className="text-[10px] text-gray-400 font-medium">Options:</span>
                    {d.options.map((o, j) => (
                      <span key={j} className={`text-[10px] px-1.5 py-0.5 rounded ${o === d.chosen_option ? 'bg-blue-50 text-blue-600 font-medium' : 'bg-gray-100 text-gray-500'}`}>{txt(o)}</span>
                    ))}
                  </div>
                )}
                {d.rationale && <p className="mt-1 text-[11px] text-gray-400 italic">{txt(d.rationale)}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {Array.isArray(data.timeline_impacts) && data.timeline_impacts.length > 0 && (
        <Section title="Timeline Impacts">
          <List items={data.timeline_impacts} />
        </Section>
      )}

      {Array.isArray(data.communication_plan) && data.communication_plan.length > 0 && (
        <Section title="Communication Plan">
          <div className="space-y-2">
            {data.communication_plan.map((c, i) => (
              <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{txt(c.stakeholder)}</p>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{txt(c.frequency)}</span>
                </div>
                <p className="mt-0.5 text-xs text-gray-500">{txt(c.message)}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{txt(c.channel)} &middot; Owner: {txt(c.owner)}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {Array.isArray(data.escalation_paths) && data.escalation_paths.length > 0 && (
        <Section title="Escalation Paths">
          <List items={data.escalation_paths} />
        </Section>
      )}
    </div>
  )
}

function EmptyState() {
  return <div className="flex items-center justify-center py-16"><p className="text-sm text-gray-400">No risks identified.</p></div>
}
