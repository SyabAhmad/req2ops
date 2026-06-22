const DEFAULT_TABS = [
  { key: 'dev', label: 'Developer View' },
  { key: 'design', label: 'Designer View' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'risks', label: 'Risks' },
  { key: 'actions', label: 'Next Actions' },
]

function parseTabs(raw) {
  if (!raw) return DEFAULT_TABS
  try {
    return JSON.parse(raw)
  } catch {
    return DEFAULT_TABS
  }
}

export default function TabBar({ active, onChange }) {
  const tabs = parseTabs(import.meta.env.VITE_WORKSPACE_TABS)

  return (
    <div className="flex gap-0 border-b border-gray-200 overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`relative shrink-0 px-4 py-2.5 text-sm font-medium transition-colors ${
            active === tab.key
              ? 'text-gray-900'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {tab.label}
          {active === tab.key && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
          )}
        </button>
      ))}
    </div>
  )
}
