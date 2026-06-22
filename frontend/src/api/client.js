const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const API_PREFIX = import.meta.env.VITE_API_PREFIX || '/api/v1'
const PROJECTS_PATH = import.meta.env.VITE_API_PROJECTS_PATH || '/projects'
const UPLOAD_PATH = import.meta.env.VITE_API_UPLOAD_PATH || '/upload'
const WORKSPACE_PATH = import.meta.env.VITE_API_WORKSPACE_PATH || '/workspace'

export async function uploadRequirement({ text, files }) {
  const form = new FormData()
  if (text) form.append('text', text)
  if (files?.length) {
    for (const file of files) {
      form.append('files', file)
    }
  }

  const res = await fetch(`${API_BASE}${API_PREFIX}${PROJECTS_PATH}${UPLOAD_PATH}`, {
    method: 'POST',
    body: form,
  })
  if (!res.ok) throw new Error('Upload failed')
  return res.json()
}

export function uploadRequirementStream({ text, files, onEvent, onComplete, onError }) {
  const form = new FormData()
  if (text) form.append('text', text)
  if (files?.length) {
    for (const file of files) {
      form.append('files', file)
    }
  }

  const controller = new AbortController()

  fetch(`${API_BASE}${API_PREFIX}${PROJECTS_PATH}${UPLOAD_PATH}/stream`, {
    method: 'POST',
    body: form,
    signal: controller.signal,
  })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.text()
        onError?.(new Error(err))
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const parts = buffer.split('\n\n')
        buffer = parts.pop() || ''

        for (const part of parts) {
          const event = parseSSE(part)
          if (event) {
            if (event.event === 'complete') {
              onComplete?.(event.data.workspace)
            } else {
              onEvent?.(event)
            }
          }
        }
      }
    })
    .catch((err) => {
      if (err.name !== 'AbortError') onError?.(err)
    })

  return () => controller.abort()
}

function parseSSE(text) {
  const lines = text.split('\n')
  let event = null
  let data = null

  for (const line of lines) {
    if (line.startsWith('event: ')) {
      event = line.slice(7).trim()
    } else if (line.startsWith('data: ')) {
      try {
        data = JSON.parse(line.slice(6))
      } catch {
        data = line.slice(6).trim()
      }
    }
  }

  if (event && data) return { event, data }
  return null
}

export async function getWorkspace(projectId) {
  const res = await fetch(`${API_BASE}${API_PREFIX}${PROJECTS_PATH}/${projectId}${WORKSPACE_PATH}`)
  if (!res.ok) throw new Error('Failed to fetch workspace')
  return res.json()
}
