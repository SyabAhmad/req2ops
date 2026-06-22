import { txt, map, entries, DictDisplay, List, Section } from '../../utils/safe'

export default function DevView({ data }) {
  if (!data) return <EmptyState />
  return (
    <div className="space-y-8 py-6">
      <Section title="System Architecture">
        <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">{txt(data.system_architecture)}</p>
        {data.architecture_diagram_description && (
          <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <p className="text-xs font-medium text-gray-500 mb-1">Architecture Diagram</p>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{txt(data.architecture_diagram_description)}</p>
          </div>
        )}
      </Section>

      <Section title="Tech Stack">
        {data.tech_stack && typeof data.tech_stack === 'object' && !Array.isArray(data.tech_stack) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {entries(data.tech_stack).map(([key, val]) => (
              <div key={key} className="rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{key}</p>
                <p className="mt-0.5 text-sm text-gray-700">{txt(val)}</p>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Architecture Decisions">
        <div className="space-y-2">
          {map(data.architecture_decisions, (d, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white px-4 py-3">
              <p className="text-sm font-medium text-gray-900">{txt(d.decision)}</p>
              {d.rationale && <p className="mt-1 text-xs text-gray-500"><span className="font-medium">Rationale:</span> {txt(d.rationale)}</p>}
              {map(d.options_considered, (o, j) => (
                <div key={j} className="mt-1 flex flex-wrap gap-1.5">
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{txt(o)}</span>
                </div>
              ))}
              {map(d.trade_offs, (t, j) => (
                <div key={j} className="mt-1 flex flex-wrap gap-1">
                  <span className="text-[10px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded">{txt(t)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Data Flows">
        <div className="space-y-2">
          {map(data.data_flows, (f, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-sm font-medium text-gray-900">{txt(f.description)}</p>
              <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500">
                <span>Source: <span className="font-medium">{txt(f.source)}</span></span>
                <span>Destination: <span className="font-medium">{txt(f.destination)}</span></span>
                <span>Protocol: <span className="font-medium">{txt(f.protocol)}</span></span>
                {f.data_format && <span>Format: <span className="font-medium">{txt(f.data_format)}</span></span>}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Backend Modules">
        <List items={data.backend_modules} />
      </Section>

      <Section title="APIs">
        <div className="space-y-2">
          {map(data.apis, (api, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">{txt(api.method)}</span>
                <code className="text-sm text-gray-800 font-mono">{txt(api.path)}</code>
              </div>
              {api.description && <p className="mt-1 text-xs text-gray-500">{txt(api.description)}</p>}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Database Tables">
        <div className="space-y-3">
          {map(data.database_tables, (t, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-sm font-medium text-gray-900">{txt(t.name)}</p>
              {map(t.columns, (c, j) => (
                <ul key={j} className="mt-1.5 space-y-0.5">
                  <li className="text-xs text-gray-500 font-mono pl-3 border-l border-gray-200">{txt(c)}</li>
                </ul>
              ))}
            </div>
          ))}
        </div>
        {data.database_schema_description && (
          <p className="mt-2 text-xs text-gray-400 italic">{txt(data.database_schema_description)}</p>
        )}
      </Section>

      <Section title="External Services">
        <div className="space-y-2">
          {map(data.external_services, (s, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-sm font-medium text-gray-900">{txt(s.name)}</p>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500">
                <span>Purpose: <span className="font-medium">{txt(s.purpose)}</span></span>
                <span>Integration: <span className="font-medium">{txt(s.integration_pattern)}</span></span>
                {s.authentication_method && <span>Auth: <span className="font-medium">{txt(s.authentication_method)}</span></span>}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Deployment Strategy">
        {data.deployment_strategy && typeof data.deployment_strategy === 'object' && !Array.isArray(data.deployment_strategy) && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            {entries(data.deployment_strategy).map(([key, val]) => (
              <div key={key} className="flex items-baseline gap-2 py-0.5">
                <span className="text-xs font-medium text-gray-400 capitalize">{key.replace(/_/g, ' ')}:</span>
                <span className="text-sm text-gray-700">{Array.isArray(val) ? val.join(', ') : txt(val)}</span>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Security Measures">
        <div className="space-y-2">
          {map(data.security_measures, (m, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5">
              <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                m.priority === 'high' ? 'bg-red-50 text-red-600' : m.priority === 'medium' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'
              }`}>{txt(m.priority)}</span>
              <div>
                <p className="text-xs font-medium text-gray-700">{txt(m.category)}</p>
                <p className="text-xs text-gray-500">{txt(m.measure)}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Testing Strategy">
        <DictDisplay data={data.testing_strategy} />
      </Section>

      <Section title="Monitoring & Observability">
        <DictDisplay data={data.monitoring_and_observability} />
      </Section>

      <Section title="Performance Considerations">
        <DictDisplay data={data.performance_considerations} />
      </Section>

      <Section title="Error Handling Strategy">
        <DictDisplay data={data.error_handling_strategy} />
      </Section>

      <Section title="Services Breakdown">
        <List items={data.services_breakdown} />
      </Section>
    </div>
  )
}

function EmptyState() {
  return <div className="flex items-center justify-center py-16"><p className="text-sm text-gray-400">No developer plan yet.</p></div>
}
