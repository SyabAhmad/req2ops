import { useState, useEffect, useRef } from 'react'
import { uploadRequirementStream } from '../api/client.js'

const INITIAL_AGENTS = [
  { id: 'understanding', label: 'Understanding Requirements', role: 'Senior Requirements Analyst', status: 'pending' },
  { id: 'classifier', label: 'Plan Classifier', role: 'Planning Classifier', status: 'pending' },
]

const FILE_TYPE_ICONS = {
  'PDF Document': '📄',
  'Audio Recording': '🎤',
  'Video File': '🎬',
  'Image': '🖼️',
  'Word Document': '📝',
  'CSV Spreadsheet': '📊',
  'Excel Spreadsheet': '📈',
  'Text File': '📝',
  'File': '📎',
}

function makeAgent(planId, planName, role) {
  return { id: planId, label: planName, role, status: 'pending', thinking: null, thinkingDone: false }
}

export default function ProcessingStatus({ input, files, onComplete, onError, onResult, onAgentStart }) {
  const [agents, setAgents] = useState(INITIAL_AGENTS)
  const [fileList, setFileList] = useState([])
  const cancelRef = useRef(null)

  useEffect(() => {
    cancelRef.current = uploadRequirementStream({
      text: input,
      files,
      onEvent(event) {
        const ev = event.event

        if (ev === 'files_detected') {
          setFileList(event.data.files.map(f => ({
            name: f.name,
            type: f.type,
            status: 'pending',
          })))
        } else if (ev === 'file_start') {
          setFileList(prev => prev.map(f =>
            f.name === event.data.name ? { ...f, status: 'processing' } : f
          ))
        } else if (ev === 'file_complete') {
          setFileList(prev => prev.map(f =>
            f.name === event.data.name ? { ...f, status: 'done' } : f
          ))
        } else if (ev === 'agent_start') {
          setAgents(prev => prev.map(a =>
            a.id === event.data.agent ? { ...a, status: 'active', plan_name: event.data.plan_name || a.label } : a
          ))
          onAgentStart?.({
            id: event.data.agent,
            name: event.data.plan_name || event.data.agent,
          })
        } else if (ev === 'agent_complete') {
          setAgents(prev => prev.map(a =>
            a.id === event.data.agent ? { ...a, status: 'done' } : a
          ))
          if (event.data.result) {
            onResult?.({
              agent: event.data.agent,
              planName: event.data.plan_name,
              result: event.data.result,
              timestamp: Date.now(),
            })
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
  const filesDone = fileList.filter(f => f.status === 'done').length

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative rounded-2xl bg-white border border-gray-200 shadow-[0_0_60px_-12px_rgba(0,0,0,0.12)] px-6 py-8">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gray-200/60 via-transparent to-gray-200/60 -z-10 blur-sm" />

        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-gray-900">Processing requirements</h2>
          <p className="mt-1 text-sm text-gray-500">
            {fileList.length > 0
              ? `${filesDone} of ${fileList.length} files processed · ${doneCount} of ${agents.length} agents completed`
              : `${doneCount} of ${agents.length} agents completed`
            }
          </p>
        </div>

        {/* File processing section */}
        {fileList.length > 0 && (
          <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50/80 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Files</p>
            <div className="space-y-1.5">
              {fileList.map(file => (
                <div key={file.name} className="flex items-center gap-2.5">
                  <span className="text-sm">{FILE_TYPE_ICONS[file.type] || '📎'}</span>
                  <span className="flex-1 text-sm text-gray-700 truncate">{file.name}</span>
                  <span className="text-[10px] font-medium uppercase text-gray-400 w-16 text-right">{file.type.split(' ')[0]}</span>
                  {file.status === 'done' && (
                    <svg className="h-4 w-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                  {file.status === 'processing' && (
                    <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-blue-400/40" />
                      <span className="relative h-2 w-2 rounded-full bg-blue-600" />
                    </span>
                  )}
                  {file.status === 'pending' && (
                    <span className="h-2 w-2 rounded-full bg-gray-300 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agent list */}
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
