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

export function ObjectList({ items, keyField, fields }) {
  if (!isArr(items) || !items.length) return null
  return <ul className="space-y-1.5">{items.map((item, i) => (
    <li key={item[keyField] || i} className="flex items-start gap-2.5 text-sm text-gray-600">
      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
      <span className="font-medium text-gray-900">{txt(item[keyField])}</span>
      {fields && fields.map(f => (
        <span key={f} className="text-gray-500 ml-2">{f}: {txt(item[f])}</span>
      ))}
    </li>
  ))}</ul>
}

export function ComponentStates({ items }) {
  if (!isArr(items) || !items.length) return null
  return <div className="flex flex-wrap gap-1">{items.map((st, j) => (
    <span key={j} className="text-[10px] bg-white border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded">
      {txt(st.state)}: {txt(st.description)}
    </span>
  ))}</div>
}

export function FlowSteps({ items }) {
  if (!isArr(items) || !items.length) return null
  return <ol className="space-y-1">{items.map((step, j) => (
    <li key={step.step || j} className="flex items-start gap-2 text-xs text-gray-600">
      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[9px] font-bold text-gray-400">{step.step || j + 1}</span>
      {txt(step.description || step)}
    </li>
  ))}</ol>
}
