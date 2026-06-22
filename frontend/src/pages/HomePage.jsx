import heroVideo from '../assets/hero-video.mp4'
import TrustedMarquee from '../components/TrustedMarquee.jsx'

export default function HomePage({ onNavigate }) {
  return (
    <div>
      <section className="border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 py-10 sm:py-16 lg:flex-row lg:py-20">
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
              <video src={heroVideo} autoPlay loop muted playsInline className="h-auto w-full max-w-md rounded-2xl border border-gray-200" />
            </div>
          </div>
        </div>
      </section>

      <TrustedMarquee />

      <section className="border-b border-gray-100 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Three layers of intelligence
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              From raw input to execution-ready plans — the pipeline that makes Req2Ops different.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 mb-5">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.25a1.5 1.5 0 0 1 0-1.5 11.25 11.25 0 0 1 19.928 0 .75.75 0 0 1 0 .75 11.25 11.25 0 0 1-19.928 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900">Understanding Engine</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Extracts project goals, implicit requirements, missing info, assumptions, and risk areas — the cleaned truth of what the client actually wants.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 mb-5">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900">Execution Structure</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Developer architecture, API specs, DB schema, designer screens, task graph with dependencies, priorities (P0/P1/P2), and effort estimates.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 mb-5">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900">Execution Control</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Missing info detection, next action engine, follow-up triggers, and visibility layer. Always knows what is done, blocked, or pending clarification.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 py-20 sm:py-28 bg-gray-50/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Who it's for
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Built for the teams that deal with messy requirements every day.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              { stat: '10K+', label: 'hours saved annually', title: 'Software Agencies', desc: '5-50 people drowning in scattered requirements across clients. Stop losing money on miscommunication and follow-ups.' },
              { stat: '2x', label: 'faster project delivery', title: 'Freelance Teams', desc: 'Designers and developers juggling multiple projects. Get structured plans without hiring a PM.' },
              { stat: '83%', label: 'fewer clarification rounds', title: 'Startup Founders', desc: 'Building MVPs with limited time. Go from idea to execution plan in minutes, not days.' },
            ].map(item => (
              <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-8 text-center">
                <p className="text-4xl font-bold tracking-tight text-gray-900">{item.stat}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">{item.label}</p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-gray-900 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              What makes Req2Ops different
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Everyone builds AI summarizers. We built an AI execution system that behaves like a PM and Tech Lead hybrid.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { stat: '47%', label: 'revenue lost to follow-ups', desc: 'We track every missing detail so nothing slips.' },
              { stat: '12h', label: 'saved per week per dev', desc: 'We extract the truth — no more back-and-forth.' },
              { stat: '3d', label: 'average delay from missing info', desc: 'We detect it before you start building.' },
              { stat: '2x', label: 'faster team velocity', desc: 'Structured execution, zero inefficiency tax.' },
            ].map(item => (
              <div key={item.stat} className="rounded-xl border border-gray-800 bg-gray-800/50 p-6 text-center">
                <p className="text-3xl font-bold tracking-tight text-white">{item.stat}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">{item.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <button
              onClick={() => onNavigate('upload')}
              className="rounded-lg bg-white px-8 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
            >
              Start Building
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
