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

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <img src="/header-logo.png" alt="Req2Ops" className="h-7 w-auto mb-4" />
              <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
                Turn messy client requirements into structured execution plans that teams can actually run.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2.5">
                {['How It Works', 'Upload', 'Pricing', 'Changelog'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2.5">
                {['About', 'Blog', 'Careers', 'Contact'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2.5">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Req2Ops. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="X">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="GitHub">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="YouTube">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
