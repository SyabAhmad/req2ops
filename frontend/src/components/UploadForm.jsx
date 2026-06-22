import { useState, useRef } from 'react'

const ACCEPT_TYPES = import.meta.env.VITE_UPLOAD_ACCEPT || '.pdf,.txt'
const PLACEHOLDER_TEXT = import.meta.env.VITE_UPLOAD_PLACEHOLDER || 'Paste client requirements, email, WhatsApp notes here...'
const BTN_LABEL = import.meta.env.VITE_UPLOAD_BTN_LABEL || 'Generate Execution Plan'
const UPLOAD_BTN_LABEL = import.meta.env.VITE_UPLOAD_FILE_BTN || 'Upload PDF'

export default function UploadForm({ onSubmit, loading }) {
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const fileRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text && !file) return
    onSubmit({ text, file })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Requirements
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder={PLACEHOLDER_TEXT}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs text-gray-400">or</span>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-900"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          {file ? file.name : UPLOAD_BTN_LABEL}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept={ACCEPT_TYPES}
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {file && (
          <button
            type="button"
            onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = '' }}
            className="text-xs text-gray-400 underline transition-colors hover:text-red-500"
          >
            Remove
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={(!text && !file) || loading}
        className="inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
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
