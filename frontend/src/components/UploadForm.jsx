import { useState, useRef, useCallback } from 'react'

const ACCEPT_TYPES = import.meta.env.VITE_UPLOAD_ACCEPT || '.pdf,.txt,.docx,.doc,.csv,.xlsx,.xls,.mp3,.wav,.m4a,.aac,.ogg,.flac,.webm,.mp4,.mkv,.avi,.mov,.png,.jpg,.jpeg,.gif,.webp'
const PLACEHOLDER_TEXT = import.meta.env.VITE_UPLOAD_PLACEHOLDER || 'Paste client requirements, email, WhatsApp notes here...'
const BTN_LABEL = import.meta.env.VITE_UPLOAD_BTN_LABEL || 'Generate Execution Plan'

function getFileType(name) {
  const ext = name.split('.').pop().toLowerCase()
  if (['pdf'].includes(ext)) return 'pdf'
  if (['mp3', 'wav', 'm4a', 'aac', 'ogg', 'wma', 'flac', 'webm'].includes(ext)) return 'audio'
  if (['mp4', 'mkv', 'avi', 'mov', 'flv', 'wmv'].includes(ext)) return 'video'
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'].includes(ext)) return 'image'
  if (['docx', 'doc'].includes(ext)) return 'docx'
  if (['csv', 'tsv'].includes(ext)) return 'csv'
  if (['xlsx', 'xls'].includes(ext)) return 'xlsx'
  if (['txt', 'md', 'json', 'xml'].includes(ext)) return 'text'
  return 'text'
}

const FILE_ICONS = {
  pdf: '📄',
  audio: '🎤',
  video: '🎬',
  image: '🖼️',
  docx: '📝',
  csv: '📊',
  xlsx: '📈',
  text: '📝',
}

const FILE_LABELS = {
  pdf: 'Document',
  audio: 'Audio',
  video: 'Video',
  image: 'Image',
  docx: 'Word',
  csv: 'CSV',
  xlsx: 'Excel',
  text: 'Text',
}

export default function UploadForm({ onSubmit, loading }) {
  const [text, setText] = useState('')
  const [files, setFiles] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef(null)

  const addFiles = useCallback((incoming) => {
    const list = Array.from(incoming)
    setFiles(prev => {
      const names = new Set(prev.map(f => f.name))
      const unique = list.filter(f => !names.has(f.name))
      return [...prev, ...unique]
    })
  }, [])

  const removeFile = useCallback((name) => {
    setFiles(prev => prev.filter(f => f.name !== name))
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
  }, [addFiles])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragOver(false)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text && !files.length) return
    onSubmit({ text, files })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Paste requirements
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder={PLACEHOLDER_TEXT}
        />
      </div>

      <div className="relative">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
            dragOver
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
          }`}
        >
          <div className="flex justify-center gap-3 mb-4">
            <span className="text-2xl">📄</span>
            <span className="text-2xl">🎤</span>
            <span className="text-2xl">🎬</span>
            <span className="text-2xl">🖼️</span>
          </div>
          <p className="text-sm font-medium text-gray-700">
            Drop files here or click to browse
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PDF, Word, Excel, CSV, images, audio, videos, text — upload everything at once
          </p>
        </div>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept={ACCEPT_TYPES}
          className="hidden"
          onChange={(e) => { if (e.target.files.length) addFiles(e.target.files); e.target.value = '' }}
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {files.length} file{files.length > 1 ? 's' : ''} attached
          </p>
          <div className="flex flex-wrap gap-2">
            {files.map(file => {
              const type = getFileType(file.name)
              return (
                <div
                  key={file.name}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm"
                >
                  <span>{FILE_ICONS[type]}</span>
                  <span className="text-gray-700 max-w-[160px] truncate">{file.name}</span>
                  <span className="text-[10px] font-medium uppercase text-gray-400">{FILE_LABELS[type]}</span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeFile(file.name) }}
                    className="ml-1 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={(!text && !files.length) || loading}
        className="inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Processing...
          </span>
        ) : (
          BTN_LABEL
        )}
      </button>
    </form>
  )
}
