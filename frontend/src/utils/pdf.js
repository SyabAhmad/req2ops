export function downloadPlanPDF() {
  const el = document.getElementById('pdf-all-plans')
  if (!el) return

  el.style.position = 'fixed'
  el.style.left = '0'
  el.style.top = '0'
  el.style.zIndex = '99999'
  el.style.width = '210mm'
  el.style.background = '#fff'
  el.style.padding = '20mm'

  document.body.classList.add('printing-pdf')

  setTimeout(() => {
    window.print()
    document.body.classList.remove('printing-pdf')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    el.style.top = '0'
    el.style.zIndex = ''
  }, 200)
}
