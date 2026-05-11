import { useEffect, useState } from 'react'
import { marketAPI } from '../../api/client'
import { formatPct } from '../../utils/helpers'

export default function StockTicker() {
  const [stocks, setStocks] = useState([
    { symbol: 'RELIANCE', price: 2950, change: 1.2 },
    { symbol: 'TCS', price: 4120, change: -0.5 },
    { symbol: 'INFY', price: 1890, change: 0.8 },
    { symbol: 'HDFC BANK', price: 1680, change: -0.3 },
    { symbol: 'ICICI BANK', price: 1250, change: 1.5 },
    { symbol: 'ITC', price: 470, change: 0.2 },
    { symbol: 'WIPRO', price: 560, change: -0.7 },
    { symbol: 'BAJAJ FIN', price: 7200, change: 2.1 },
    { symbol: 'MARUTI', price: 12800, change: -0.4 },
    { symbol: 'LT', price: 3800, change: 0.9 },
  ])

  useEffect(() => {
    const fetch = () => marketAPI.getTickers().then(r => setStocks(r.data.stocks)).catch(() => {})
    fetch()
    const interval = setInterval(fetch, 30000)
    return () => clearInterval(interval)
  }, [])

  const doubled = [...stocks, ...stocks]

  return (
    <div className="ticker-wrapper w-full bg-dark-card/60 backdrop-blur-sm border-y border-dark-border py-3 overflow-hidden">
      <div className="ticker-content flex gap-8 items-center">
        {doubled.map((s, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0 px-2">
            <span className="font-mono text-xs font-semibold text-gray-300">{s.symbol}</span>
            <span className="font-mono text-xs">₹{s.price.toLocaleString('en-IN')}</span>
            <span className={`font-mono text-xs font-bold ${s.change >= 0 ? 'text-neon-400' : 'text-red-400'}`}>
              {s.change >= 0 ? '▲' : '▼'} {Math.abs(s.change).toFixed(2)}%
            </span>
            <span className="text-dark-border ml-2">|</span>
          </div>
        ))}
      </div>
    </div>
  )
}
