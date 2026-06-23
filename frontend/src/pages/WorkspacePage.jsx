import { useState, useMemo } from 'react'
import TabBar from '../components/TabBar.jsx'
import GenericPlanView from '../components/GenericPlanView.jsx'
import { downloadPlanPDF } from '../utils/pdf.js'

const PLAN_LABELS = {
  dev_architecture: 'Dev Architecture',
  api_design: 'API Design',
  database_design: 'Database Design',
  infrastructure: 'Infrastructure',
  security_plan: 'Security',
  testing_strategy: 'Testing',
  monitoring_plan: 'Monitoring',
  performance_plan: 'Performance',
  data_architecture: 'Data Architecture',
  integration_plan: 'Integration',
  deployment_plan: 'Deployment',
  ci_cd_plan: 'CI/CD',
  disaster_recovery: 'Disaster Recovery',
  design_system: 'Design System',
  user_research: 'User Research',
  accessibility_plan: 'Accessibility',
  mobile_strategy: 'Mobile',
  frontend_architecture: 'Frontend',
  component_library: 'Components',
  state_management: 'State Mgmt',
  api_gateway: 'API Gateway',
  auth_design: 'Auth',
  rate_limiting: 'Rate Limiting',
  cache_strategy: 'Caching',
  message_queue: 'Message Queue',
  event_driven: 'Event-Driven',
  microservices: 'Microservices',
  serverless: 'Serverless',
  kubernetes: 'Kubernetes',
  service_mesh: 'Service Mesh',
  observability: 'Observability',
  logging_plan: 'Logging',
  tracing_plan: 'Tracing',
  alerting_plan: 'Alerting',
  cost_optimization: 'Cost',
  capacity_plan: 'Capacity',
  chaos_engineering: 'Chaos Eng',
  compliance_plan: 'Compliance',
  privacy_plan: 'Privacy',
  ml_ops: 'MLOps',
  data_pipeline: 'Data Pipeline',
  analytics_plan: 'Analytics',
  search_design: 'Search',
  realtime_plan: 'Real-time',
  websocket_plan: 'WebSocket',
  graphql_design: 'GraphQL',
  grpc_design: 'gRPC',
  webhook_design: 'Webhooks',
  plugin_system: 'Plugins',
  multi_tenant: 'Multi-tenancy',
  feature_flags: 'Feature Flags',
  ab_testing: 'A/B Testing',
  task_breakdown: 'Tasks',
  delivery_review: 'Delivery Review',
}

export default function WorkspacePage({ data, onHome }) {
  const [activeTab, setActiveTab] = useState(null)
  const [downloading, setDownloading] = useState(false)

  const tabs = useMemo(() => {
    const result = []
    const seen = new Set()
    const selected = data?.plan_type?.selected_plans
    if (Array.isArray(selected)) {
      for (const planId of selected) {
        if (planId === 'understanding' || planId === 'classifier') continue
        if (data.plan_results?.[planId] && !seen.has(planId)) {
          seen.add(planId)
          result.push({
            key: planId,
            label: PLAN_LABELS[planId] || planId.replace(/_/g, ' '),
          })
        }
      }
    }
    if (!result.length && data?.plan_results) {
      for (const [key, val] of Object.entries(data.plan_results)) {
        if (key.endsWith('_thinking')) continue
        if (seen.has(key)) continue
        seen.add(key)
        result.push({
          key,
          label: PLAN_LABELS[key] || key.replace(/_/g, ' '),
        })
      }
    }
    if (!result.length) {
      result.push({ key: '_fallback', label: 'Results' })
    }
    return result
  }, [data])

  if (activeTab === null && tabs.length > 0) {
    setActiveTab(tabs[0].key)
  }

  const currentKey = activeTab || tabs[0]?.key
  const planData = currentKey === '_fallback'
    ? data?.plan_results
    : data?.plan_results?.[currentKey]

  const allPlanEntries = useMemo(() => {
    if (!data?.plan_results) return []
    return Object.entries(data.plan_results).filter(([k]) => !k.endsWith('_thinking'))
  }, [data])

  async function handleDownloadPDF() {
    setDownloading(true)
    downloadPlanPDF()
    setTimeout(() => setDownloading(false), 500)
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={onHome} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              &larr; Back
            </button>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Execution Plan</h1>
              <p className="mt-1 text-sm text-gray-500">Structured breakdown ready for your team</p>
            </div>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="shrink-0 mt-1 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>
        <TabBar tabs={tabs} active={currentKey} onChange={setActiveTab} />
        <div className="mt-4 mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <svg className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-800">Download your plans before leaving</p>
            <p className="text-xs text-amber-600 mt-0.5">These plans are generated in your browser and will be lost if you navigate away or close this page without saving.</p>
          </div>
        </div>
        <div className="min-h-[60vh]">
          <GenericPlanView data={planData} planId={currentKey} />
        </div>
      </div>

      {/* Hidden container for PDF — renders all plans, shown only during print */}
      <div id="pdf-all-plans">
        <div className="pdf-plan-section" style={{ marginBottom: '24px', paddingBottom: '16px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>Execution Plan</h1>
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            <span>Generated by Req2Ops</span>
          </div>
        </div>
        {allPlanEntries.map(([planId, planData], idx) => (
          <div key={planId} className={`pdf-plan-section ${idx > 0 ? 'pdf-plan-page' : ''}`}>
            <GenericPlanView data={planData} planId={planId} />
          </div>
        ))}
        <div className="pdf-plan-section" style={{ marginTop: '32px', paddingTop: '12px', borderTop: '1px solid #e5e7eb', fontSize: '10px', color: '#9ca3af', textAlign: 'center' }}>
          Req2Ops — Turn messy client requirements into structured execution plans &middot; Developed by <a href="https://syab.vercel.app" style={{ textDecoration: 'underline' }}>Syed Syab</a> &middot; A product of <a href="https://syab.vercel.app/mentee" style={{ textDecoration: 'underline' }}>Mentee</a>
        </div>
      </div>
    </div>
  )
}
