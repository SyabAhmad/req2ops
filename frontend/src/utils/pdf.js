export function downloadPlanPDF() {
  const el = document.getElementById('pdf-all-plans')
  if (!el) return

  const parent = el.parentElement
  document.body.appendChild(el)

  setTimeout(() => {
    window.print()
    parent.appendChild(el)
  }, 100)
}
