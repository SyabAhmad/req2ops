import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout.jsx'
import PageTransition from './components/PageTransition.jsx'
import HomePage from './pages/HomePage.jsx'
import HowItWorksPage from './pages/HowItWorksPage.jsx'
import UploadPage from './pages/UploadPage.jsx'
import ProcessingPage from './pages/ProcessingPage.jsx'
import WorkspacePage from './pages/WorkspacePage.jsx'
import { uploadRequirement } from './api/client.js'

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

  const handleSubmit = async ({ text, file }) => {
    setLoading(true)
    setPage('processing')
    try {
      const result = await uploadRequirement({ text, file })
      setWorkspaceData(result)
      setPage('workspace')
    } catch {
      setPage('upload')
    } finally {
      setLoading(false)
    }
  }

  const pageProps = {
    home: { onNavigate: setPage },
    'how-it-works': {},
    upload: { onSubmit: handleSubmit, loading },
    processing: {},
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
