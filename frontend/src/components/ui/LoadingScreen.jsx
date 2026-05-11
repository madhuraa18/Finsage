import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg">
      <AnimatedBackground />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center gap-8"
      >
        {/* Logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl border-2 border-electric-400/30 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(0,255,136,0.05) 100%)' }}
        >
          <span className="text-3xl">💹</span>
        </motion.div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-display font-bold text-2xl gradient-text-blue">FinSage</h1>
          <p className="text-sm text-dark-muted">Loading your financial universe...</p>
        </div>
        {/* Loading bar */}
        <div className="w-48 h-1 rounded-full bg-dark-border overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #00D4FF, #00FF88)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  )
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, #00FF88 0%, transparent 70%)' }} />
    </div>
  )
}
