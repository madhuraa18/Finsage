export function formatCurrency(amount, compact = false) {
  if (compact) {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
    return `₹${amount}`
  }
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

export function formatNumber(n, compact = false) {
  if (compact) {
    if (n >= 10000000) return `${(n / 10000000).toFixed(2)}Cr`
    if (n >= 100000) return `${(n / 100000).toFixed(2)}L`
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return `${n}`
  }
  return new Intl.NumberFormat('en-IN').format(n)
}

export function formatPct(n, decimals = 2) {
  const formatted = Math.abs(n).toFixed(decimals)
  return `${n >= 0 ? '+' : '-'}${formatted}%`
}

export function clsx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function getChangeColor(value) {
  if (value > 0) return 'text-neon-400'
  if (value < 0) return 'text-red-400'
  return 'text-gray-400'
}

export function getRiskColor(risk) {
  const colors = { Low: 'text-neon-400', Medium: 'text-yellow-400', High: 'text-red-400' }
  return colors[risk] || 'text-gray-400'
}

export function getScoreColor(score) {
  if (score >= 80) return '#00FF88'
  if (score >= 60) return '#00D4FF'
  if (score >= 40) return '#FFAA00'
  return '#FF4D6D'
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function truncate(str, n = 80) {
  return str.length > n ? str.slice(0, n) + '...' : str
}
