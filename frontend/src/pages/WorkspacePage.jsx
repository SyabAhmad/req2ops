import { useState, useMemo } from 'react'
import TabBar from '../components/TabBar.jsx'
import GenericPlanView from '../components/GenericPlanView.jsx'

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

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={onHome} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              &larr; Back
            </button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Execution Plan</h1>
          <p className="mt-1 text-sm text-gray-500">Structured breakdown ready for your team</p>
        </div>
        <TabBar tabs={tabs} active={currentKey} onChange={setActiveTab} />
        <div className="min-h-[60vh]">
          <GenericPlanView data={planData} planId={currentKey} />
        </div>
      </div>
    </div>
  )
}
