import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Info, TrendingUp, DollarSign } from 'lucide-react'
import MainLayout, { PageContainer, PageHeader } from '../components/layout/MainLayout'
import { Card, TextInput } from '../components/ui/FormElements'
import Button from '../components/ui/Button'
import { sipPresets } from '../data/mockData'

export default function SIPCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000)
  const [durationYears, setDurationYears] = useState(10)
  const [returnRate, setReturnRate] = useState(12)
  const [selectedPreset, setSelectedPreset] = useState(null)

  // Calculate SIP
  const calculation = useMemo(() => {
    const months = durationYears * 12
    const monthlyRate = returnRate / 100 / 12

    // Future Value of SIP formula: FV = P * (((1 + r)^n - 1) / r) * (1 + r)
    const fv = monthlyAmount * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate)
    const totalInvested = monthlyAmount * months
    const gains = fv - totalInvested

    // Yearly breakdown
    const yearlyData = []
    for (let year = 1; year <= durationYears; year++) {
      const m = year * 12
      const yearlyFv = monthlyAmount * (Math.pow(1 + monthlyRate, m) - 1) / monthlyRate * (1 + monthlyRate)
      yearlyData.push({
        year: `Year ${year}`,
        invested: monthlyAmount * m,
        value: Math.round(yearlyFv),
        gains: Math.round(yearlyFv - monthlyAmount * m)
      })
    }

    return { fv: Math.round(fv), totalInvested, gains: Math.round(gains), yearlyData }
  }, [monthlyAmount, durationYears, returnRate])

  const handlePreset = (preset) => {
    setSelectedPreset(preset)
    setReturnRate(preset.expectedReturn)
  }

  const chartData = [
    { name: 'Invested', value: calculation.totalInvested, fill: '#00D4FF' },
    { name: 'Gains', value: calculation.gains, fill: '#00FF88' }
  ]

  return (
    <MainLayout>
      <PageContainer>
        <PageHeader
          title="SIP Calculator"
          subtitle="Calculate your Systematic Investment Plan returns"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-4"
          >
            {/* Monthly SIP */}
            <Card>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-300 block mb-2">Monthly SIP Amount (₹)</label>
                  <TextInput
                    type="number"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                    min="500"
                    step="500"
                  />
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹500</span>
                    <span>₹100k</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-300 block mb-2">Duration (Years)</label>
                  <TextInput
                    type="number"
                    value={durationYears}
                    onChange={(e) => setDurationYears(Number(e.target.value))}
                    min="1"
                    max="50"
                  />
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={durationYears}
                    onChange={(e) => setDurationYears(Number(e.target.value))}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>50</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-300 block mb-2">Expected Annual Return (%)</label>
                  <TextInput
                    type="number"
                    value={returnRate}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    min="1"
                    max="25"
                    step="0.5"
                  />
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="0.5"
                    value={returnRate}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1%</span>
                    <span>25%</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Risk Presets */}
            <Card>
              <h3 className="text-sm font-bold text-white mb-3">Risk Profiles</h3>
              <div className="space-y-2">
                {sipPresets.map((preset, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePreset(preset)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedPreset?.name === preset.name
                        ? 'bg-electric-400/20 border-electric-400/60'
                        : 'border-dark-border hover:border-electric-400/30'
                    }`}
                  >
                    <p className="text-sm font-semibold text-white">{preset.name}</p>
                    <p className="text-xs text-gray-400">Expected: {preset.expectedReturn}%</p>
                  </motion.button>
                ))}
              </div>
            </Card>

            {/* Info */}
            <Card className="bg-electric-400/5 border-electric-400/20">
              <div className="flex gap-2">
                <Info size={16} className="text-electric-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-gray-300">
                  <p className="font-semibold mb-1">SIP Benefits</p>
                  <ul className="space-y-1 text-gray-400">
                    <li>• Rupee cost averaging</li>
                    <li>• Disciplined investing</li>
                    <li>• Compound growth</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="text-center">
                  <p className="text-gray-400 text-sm mb-2">Total Invested</p>
                  <p className="text-3xl font-bold text-electric-400">
                    ₹{(calculation.totalInvested / 100000).toFixed(1)}L
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="text-center bg-neon-400/5 border-neon-400/20">
                  <p className="text-gray-400 text-sm mb-2">Total Gains</p>
                  <p className="text-3xl font-bold text-neon-400">
                    ₹{(calculation.gains / 100000).toFixed(1)}L
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    ({((calculation.gains / calculation.totalInvested) * 100).toFixed(1)}% return)
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="text-center bg-electric-400/5 border-electric-400/20">
                  <p className="text-gray-400 text-sm mb-2">Final Value</p>
                  <p className="text-3xl font-bold text-electric-400">
                    ₹{(calculation.fv / 100000).toFixed(1)}L
                  </p>
                </Card>
              </motion.div>
            </div>

            {/* Pie Chart */}
            <Card>
              <h3 className="text-lg font-bold text-white mb-4">Investment Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" labelLine={false} label={CustomLabel} outerRadius={100} dataKey="value">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#0d1626', border: '1px solid #1a2540', borderRadius: '8px' }}
                    formatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Growth Chart */}
            <Card>
              <h3 className="text-lg font-bold text-white mb-4">Growth Over Time</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={calculation.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" />
                  <XAxis dataKey="year" stroke="#8b9cc8" />
                  <YAxis stroke="#8b9cc8" />
                  <Tooltip
                    contentStyle={{ background: '#0d1626', border: '1px solid #1a2540', borderRadius: '8px' }}
                    formatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                  />
                  <Legend />
                  <Bar dataKey="invested" fill="#00D4FF" name="Amount Invested" />
                  <Bar dataKey="gains" fill="#00FF88" name="Gains" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Action */}
            <Button variant="primary" size="lg" className="w-full justify-center">
              <DollarSign size={20} /> Start Your SIP Today
            </Button>
          </motion.div>
        </div>
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
