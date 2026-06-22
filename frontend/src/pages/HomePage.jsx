import heroImage from '../assets/hero.png'
import TrustedMarquee from '../components/TrustedMarquee.jsx'

export default function HomePage({ onNavigate }) {
  return (
    <div>
      <section className="border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 py-24 sm:py-32 lg:flex-row lg:py-40">
            <div className="max-w-3xl flex-1">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Turn messy requirements into{" "}
                <span className="text-blue-600">execution plans</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-500 sm:text-xl">
                Not documents. Not summaries. Req2Ops converts client briefs, emails, and PDFs into a structured workspace — architecture, tasks, risks, and next actions — ready for your team to run.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('upload')}
                  className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  Upload Requirements
                </button>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  See How It Works
                </button>
              </div>
            </div>
            <div className="shrink-0">
              <img src={heroImage} alt="Req2Ops workflow illustration" className="h-auto w-full max-w-md rounded-2xl border border-gray-200" />
            </div>
          </div>
        </div>
      </section>

      <TrustedMarquee />

      <section className="border-b border-gray-100 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97c.48.218.94.48 1.375.786M18.75 4.97l-3.75 2.25m3.75-2.25l2.25 1.312M5.25 4.97c-.48.218-.94.48-1.375.786M5.25 4.97l3.75 2.25M5.25 4.97l-2.25 1.312" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Understanding Engine</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Extracts project goals, implicit requirements, missing info, assumptions, and risk areas — the cleaned truth of what the client actually wants.
              </p>
            </div>
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Execution Structure</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Developer architecture, API specs, DB schema, designer screens, task graph with dependencies, priorities (P0/P1/P2), and effort estimates.
              </p>
            </div>
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Execution Control</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Missing info detection, next action engine, follow-up triggers, and visibility layer. Always knows what is done, blocked, or pending clarification.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Who it's for
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { title: 'Software Agencies', desc: '5-50 people drowning in scattered requirements across clients. Stop losing money on miscommunication and follow-ups.' },
              { title: 'Freelance Teams', desc: 'Designers and developers juggling multiple projects. Get structured plans without hiring a PM.' },
              { title: 'Startup Founders', desc: 'Building MVPs with limited time. Go from idea to execution plan in minutes, not days.' },
            ].map(item => (
              <div key={item.title} className="rounded-xl border border-gray-200 p-6">
                <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              What makes Req2Ops different
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Everyone builds AI summarizers. We built an AI execution system that behaves like a PM and Tech Lead hybrid.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              'Lost follow-ups = lost revenue — we track every missing detail',
              'Unclear requirements = wasted dev time — we extract the truth',
              'Missing info = project delays — we detect it before you start',
              'Scattered execution = inefficiency tax — we structure everything',
            ].map(item => (
              <div key={item} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <p className="text-sm text-gray-600">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('upload')}
              className="rounded-lg bg-gray-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Start Building
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
