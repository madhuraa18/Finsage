import { useState } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { TrendingUp, Zap, DollarSign, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import MainLayout, { PageContainer, PageHeader, Section } from '../components/layout/MainLayout'
import { Card, StatCard } from '../components/ui/FormElements'
import Button from '../components/ui/Button'
import { marketData, portfolioHoldings } from '../data/mockData'
import { fadeInUp, staggerContainer } from '../utils/animations'

// Portfolio allocation data
const allocationData = [
  { name: 'Equity', value: 45, color: '#00D4FF' },
  { name: 'Debt', value: 35, color: '#00FF88' },
  { name: 'Cash', value: 20, color: '#7B61FF' },
]

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState('1M')
  const totalPortfolio = 5234500
  const dayChange = 15800
  const dayChangePercent = 0.3

  return (
    <MainLayout>
      <PageContainer>
        {/* Header */}
        <PageHeader
          title="Dashboard"
          subtitle="Your financial overview at a glance"
          action={
            <div className="flex gap-2">
              {['1W', '1M', '3M', '1Y'].map(tf => (
                <Button
                  key={tf}
                  variant={timeframe === tf ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </Button>
              ))}
            </div>
          }
        />

        {/* Key Metrics */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <motion.div variants={fadeInUp}>
            <StatCard
              icon={DollarSign}
              label="Portfolio Value"
              value={`₹${(totalPortfolio / 100000).toFixed(1)}L`}
              change={`+${dayChangePercent}%`}
              trend="up"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <StatCard
              icon={TrendingUp}
              label="Today's Gain"
              value={`₹${dayChange.toLocaleString()}`}
              change="vs yesterday"
              trend="up"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <StatCard
              icon={Target}
              label="1Y Return"
              value="18.5%"
              change="+12.3%"
              trend="up"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <StatCard
              icon={Zap}
              label="AI Score"
              value="8.7/10"
              change="Excellent"
              trend="up"
            />
          </motion.div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Portfolio Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <h3 className="text-lg font-bold text-white mb-4">Portfolio Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={marketData}>
                  <defs>
                    <linearGradient id="gradientLine" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" />
                  <XAxis dataKey="time" stroke="#8b9cc8" />
                  <YAxis stroke="#8b9cc8" />
                  <Tooltip
                    contentStyle={{ background: '#0d1626', border: '1px solid #1a2540', borderRadius: '8px' }}
                    cursor={{ stroke: '#00D4FF', strokeWidth: 2 }}
                  />
                  <Line type="monotone" dataKey="SENSEX" stroke="#00D4FF" strokeWidth={2} dot={{ fill: '#00D4FF', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Allocation Pie */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h3 className="text-lg font-bold text-white mb-4">Asset Allocation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#0d1626', border: '1px solid #1a2540', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {allocationData.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.name}</span>
                    <span className="font-semibold text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Holdings Table */}
        <Section title="Top Holdings" subtitle="Your current portfolio positions">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-dark-border">
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Company</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Shares</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Price</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Total Value</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioHoldings.map((holding, idx) => (
                      <motion.tr
                        key={holding.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                        className="border-b border-dark-border/50 hover:bg-electric-400/5 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-semibold text-white">{holding.name}</p>
                            <p className="text-xs text-gray-500">{holding.symbol}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-300">{holding.shares}</td>
                        <td className="px-4 py-4 text-gray-300">₹{holding.price.toLocaleString()}</td>
                        <td className="px-4 py-4 text-gray-300 font-semibold">₹{(holding.shares * holding.price).toLocaleString()}</td>
                        <td className="px-4 py-4">
                          <div className={`flex items-center gap-1 ${holding.change > 0 ? 'text-neon-400' : 'text-red-400'}`}>
                            {holding.change > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            <span className="font-semibold">{holding.change > 0 ? '+' : ''}{holding.change}%</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </Section>

        {/* Quick Actions */}
        <Section title="Quick Actions" className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: '💬', label: 'Ask AI Advisor', path: '/advisor' },
              { icon: '📊', label: 'View Portfolio', path: '/portfolio' },
              { icon: '📈', label: 'Calculate SIP', path: '/sip-calculator' },
              { icon: '📚', label: 'Learn Investing', path: '/learn' },
            ].map((action, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
              >
                <Button
                  variant="secondary"
                  className="w-full justify-center flex-col py-4 h-auto"
                  onClick={() => window.location.href = action.path}
                >
                  <span className="text-2xl mb-2">{action.icon}</span>
                  {action.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </Section>
      </PageContainer>
    </MainLayout>
  )
}
