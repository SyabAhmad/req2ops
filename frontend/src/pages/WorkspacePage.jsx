import { useState } from 'react'
import TabBar from '../components/TabBar.jsx'
import { DevView, DesignView, TasksView, RisksView, ActionsView } from '../components/Tabs/index.js'

const TAB_COMPONENTS = {
  dev: DevView,
  design: DesignView,
  tasks: TasksView,
  risks: RisksView,
  actions: ActionsView,
}

const TAB_DATA_KEY = {
  dev: 'dev_plan',
  design: 'design_plan',
  tasks: 'task_graph',
  risks: 'control_layer',
  actions: 'control_layer',
}

export default function WorkspacePage({ data, onHome }) {
  const [activeTab, setActiveTab] = useState('dev')
  const TabComponent = TAB_COMPONENTS[activeTab]

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <button onClick={onHome} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              &larr; Back
            </button>
            <span className="text-gray-300">/</span>
            <h2 className="text-xl font-bold tracking-tight text-gray-900">Execution Plan</h2>
          </div>
          <p className="mt-1 text-sm text-gray-500">Structured breakdown ready for your team</p>
        </div>
        <TabBar active={activeTab} onChange={setActiveTab} />
        <div className="min-h-[60vh]">
          <TabComponent data={data?.[TAB_DATA_KEY[activeTab]]} />
        </div>
      </div>
    </div>
  )
}
