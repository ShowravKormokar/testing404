export function formatRating(rating) {
  if (rating === null || rating === undefined || Number.isNaN(Number(rating))) {
    return 'N/A'
  }
  return Number(rating).toFixed(1)
}

export function formatYear(date) {
  if (!date) return 'TBA'
  const year = new Date(date).getFullYear()
  return Number.isNaN(year) ? 'TBA' : String(year)
}

export function formatDate(date) {
  if (!date) return 'TBA'
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return 'TBA'
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatGenres(genres, limit = 2) {
  if (!Array.isArray(genres) || genres.length === 0) return 'Uncategorized'
  const visible = genres.slice(0, limit)
  const remaining = genres.length - visible.length
  return remaining > 0 ? `${visible.join(', ')} +${remaining}` : visible.join(', ')
}

export function posterFallbackLabel(title) {
  return (title || '?').slice(0, 2).toUpperCase()
}

export function sanitizeSummary(html) {
  if (typeof html !== 'string' || html.length === 0) return ''

  const allowedTags = new Set([
    'p', 'br', 'strong', 'b', 'em', 'i', 'ul', 'ol', 'li', 'a', 'span', 'div',
  ])

  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/on\w+\s*=\s*'[^']*'/gi, '')
    .replace(/\sjavascript:\s*[^\s"']+/gi, '')
    .replace(/<(\w+)([^>]*)>/g, (match, tag, attrs) => {
      const lower = tag.toLowerCase()
      if (!allowedTags.has(lower)) return ''
      let safe = ''
      if (lower === 'a') {
        const hrefMatch = attrs.match(/\shref\s*=\s*["']([^"']*)["']/i)
        if (hrefMatch) {
          const url = hrefMatch[1]
          if (/^https?:\/\//i.test(url) || /^mailto:/i.test(url)) {
            safe = ` href="${url}"`
          }
        }
        safe += ' rel="noopener noreferrer" target="_blank"'
      }
      return `<${lower}${safe}>`
    })
    .replace(/<\/(\w+)>/g, (match, tag) => {
      return allowedTags.has(tag.toLowerCase()) ? match : ''
    })
}

export default {
  formatRating,
  formatYear,
  formatDate,
  formatGenres,
  posterFallbackLabel,
  sanitizeSummary,
}