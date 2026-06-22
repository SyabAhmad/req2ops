const ROW_1 = [
  'Software Agencies',
  'Startup Founders',
  'Freelance Teams',
  'Product Studios',
  'Dev Shops',
  'MVP Builders',
  'Consultancies',
  'Remote Teams',
]

const ROW_2 = [
  'Agencies',
  'Founders',
  'Freelancers',
  'Studios',
  'Dev Houses',
  'Builders',
  'Advisors',
  'Distributed Teams',
]

function MarqueeRow({ items, reverse }) {
  return (
    <div className={`flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} gap-4 min-w-max`}>
      {[...items, ...items].map((item, i) => (
        <div
          key={i}
          className="rounded-lg border border-gray-200 bg-white px-5 py-3"
        >
          <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
            {item}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function TrustedMarquee() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center border-b border-gray-100 overflow-hidden bg-gray-50/50">
      <div className="mb-14 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mb-2">
          Trusted by
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Teams that ship with clarity
        </h2>
      </div>

      <div className="relative w-full marquee-fade space-y-4">
        <MarqueeRow items={ROW_1} reverse={false} />
        <MarqueeRow items={ROW_2} reverse={true} />
      </div>
    </section>
  )
}
