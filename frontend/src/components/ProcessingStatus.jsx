import { useState, useEffect, useRef } from 'react'
import { uploadRequirementStream } from '../api/client.js'

const INITIAL_AGENTS = [
  { id: 'understanding', label: 'Understanding Requirements', role: 'Senior Requirements Analyst', status: 'pending' },
  { id: 'classifier', label: 'Plan Classifier', role: 'Planning Classifier', status: 'pending' },
]

function makeAgent(planId, planName, role) {
  return { id: planId, label: planName, role, status: 'pending', thinking: null, thinkingDone: false }
}

export default function ProcessingStatus({ input, files, onComplete, onError }) {
  const [agents, setAgents] = useState(INITIAL_AGENTS)
  const [completedResults, setCompletedResults] = useState({})
  const cancelRef = useRef(null)

  useEffect(() => {
    cancelRef.current = uploadRequirementStream({
      text: input,
      files,
      onEvent(event) {
        const ev = event.data.event

        if (ev === 'agent_start') {
          setAgents(prev => prev.map(a =>
            a.id === event.data.agent ? { ...a, status: 'active', plan_name: event.data.plan_name || a.label } : a
          ))
        } else if (ev === 'agent_complete') {
          setAgents(prev => prev.map(a =>
            a.id === event.data.agent ? { ...a, status: 'done' } : a
          ))
          if (event.data.result) {
            setCompletedResults(prev => ({ ...prev, [event.data.agent]: event.data.result }))
          }
        } else if (ev === 'thinking_start') {
          setAgents(prev => {
            const exists = prev.find(a => a.id === event.data.agent)
            if (exists) return prev
            return [...prev, makeAgent(event.data.agent, event.data.plan_name, event.data.role)]
          })
        } else if (ev === 'thinking_complete') {
          setAgents(prev => prev.map(a =>
            a.id === event.data.agent
              ? { ...a, thinking: event.data.thinking, thinkingDone: true }
              : a
          ))
        }
      },
      onComplete(data) {
        setAgents(prev => prev.map(a => {
          if (a.status !== 'done' && a.status !== 'active') return { ...a, status: 'done' }
          return a
        }))
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
      <div className="relative rounded-2xl bg-white border border-gray-200 shadow-[0_0_60px_-12px_rgba(0,0,0,0.12)] px-6 py-8">
        {/* Glow border effect */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gray-200/60 via-transparent to-gray-200/60 -z-10 blur-sm" />

        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold text-gray-900">Processing requirements</h2>
          <p className="mt-1 text-sm text-gray-500">
            {doneCount} of {agents.length} agents completed
          </p>
        </div>

        <div className="relative">
          <div className="agent-scroll max-h-[240px] overflow-y-auto space-y-2 px-1">
            {agents.map(agent => (
              <AgentRow key={agent.id} agent={agent} isActive={activeAgent?.id === agent.id} />
            ))}
          </div>
          {agents.length > 4 && (
            <>
              <div className="pointer-events-none sticky top-0 h-4 bg-gradient-to-b from-white to-transparent" />
              <div className="pointer-events-none sticky bottom-0 -mt-4 h-4 bg-gradient-to-t from-white to-transparent" />
            </>
          )}
        </div>

        {activeAgent && (
          <p className="mt-6 text-center text-sm text-gray-400 animate-pulse">
            {activeAgent.role} is working...
          </p>
        )}
      </div>
    </div>
  )
}

function AgentRow({ agent, isActive }) {
  const [expanded, setExpanded] = useState(false)
  const hasThinking = agent.thinking && agent.thinkingDone

  return (
    <div
      className={`rounded-lg border transition-colors ${
        isActive
          ? 'border-blue-200 bg-blue-50'
          : agent.status === 'done'
            ? 'border-green-100 bg-green-50/50'
            : 'border-gray-200 bg-white'
      }`}
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 ${hasThinking ? 'cursor-pointer' : ''}`}
        onClick={() => hasThinking && setExpanded(!expanded)}
      >
        {statusIcon(agent.status)}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${
            agent.status === 'done' ? 'text-green-700' : 'text-gray-900'
          }`}>
            {agent.label}
          </p>
          <p className="text-xs text-gray-400 truncate">{agent.role}</p>
        </div>
        {hasThinking && (
          <svg className={`h-4 w-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        )}
      </div>
      {expanded && hasThinking && (
        <div className="border-t border-gray-100 px-4 py-3 bg-gray-50/80">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Thinking</p>
          <p className="text-xs leading-relaxed text-gray-600 whitespace-pre-wrap">{agent.thinking}</p>
        </div>
      )}
    </div>
  )
}

function statusIcon(status) {
  switch (status) {
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
