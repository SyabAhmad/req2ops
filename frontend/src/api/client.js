const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const API_PREFIX = import.meta.env.VITE_API_PREFIX || '/api/v1'
const PROJECTS_PATH = import.meta.env.VITE_API_PROJECTS_PATH || '/projects'
const UPLOAD_PATH = import.meta.env.VITE_API_UPLOAD_PATH || '/upload'
const WORKSPACE_PATH = import.meta.env.VITE_API_WORKSPACE_PATH || '/workspace'

export async function uploadRequirement({ text, file }) {
  const form = new FormData()
  if (text) form.append('text', text)
  if (file) form.append('file', file)

  const res = await fetch(`${API_BASE}${API_PREFIX}${PROJECTS_PATH}${UPLOAD_PATH}`, {
    method: 'POST',
    body: form,
  })
  if (!res.ok) throw new Error('Upload failed')
  return res.json()
}

export async function getWorkspace(projectId) {
  const res = await fetch(`${API_BASE}${API_PREFIX}${PROJECTS_PATH}/${projectId}${WORKSPACE_PATH}`)
  if (!res.ok) throw new Error('Failed to fetch workspace')
  return res.json()
}
