const STEPS = [
  {
    num: '01',
    title: 'Upload Requirements',
    desc: 'Paste client text, upload a PDF, or drop in email and WhatsApp notes. The system accepts any format.',
  },
  {
    num: '02',
    title: 'AI Understanding Engine',
    desc: 'A multi-prompt pipeline extracts project goals, implicit requirements, missing info, assumptions, and risk areas.',
  },
  {
    num: '03',
    title: 'Execution Structure Generated',
    desc: 'Developer architecture, APIs, DB schema, designer screens, task graph with dependencies, priorities, and effort estimates.',
  },
  {
    num: '04',
    title: 'Control Layer Applied',
    desc: 'Missing info detection, next actions, follow-up triggers, and visibility tracking — so nothing falls through the cracks.',
  },
  {
    num: '05',
    title: 'Workspace Ready',
    desc: 'A structured workspace with 5 tabs: Developer View, Designer View, Tasks, Risks, and Next Actions. Ready to execute.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How it works
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            From messy input to structured execution plan in 5 pipeline stages.
          </p>
        </div>

        <div className="mt-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-2xl py-12 space-y-12">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex flex-col gap-4 sm:flex-row sm:gap-8">
              <div className="flex sm:w-24 shrink-0">
                <span className="text-3xl font-bold text-gray-200">{step.num}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500 max-w-xl">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="mt-6 h-px w-full bg-gray-100" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-gray-100 pt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">Ready to try it?</p>
          <a
            href="/upload"
            className="inline-block rounded-lg bg-gray-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Upload Your First Requirement
          </a>
        </div>
      </div>
    </div>
  )
}
