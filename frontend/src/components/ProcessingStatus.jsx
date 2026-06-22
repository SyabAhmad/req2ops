import { useState, useEffect, useRef } from 'react'
import { uploadRequirementStream } from '../api/client.js'

const INITIAL_AGENTS = [
  { id: 'understanding', label: 'Understanding Requirements', role: 'Senior Requirements Analyst', status: 'pending' },
  { id: 'dev_breakdown', label: 'Dev Architecture', role: 'Senior Software Architect', status: 'pending' },
  { id: 'design_breakdown', label: 'Design Planning', role: 'Senior UI/UX Designer', status: 'pending' },
  { id: 'task_graph', label: 'Task Breakdown', role: 'Technical Project Manager', status: 'pending' },
  { id: 'control_layer', label: 'Delivery Review', role: 'Delivery Lead', status: 'pending' },
]

export default function ProcessingStatus({ input, files, onComplete, onError }) {
  const [agents, setAgents] = useState(INITIAL_AGENTS)
  const cancelRef = useRef(null)

  useEffect(() => {
    cancelRef.current = uploadRequirementStream({
      text: input,
      files,
      onEvent(event) {
        if (event.data.event === 'agent_start') {
          setAgents(prev => prev.map(a =>
            a.id === event.data.agent ? { ...a, status: 'active' } : a
          ))
        } else if (event.data.event === 'agent_complete') {
          setAgents(prev => prev.map(a =>
            a.id === event.data.agent ? { ...a, status: 'done' } : a
          ))
        }
      },
      onComplete(data) {
        setAgents(prev => prev.map(a => ({ ...a, status: 'done' })))
        onComplete?.(data)
      },
      onError(err) {
        onError?.(err)
      },
    })

    return () => cancelRef.current?.()
  }, [input, files])

  const activeAgent = agents.find(a => a.status === 'active')
  const doneCount = agents.filter(a => a.status === 'done').length

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">Processing requirements</h2>
        <p className="mt-1 text-sm text-gray-500">
          {doneCount} of {agents.length} agents completed
        </p>
      </div>

      <div className="space-y-2">
        {agents.map(agent => (
          <AgentRow key={agent.id} agent={agent} isActive={activeAgent?.id === agent.id} />
        ))}
      </div>

      {activeAgent && (
        <p className="mt-6 text-center text-sm text-gray-400 animate-pulse">
          {activeAgent.role} is thinking...
        </p>
      )}
    </div>
  )
}

function AgentRow({ agent, isActive }) {
  const statusIcon = () => {
    switch (agent.status) {
      case 'active':
        return (
          <span className="relative flex h-5 w-5 items-center justify-center">
            <span className="absolute h-full w-full animate-ping rounded-full bg-blue-400/40" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-blue-600" />
          </span>
        )
      case 'done':
        return (
          <span className="flex h-5 w-5 items-center justify-center">
            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </span>
        )
      default:
        return (
          <span className="flex h-5 w-5 items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-gray-300" />
          </span>
        )
    }
  }

  return (
    <div className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
      isActive
        ? 'border-blue-200 bg-blue-50'
        : agent.status === 'done'
          ? 'border-green-100 bg-green-50/50'
          : 'border-gray-200 bg-white'
    }`}>
      {statusIcon()}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${
          agent.status === 'done' ? 'text-green-700' : 'text-gray-900'
        }`}>
          {agent.label}
        </p>
        <p className="text-xs text-gray-400 truncate">{agent.role}</p>
      </div>
    </div>
  )
}
