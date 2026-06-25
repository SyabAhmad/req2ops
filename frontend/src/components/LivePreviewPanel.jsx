import { useState, useEffect, useRef } from 'react'

const PLAN_NAMES = {
  understanding: 'Understanding Requirements',
  classifier: 'Plan Classifier',
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
  design_system: 'Design System',
  user_research: 'User Research Plan',
  accessibility_plan: 'Accessibility Plan',
  component_library: 'Component Library',
  task_breakdown: 'Task Breakdown',
  delivery_review: 'Delivery Review',
}

function titleCase(s) {
  return String(s).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function isPrimitive(v) {
  return v === null || v === undefined || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean'
}

function isArrayOfPrimitives(v) {
  return Array.isArray(v) && v.length > 0 && v.every(isPrimitive)
}

function isArrayOfObjects(v) {
  return Array.isArray(v) && v.length > 0 && v.every(x => typeof x === 'object' && x !== null)
}

function isObj(v) {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function renderPrim(v) {
  if (isPrimitive(v)) return String(v)
  if (isArrayOfPrimitives(v)) return v.join(', ')
  if (isObj(v)) return Object.entries(v).map(([k, val]) => `${titleCase(k)}: ${renderPrim(val)}`).join(' / ')
  if (Array.isArray(v)) return v.map(renderPrim).join(', ')
  return String(v)
}

function TypewriterText({ text, speed = 12, onComplete, className = '' }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)
  const textRef = useRef(text)

  useEffect(() => {
    if (text !== textRef.current) {
      textRef.current = text
      indexRef.current = 0
      setDone(false)
    }

    const interval = setInterval(() => {
      indexRef.current++
      if (indexRef.current >= text.length) {
        setDisplayed(text)
        setDone(true)
        clearInterval(interval)
        onComplete?.()
      } else {
        setDisplayed(text.slice(0, indexRef.current))
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <span className="inline-block w-[2px] h-[1em] bg-gray-400 ml-[1px] align-text-bottom animate-blink" />
      )}
    </span>
  )
}

function TypewriterSection({ label, text, delay, onComplete }) {
  const [started, setStarted] = useState(false)
  const [headingDone, setHeadingDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!started) return null

  return (
    <div className="mb-3">
      <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
        {headingDone ? (
          <span>{label}</span>
        ) : (
          <TypewriterText
            text={label}
            speed={18}
            onComplete={() => setHeadingDone(true)}
          />
        )}
      </div>
      {headingDone && (
        <div className="text-sm text-gray-700 leading-relaxed mt-0.5">
          <TypewriterText
            text={text}
            speed={8}
            onComplete={onComplete}
          />
        </div>
      )}
    </div>
  )
}

function PlanBlock({ planId, planName, result, blockIndex, onSectionDone }) {
  const [visible, setVisible] = useState(false)
  const [currentField, setCurrentField] = useState(-1)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), blockIndex * 200)
    return () => clearTimeout(timer)
  }, [blockIndex])

  if (!result || typeof result !== 'object' || !visible) return null

  const entries = Object.entries(result).slice(0, 8)

  return (
    <div className="mb-6 pb-4 border-b border-gray-100 last:border-0">
      <div className="text-sm font-semibold text-gray-900 block mb-2">
        <TypewriterText
          text={planName || PLAN_NAMES[planId] || titleCase(planId)}
          speed={20}
          onComplete={() => setCurrentField(0)}
        />
        {!visible && <span className="inline-block w-[2px] h-[1em] bg-gray-400 ml-[1px] align-text-bottom animate-blink" />}
      </div>

      {currentField >= 0 && entries.map(([key, val], i) => {
        if (i < currentField) {
          const label = titleCase(key)
          let display
          if (isPrimitive(val)) {
            display = String(val).slice(0, 200)
          } else if (isArrayOfPrimitives(val)) {
            display = val.slice(0, 5).join(', ')
          } else if (isArrayOfObjects(val)) {
            display = `${val.length} items`
          } else if (isObj(val)) {
            display = Object.entries(val).slice(0, 3).map(([k, v]) => `${titleCase(k)}: ${renderPrim(v)}`).join(' | ')
          } else {
            display = String(val)
          }
          return (
            <div key={key} className="mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{label}</span>
              <div className="text-sm text-gray-700 leading-relaxed">{display}</div>
            </div>
          )
        }

        if (i === currentField) {
          const label = titleCase(key)
          let display
          if (isPrimitive(val)) {
            display = String(val).slice(0, 200)
          } else if (isArrayOfPrimitives(val)) {
            display = val.slice(0, 5).join(', ')
          } else if (isArrayOfObjects(val)) {
            display = `${val.length} items`
          } else if (isObj(val)) {
            display = Object.entries(val).slice(0, 3).map(([k, v]) => `${titleCase(k)}: ${renderPrim(v)}`).join(' | ')
          } else {
            display = String(val)
          }
          return (
            <TypewriterSection
              key={key}
              label={label}
              text={display}
              delay={0}
              onComplete={() => {
                if (i < entries.length - 1) {
                  setCurrentField(i + 1)
                } else {
                  onSectionDone?.()
                }
              }}
            />
          )
        }

        return null
      })}
    </div>
  )
}

export default function LivePreviewPanel({ results, activeAgents }) {
  const scrollRef = useRef(null)

  const completedAgentIds = results.map(r => r.agent)
  const pendingAgents = activeAgents.filter(a => !completedAgentIds.includes(a.id))

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [results])

  if (results.length === 0 && activeAgents.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-sm">
        <div className="text-center">
          <div className="mb-3">
            <svg className="h-8 w-8 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <p>Plan content will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto px-5 py-4 agent-scroll"
    >
      {results.map((item, i) => (
        <PlanBlock
          key={item.agent}
          planId={item.agent}
          planName={item.planName}
          result={item.result}
          blockIndex={i}
          onSectionDone={() => {}}
        />
      ))}

      {pendingAgents.map((agent) => (
        <div
          key={agent.id}
          className="mb-4 pb-3 border-b border-gray-100 last:border-0"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-blue-400/40" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-blue-500" />
            </span>
            <span className="text-sm font-medium text-gray-500">{agent.name || titleCase(agent.id)}</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-3 bg-gray-100 rounded w-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="h-3 bg-gray-100 rounded w-4/5 animate-pulse" style={{ animationDelay: '150ms' }} />
            <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      ))}
    </div>
  )
}
