import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = true, glow = false, onClick }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.005 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={onClick}
      className={`glass-card p-6 ${glow ? 'glow-border-blue' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}
