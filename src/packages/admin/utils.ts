export function exportJson(obj: any, filename: string) {
  const element = document.createElement('a')
  element.setAttribute('href', `data:json/plain;charset=utf-8,` + encodeURIComponent(JSON.stringify(obj, null, 2)))
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
