export function formatDate(dateString: string, locale = 'es-ES'): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'hace unos segundos'
  if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)} minutos`
  if (diffInSeconds < 86400) return `hace ${Math.floor(diffInSeconds / 3600)} horas`
  if (diffInSeconds < 604800) return `hace ${Math.floor(diffInSeconds / 86400)} días`
  if (diffInSeconds < 2592000) return `hace ${Math.floor(diffInSeconds / 604800)} semanas`
  if (diffInSeconds < 31536000) return `hace ${Math.floor(diffInSeconds / 2592000)} meses`
  return `hace ${Math.floor(diffInSeconds / 31536000)} años`
}
