import { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'
import { TrendingUp, TrendingDown, Eye, Share2, BookmarkPlus, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import MainLayout, { PageContainer, PageHeader, Section } from '../components/layout/MainLayout'
import { Card, Badge, StatCard } from '../components/ui/FormElements'
import Button from '../components/ui/Button'
import { marketData, marketIndices } from '../data/mockData'
import { fadeInUp, staggerContainer } from '../utils/animations'

// Top Gainers & Losers
const gainers = [
  { name: 'Bajaj Auto', symbol: 'BAJAJ', price: 9850, change: 4.2 },
  { name: 'Hindustan Zinc', symbol: 'HINDZINC', price: 450, change: 3.8 },
  { name: 'Coal India', symbol: 'COALINDIA', price: 520, change: 3.5 },
]

const losers = [
  { name: 'Dr Reddy Labs', symbol: 'DRREDDY', price: 6800, change: -2.3 },
  { name: 'Cipla', symbol: 'CIPLA', price: 1450, change: -1.9 },
  { name: 'Mindtree', symbol: 'MINDTREE', price: 3200, change: -1.5 },
]

const indicesHistory = [
  { time: '9:30', SENSEX: 72500, NIFTY: 22100 },
  { time: '10:30', SENSEX: 72650, NIFTY: 22180 },
  { time: '11:30', SENSEX: 72400, NIFTY: 22050 },
  { time: '12:30', SENSEX: 72750, NIFTY: 22250 },
  { time: '13:30', SENSEX: 72900, NIFTY: 22350 },
  { time: '14:30', SENSEX: 73100, NIFTY: 22450 },
  { time: '15:30', SENSEX: 73250, NIFTY: 22550 },
]

export default function Market() {
  const [selectedIndex, setSelectedIndex] = useState('SENSEX')
  const [watchlist, setWatchlist] = useState([])

  const toggleWatchlist = (stock) => {
    setWatchlist(prev =>
      prev.find(s => s.symbol === stock.symbol)
        ? prev.filter(s => s.symbol !== stock.symbol)
        : [...prev, stock]
    )
  }

  return (
    <MainLayout>
      <PageContainer>
        <PageHeader
          title="Markets"
          subtitle="Real-time market data and insights"
        />

        {/* Market Indices */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {marketIndices.map((index, idx) => (
            <motion.div key={idx} variants={fadeInUp}>
              <Card
                onClick={() => setSelectedIndex(index.name)}
                className={`cursor-pointer transition-all ${selectedIndex === index.name ? 'ring-2 ring-electric-400' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-400">{index.name}</p>
                  {index.changePercent > 0 ? (
                    <TrendingUp size={16} className="text-neon-400" />
                  ) : (
                    <TrendingDown size={16} className="text-red-400" />
                  )}
                </div>
                <p className="text-2xl font-bold text-white">{index.value.toLocaleString()}</p>
                <p className={`text-xs mt-2 ${index.changePercent > 0 ? 'text-neon-400' : 'text-red-400'}`}>
                  {index.changePercent > 0 ? '+' : ''}{index.changePercent}% • {index.change} pts
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{selectedIndex} - Today</h3>
              <div className="flex gap-2">
                {['1D', '5D', '1M', '3M', '1Y'].map(tf => (
                  <button
                    key={tf}
                    className="px-3 py-1 text-xs font-semibold rounded-lg hover:bg-electric-400/10 transition-colors text-gray-300 hover:text-electric-400"
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={indicesHistory}>
                <defs>
                  <linearGradient id="colorSensex" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" />
                <XAxis dataKey="time" stroke="#8b9cc8" />
                <YAxis stroke="#8b9cc8" />
                <Tooltip
                  contentStyle={{ background: '#0d1626', border: '1px solid #1a2540', borderRadius: '8px' }}
                  formatter={(value) => value.toLocaleString()}
                />
                <Area
                  type="monotone"
                  dataKey={selectedIndex}
                  stroke="#00D4FF"
                  fill="url(#colorSensex)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Top Gainers */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-neon-400" /> Top Gainers
              </h3>
              <div className="space-y-3">
                {gainers.map((stock, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="p-3 rounded-xl bg-dark-card/50 border border-dark-border/50 hover:border-neon-400/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-white group-hover:text-neon-400 transition-colors">{stock.name}</p>
                        <p className="text-xs text-gray-500">{stock.symbol}</p>
                      </div>
                      <Badge variant="green">+{stock.change}%</Badge>
                    </div>
                    <p className="text-sm text-gray-400">₹{stock.price.toLocaleString()}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Top Losers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingDown size={20} className="text-red-400" /> Top Losers
              </h3>
              <div className="space-y-3">
                {losers.map((stock, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="p-3 rounded-xl bg-dark-card/50 border border-dark-border/50 hover:border-red-400/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-white group-hover:text-red-400 transition-colors">{stock.name}</p>
                        <p className="text-xs text-gray-500">{stock.symbol}</p>
                      </div>
                      <Badge variant="red">{stock.change}%</Badge>
                    </div>
                    <p className="text-sm text-gray-400">₹{stock.price.toLocaleString()}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Market Heatmap Info */}
        <Section title="Market Sectors" subtitle="Sector-wise performance">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {[
              { name: 'IT', change: 2.5, color: '#00D4FF' },
              { name: 'Banking', change: 1.8, color: '#00FF88' },
              { name: 'Auto', change: 3.2, color: '#7B61FF' },
              { name: 'Pharma', change: -0.5, color: '#FF6B9D' },
              { name: 'Energy', change: 2.1, color: '#FFD700' },
            ].map((sector, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
              >
                <Card className="text-center cursor-pointer hover:border-electric-400/30 transition-all">
                  <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ background: `${sector.color}20`, border: `2px solid ${sector.color}` }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-sm font-bold" style={{ color: sector.color }}>
                        {sector.change > 0 ? '+' : ''}{sector.change}%
                      </span>
                    </div>
                  </div>
                  <p className="font-semibold text-white">{sector.name}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Market Statistics */}
        <Section title="Market Statistics" className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Market Cap', value: '₹362 Trillion', change: '+2.5%' },
              { label: 'Advances', value: '1,850', change: 'Stocks' },
              { label: 'Declines', value: '1,420', change: 'Stocks' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                <Card className="text-center">
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-electric-400 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>
      </PageContainer>
    </MainLayout>
  )
}
