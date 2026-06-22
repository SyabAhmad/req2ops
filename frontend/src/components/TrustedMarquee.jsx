const ITEMS = [
  'Software Agencies',
  'Startup Founders',
  'Freelance Teams',
  'Product Studios',
  'Dev Shops',
  'MVP Builders',
  'Consultancies',
  'Remote Teams',
]

export default function TrustedMarquee() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center border-b border-gray-100 overflow-hidden">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mb-12">
        Trusted by
      </p>
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee gap-24 min-w-max">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
