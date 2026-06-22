import { useState } from 'react'

const NAV_ITEMS = [
  { label: 'Home', key: 'home' },
  { label: 'How It Works', key: 'how-it-works' },
  { label: 'Upload', key: 'upload' },
]

export default function Layout({ children, activePage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white bg-line-grid text-gray-900 font-sans">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5"
          >
            <img src="/header-logo.png" alt="Req2Ops" className="h-8 w-auto" />
          </button>

          <nav className="hidden items-center gap-6 sm:flex">
            {NAV_ITEMS.map(item => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`text-sm font-medium transition-colors ${
                  activePage === item.key
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate('upload')}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Start Building
            </button>
          </nav>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 sm:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-gray-200 px-4 py-4 sm:hidden">
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.key}
                  onClick={() => { onNavigate(item.key); setMobileOpen(false) }}
                  className={`rounded-lg px-3 py-2 text-sm font-medium text-left transition-colors ${
                    activePage === item.key
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { onNavigate('upload'); setMobileOpen(false) }}
                className="mt-2 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white text-center"
              >
                Start Building
              </button>
            </nav>
          </div>
        )}
      </header>

      <main>
        {children}
      </main>

      <footer className="border-t border-gray-100">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Req2Ops. All rights reserved.</p>
          <p className="text-xs text-gray-400">v0.1.0</p>
        </div>
      </footer>
    </div>
  )
}
