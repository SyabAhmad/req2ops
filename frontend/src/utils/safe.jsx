export function txt(v) {
  if (v === null || v === undefined) return ''
  if (typeof v === 'string') return v
  if (typeof v === 'object') return JSON.stringify(v, null, 2)
  return String(v)
}

export function map(arr, fn) {
  return Array.isArray(arr) ? arr.map(fn) : null
}

export function entries(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return []
  return Object.entries(obj)
}

export function isArr(v) {
  return Array.isArray(v)
}

export function DictDisplay({ data }) {
  const e = entries(data)
  if (!e.length) return null
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {e.map(([key, val]) => (
        <div key={key} className="rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{key.replace(/_/g, ' ')}</p>
          <p className="mt-0.5 text-sm text-gray-700">{txt(val)}</p>
        </div>
      ))}
    </div>
  )
}

export function List({ items }) {
  if (!isArr(items) || !items.length) return null
  return <ul className="space-y-1.5">{items.map((item, i) => (
    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
      {txt(item)}
    </li>
  ))}</ul>
}

export function Section({ title, children }) {
  return <div><h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">{title}</h3>{children}</div>
}
