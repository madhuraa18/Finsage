import { motion } from 'framer-motion'
import { useState } from 'react'

export function Card({ children, className = '', hover = true, onClick }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.005 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function TextInput({ label, icon: Icon, error, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-semibold text-gray-300">{label}</label>}
      <div className={`relative flex items-center transition-all ${focused ? 'ring-2 ring-electric-400/50' : ''}`}>
        {Icon && <Icon className="absolute left-3 text-gray-500" size={18} />}
        <input
          {...props}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
          className={`input-glass ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500/50' : ''}`}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

export function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        {...props}
        className="w-5 h-5 rounded border-2 border-electric-400/30 bg-dark-card checked:bg-electric-400 checked:border-electric-400 cursor-pointer"
      />
      {label && <span className="text-sm text-gray-300">{label}</span>}
    </label>
  )
}

export function Select({ label, options, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-semibold text-gray-300">{label}</label>}
      <select {...props} className="input-glass cursor-pointer">
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-dark-card text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function Badge({ children, variant = 'blue' }) {
  const variants = {
    blue: 'badge-blue',
    green: 'badge-green',
    red: 'badge-red',
  }
  return <span className={`${variants[variant]}`}>{children}</span>
}

export function StatCard({ icon: Icon, label, value, change, trend = 'up' }) {
  return (
    <Card className="group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-2">{label}</p>
          <p className="text-2xl md:text-3xl font-bold text-white">{value}</p>
          {change && (
            <p className={`text-xs mt-2 ${trend === 'up' ? 'text-neon-400' : 'text-red-400'}`}>
              {trend === 'up' ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-3 rounded-xl bg-electric-400/10 group-hover:bg-electric-400/20 transition-all">
            <Icon size={24} className="text-electric-400" />
          </div>
        )}
      </div>
    </Card>
  )
}
