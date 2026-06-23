import { txt, entries, ObjectList } from '../utils/safe'

function isPrimitive(v) {
  return v === null || v === undefined || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean'
}

function isArrayOfPrimitives(v) {
  return Array.isArray(v) && v.length > 0 && v.every(isPrimitive)
}

function isArrayOfObjects(v) {
  return Array.isArray(v) && v.length > 0 && v.every(x => typeof x === 'object' && x !== null)
}

function titleCase(s) {
  return String(s).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function isObj(v) {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function renderPrim(v) {
  if (isPrimitive(v)) return txt(v)
  if (isArrayOfPrimitives(v)) return v.join(', ')
  if (isObj(v)) return Object.entries(v).map(([k, val]) => `${titleCase(k)}: ${renderPrim(val)}`).join(' / ')
  if (Array.isArray(v)) return v.map(renderPrim).join(', ')
  return txt(v)
}

const PLAN_NAMES = {
  design_system: 'Design System',
  user_research: 'User Research Plan',
  accessibility_plan: 'Accessibility Plan',
  component_library: 'Component Library',
  task_breakdown: 'Task Breakdown',
  delivery_review: 'Delivery Review',
  dev_architecture: 'Development Architecture',
  api_design: 'API Design',
  database_design: 'Database Design',
  security_plan: 'Security Plan',
  testing_strategy: 'Testing Strategy',
  monitoring_plan: 'Monitoring & Observability',
  performance_plan: 'Performance Engineering',
  infrastructure: 'Infrastructure Plan',
  deployment_plan: 'Deployment Strategy',
  ci_cd_plan: 'CI/CD Pipeline',
  data_architecture: 'Data Architecture',
  integration_plan: 'Integration Plan',
  frontend_architecture: 'Frontend Architecture',
  mobile_strategy: 'Mobile Strategy',
  state_management: 'State Management',
  auth_design: 'Authentication & Authorization',
  cache_strategy: 'Caching Strategy',
  message_queue: 'Message Queue Design',
  event_driven: 'Event-Driven Architecture',
  microservices: 'Microservices Design',
  serverless: 'Serverless Architecture',
  kubernetes: 'Kubernetes Architecture',
  observability: 'Full-Stack Observability',
  cost_optimization: 'Cost Optimization',
  compliance_plan: 'Compliance & Audit',
  privacy_plan: 'Data Privacy & GDPR',
  ml_ops: 'MLOps Pipeline',
  data_pipeline: 'Data Pipeline',
  search_design: 'Search Architecture',
  realtime_plan: 'Real-time Features',
  api_gateway: 'API Gateway Design',
  rate_limiting: 'Rate Limiting & Throttling',
  disaster_recovery: 'Disaster Recovery',
  logging_plan: 'Logging Strategy',
  tracing_plan: 'Distributed Tracing',
  alerting_plan: 'Alerting & On-Call',
  capacity_plan: 'Capacity Planning',
  chaos_engineering: 'Chaos Engineering',
  plugin_system: 'Plugin/Extension System',
  multi_tenant: 'Multi-tenancy Design',
  feature_flags: 'Feature Flag System',
  ab_testing: 'A/B Testing Framework',
  webhook_design: 'Webhook System',
  graphql_design: 'GraphQL Schema Design',
  grpc_design: 'gRPC Service Design',
  service_mesh: 'Service Mesh',
}

function H2({ children }) {
  return <h2 className="text-lg font-semibold text-gray-900 mt-10 mb-3 first:mt-0">{children}</h2>
}

function H3({ children }) {
  return <h3 className="text-base font-medium text-gray-800 mt-6 mb-2">{children}</h3>
}

function P({ children, className = '' }) {
  return <p className={`text-sm leading-relaxed text-gray-600 whitespace-pre-wrap ${className}`}>{children}</p>
}

function TagList({ items }) {
  if (!isArrayOfPrimitives(items)) return null
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((v, i) => (
        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">{txt(v)}</span>
      ))}
    </div>
  )
}

function InlineKV({ data }) {
  const e = entries(data)
  if (!e.length) return null
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {e.map(([k, v]) => (
        <span key={k} className="text-xs">
          <span className="font-medium text-gray-500">{titleCase(k)}:</span>{' '}
          <span className="text-gray-700">{renderPrim(v)}</span>
        </span>
      ))}
    </div>
  )
}

function ObjCard({ data, depth }) {
  const e = entries(data)
  if (!e.length) return null
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
      <DeepDict data={data} depth={depth} />
    </div>
  )
}

function DeepDict({ data, depth = 0 }) {
  const e = entries(data)
  if (!e.length) return null

  if (depth >= 4) {
    return <InlineKV data={data} />
  }

  return (
    <div className={depth > 0 ? 'ml-4 border-l-2 border-gray-100 pl-4 space-y-3' : 'space-y-3'}>
      {e.map(([key, val]) => {
        if (isPrimitive(val)) {
          return (
            <div key={key}>
              <span className="text-xs font-semibold text-gray-500">{titleCase(key)}: </span>
              <span className="text-sm text-gray-700">{txt(val)}</span>
            </div>
          )
        }
        if (isArrayOfPrimitives(val)) {
          return (
            <div key={key}>
              <H3>{titleCase(key)}</H3>
              <TagList items={val} />
            </div>
          )
        }
        if (isArrayOfObjects(val)) {
          return (
            <div key={key}>
              <H3>{titleCase(key)}</H3>
              <ArrayOfObjects items={val} depth={depth} />
            </div>
          )
        }
        if (isObj(val)) {
          const oe = Object.entries(val)
          const allPrim = oe.every(([, v]) => isPrimitive(v))
          if (oe.length <= 6 && allPrim) {
            return (
              <div key={key}>
                <H3>{titleCase(key)}</H3>
                <InlineKV data={val} />
              </div>
            )
          }
          return (
            <div key={key}>
              <H3>{titleCase(key)}</H3>
              <ObjCard data={val} depth={depth + 1} />
            </div>
          )
        }
        return (
          <div key={key}>
            <span className="text-xs font-semibold text-gray-500">{titleCase(key)}: </span>
            <span className="text-sm text-gray-700">{renderPrim(val)}</span>
          </div>
        )
      })}
    </div>
  )
}

function ArrayOfObjects({ items, depth = 0 }) {
  const first = items[0]
  const keyField = first?.name ? 'name' : first?.title ? 'title' : first?.id ? 'id'
    : first?.breakpoint ? 'breakpoint' : first?.requirement ? 'requirement'
    : first?.stakeholder ? 'stakeholder' : null

  if (keyField) {
    const fields = Object.keys(first).filter(k => k !== keyField).slice(0, 4)
    return (
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={item[keyField] || i} className="flex items-start gap-3 text-sm py-1.5 border-b border-gray-50 last:border-0">
            <span className="font-medium text-gray-900 shrink-0">{txt(item[keyField])}</span>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-500">
              {fields.map(f => (
                <span key={f}>{titleCase(f)}: <span className="text-gray-700 font-medium">{renderPrim(item[f])}</span></span>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const allSmall = items.every(x => {
    const ke = Object.entries(x)
    return ke.length <= 3 && ke.every(([, v]) => isPrimitive(v) || isArrayOfPrimitives(v))
  })

  if (allSmall) {
    return (
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex flex-wrap gap-2">
            {Object.entries(item).map(([k, v]) => (
              <span key={k} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                <span className="font-medium">{titleCase(k)}:</span> {renderPrim(v)}
              </span>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <ObjCard key={i} data={item} depth={depth + 1} />
      ))}
    </div>
  )
}

function renderSection(key, val) {
  if (isPrimitive(val)) {
    return <P>{txt(val)}</P>
  }
  if (isArrayOfPrimitives(val)) {
    return <TagList items={val} />
  }
  if (isArrayOfObjects(val)) {
    return <ArrayOfObjects items={val} />
  }
  if (isObj(val)) {
    return <DeepDict data={val} />
  }
  return <P>{renderPrim(val)}</P>
}

const TITLE_KEYS = new Set(['title', 'name', 'summary', 'overview', 'description'])

export default function GenericPlanView({ data, planId }) {
  if (!data) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-gray-400">No data available.</p>
      </div>
    )
  }

  if (typeof data === 'string') {
    return <div className="py-6"><P>{data}</P></div>
  }

  const e = entries(data)
  if (!e.length) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-gray-400">Empty plan.</p>
      </div>
    )
  }

  const planTitle = PLAN_NAMES[planId] || planId?.replace(/_/g, ' ') || 'Plan'

  return (
    <div className="py-8">
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{planTitle}</h1>
      </div>

      <div className="space-y-2">
        {e.map(([key, val], i) => {
          if (isPrimitive(val) && TITLE_KEYS.has(key)) {
            return (
              <div key={i} className="mb-6">
                <P className="text-base text-gray-700 font-medium">{txt(val)}</P>
              </div>
            )
          }
          return (
            <div key={i} className="pdf-plan-section py-4 border-b border-gray-100 last:border-0">
              <H2>{titleCase(key)}</H2>
              {renderSection(key, val)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
