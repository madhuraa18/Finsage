import { useState } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Plus, Filter, Download, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'
import MainLayout, { PageContainer, PageHeader, Section } from '../components/layout/MainLayout'
import { Card, StatCard, Badge } from '../components/ui/FormElements'
import Button from '../components/ui/Button'
import { portfolioHoldings, marketData } from '../data/mockData'
import { fadeInUp, staggerContainer } from '../utils/animations'

// Sector allocation
const sectorAllocation = [
  { name: 'IT', value: 35, color: '#00D4FF' },
  { name: 'Banking', value: 28, color: '#00FF88' },
  { name: 'Energy', value: 15, color: '#7B61FF' },
  { name: 'Pharma', value: 12, color: '#FF6B9D' },
  { name: 'Others', value: 10, color: '#FFD700' },
]

const performanceData = [
  { month: 'Jan', portfolio: 4800, benchmark: 4600 },
  { month: 'Feb', portfolio: 5100, benchmark: 4900 },
  { month: 'Mar', portfolio: 5400, benchmark: 5100 },
  { month: 'Apr', portfolio: 5800, benchmark: 5300 },
  { month: 'May', portfolio: 6200, benchmark: 5700 },
  { month: 'Jun', portfolio: 6800, benchmark: 6100 },
]

export default function Portfolio() {
  const [sortBy, setSortBy] = useState('value')
  const [timeframe, setTimeframe] = useState('6M')

  const totalValue = 5234500
  const totalInvested = 4500000
  const totalGains = totalValue - totalInvested
  const gainPercent = (totalGains / totalInvested * 100).toFixed(1)

  // Sort holdings
  const sortedHoldings = [...portfolioHoldings].sort((a, b) => {
    if (sortBy === 'value') return b.shares * b.price - a.shares * a.price
    if (sortBy === 'gain') return b.change - a.change
    return a.name.localeCompare(b.name)
  })

  return (
    <MainLayout>
      <PageContainer>
        <PageHeader
          title="Portfolio"
          subtitle="Manage and analyze your investments"
          action={
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex items-center gap-2">
                <Download size={16} /> Export
              </Button>
              <Button variant="primary" size="sm" className="flex items-center gap-2">
                <Plus size={16} /> Add Investment
              </Button>
            </div>
          }
        />

        {/* Key Metrics */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <motion.div variants={fadeInUp}>
            <StatCard
              icon={TrendingUp}
              label="Portfolio Value"
              value={`₹${(totalValue / 100000).toFixed(1)}L`}
              change="+2.3%"
              trend="up"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <StatCard
              icon={TrendingDown}
              label="Total Invested"
              value={`₹${(totalInvested / 100000).toFixed(1)}L`}
              change="Principal"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <StatCard
              icon={TrendingUp}
              label="Total Gains"
              value={`₹${(totalGains / 100000).toFixed(1)}L`}
              change={`+${gainPercent}%`}
              trend="up"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <StatCard
              icon={AlertCircle}
              label="Holdings"
              value={portfolioHoldings.length}
              change="5 sectors"
            />
          </motion.div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Sector Allocation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <h3 className="text-lg font-bold text-white mb-4">Sector Allocation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sectorAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={CustomLabel}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {sectorAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#0d1626', border: '1px solid #1a2540', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {sectorAllocation.map((sector, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: sector.color }} />
                      <span className="text-gray-400">{sector.name}</span>
                    </div>
                    <span className="text-white font-semibold">{sector.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Performance vs Benchmark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Performance vs Benchmark</h3>
                <div className="flex gap-2">
                  {['1M', '3M', '6M', '1Y'].map(tf => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                        timeframe === tf
                          ? 'bg-electric-400/20 text-electric-400'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" />
                  <XAxis dataKey="month" stroke="#8b9cc8" />
                  <YAxis stroke="#8b9cc8" />
                  <Tooltip
                    contentStyle={{ background: '#0d1626', border: '1px solid #1a2540', borderRadius: '8px' }}
                    formatter={(value) => `₹${value}k`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="portfolio" stroke="#00D4FF" strokeWidth={2} dot={{ fill: '#00D4FF' }} name="Your Portfolio" />
                  <Line type="monotone" dataKey="benchmark" stroke="#8b9cc8" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#8b9cc8' }} name="Benchmark" />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-neon-400 mt-3">✓ Outperforming benchmark by 6.2%</p>
            </Card>
          </motion.div>
        </div>

        {/* Holdings Table */}
        <Section title="Holdings" subtitle="Your current stock positions">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <div className="mb-4 flex items-center gap-2">
                <Filter size={16} className="text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm bg-dark-card border border-dark-border rounded-lg px-3 py-1 text-gray-300"
                >
                  <option value="value">Sort by Value</option>
                  <option value="gain">Sort by Gain %</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-dark-border">
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Company</th>
                      <th className="text-right px-4 py-3 text-gray-400 font-semibold">Shares</th>
                      <th className="text-right px-4 py-3 text-gray-400 font-semibold">Price</th>
                      <th className="text-right px-4 py-3 text-gray-400 font-semibold">Value</th>
                      <th className="text-right px-4 py-3 text-gray-400 font-semibold">Gain/Loss</th>
                      <th className="text-right px-4 py-3 text-gray-400 font-semibold">Change %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedHoldings.map((holding, idx) => {
                      const value = holding.shares * holding.price
                      const gainLoss = value * (holding.change / 100)

                      return (
                        <motion.tr
                          key={holding.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.05 }}
                          className="border-b border-dark-border/50 hover:bg-electric-400/5 transition-colors group cursor-pointer"
                        >
                          <td className="px-4 py-4">
                            <div>
                              <p className="font-semibold text-white group-hover:text-electric-400 transition-colors">{holding.name}</p>
                              <p className="text-xs text-gray-500">{holding.symbol}</p>
                            </div>
                          </td>
                          <td className="text-right px-4 py-4 text-gray-300">{holding.shares}</td>
                          <td className="text-right px-4 py-4 text-gray-300">₹{holding.price.toLocaleString()}</td>
                          <td className="text-right px-4 py-4 font-semibold text-white">₹{value.toLocaleString()}</td>
                          <td className={`text-right px-4 py-4 font-semibold ${gainLoss > 0 ? 'text-neon-400' : 'text-red-400'}`}>
                            {gainLoss > 0 ? '+' : ''}₹{Math.round(gainLoss).toLocaleString()}
                          </td>
                          <td className="text-right px-4 py-4">
                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg ${
                              holding.change > 0
                                ? 'bg-neon-400/10 text-neon-400'
                                : 'bg-red-400/10 text-red-400'
                            }`}>
                              {holding.change > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                              <span className="font-semibold">{holding.change > 0 ? '+' : ''}{holding.change}%</span>
                            </div>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </Section>

        {/* Rebalance Suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="border-electric-400/20 bg-electric-400/5">
            <div className="flex items-start gap-4">
              <AlertCircle size={24} className="text-electric-400 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-white mb-2">Rebalance Your Portfolio?</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Your equity allocation has drifted to 47% from the target 45%. Consider rebalancing to align with your risk profile.
                </p>
                <Button variant="primary" size="sm">
                  View Rebalancing Options
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </PageContainer>
    </MainLayout>
  )
}

function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}
