import { useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout.jsx'
import PageTransition from './components/PageTransition.jsx'
import HomePage from './pages/HomePage.jsx'
import HowItWorksPage from './pages/HowItWorksPage.jsx'
import UploadPage from './pages/UploadPage.jsx'
import ProcessingPage from './pages/ProcessingPage.jsx'
import WorkspacePage from './pages/WorkspacePage.jsx'

const PAGES = {
  home: HomePage,
  'how-it-works': HowItWorksPage,
  upload: UploadPage,
  processing: ProcessingPage,
  workspace: WorkspacePage,
}

export default function App() {
  const [page, setPage] = useState('home')
  const [workspaceData, setWorkspaceData] = useState(null)
  const [loading, setLoading] = useState(false)
  const submitRef = useRef({ text: '', files: [] })

  const handleSubmit = ({ text, files }) => {
    submitRef.current = { text, files }
    setPage('processing')
  }

  const handleProcessingComplete = (data) => {
    setWorkspaceData(data)
    setPage('workspace')
  }

  const handleProcessingError = () => {
    setPage('upload')
  }

  const pageProps = {
    home: { onNavigate: setPage },
    'how-it-works': {},
    upload: { onSubmit: handleSubmit, loading },
    processing: {
      input: submitRef.current.text,
      files: submitRef.current.files,
      onComplete: handleProcessingComplete,
      onError: handleProcessingError,
    },
    workspace: { data: workspaceData, onHome: () => setPage('home') },
  }

  const PageComponent = PAGES[page]

  return (
    <Layout activePage={page} onNavigate={setPage}>
      <AnimatePresence mode="wait">
        <PageTransition key={page}>
          <PageComponent {...pageProps[page]} />
        </PageTransition>
      </AnimatePresence>
    </Layout>
  )
}
