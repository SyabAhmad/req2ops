import UploadForm from '../components/UploadForm.jsx'

export default function UploadPage({ onSubmit, loading }) {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-16">
      <div className="w-full max-w-2xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Upload everything at once
          </h2>
          <p className="mt-2 text-sm text-gray-500 max-w-lg mx-auto">
            Paste text, drop PDFs, audio recordings, screenshots, or notes. Req2Ops handles each type automatically — transcribes, extracts, and structures it all into one execution plan.
          </p>
        </div>
        <UploadForm onSubmit={onSubmit} loading={loading} />
      </div>
    </div>
  )
}
