import ProcessingStatus from '../components/ProcessingStatus.jsx'

export default function ProcessingPage({ input, files, onComplete, onError }) {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-16">
      <ProcessingStatus input={input} files={files} onComplete={onComplete} onError={onError} />
    </div>
  )
}
