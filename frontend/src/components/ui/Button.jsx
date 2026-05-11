import { motion } from 'framer-motion'
import { cva } from 'class-variance-authority'

const buttonVariants = cva('relative overflow-hidden font-semibold rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed', {
  variants: {
    variant: {
      primary: 'bg-gradient-to-r from-electric-400 to-electric-600 text-dark-bg shadow-glow-blue hover:shadow-glow-blue-sm hover:-translate-y-1',
      secondary: 'border border-electric-400/30 text-electric-400 hover:bg-electric-400/5 hover:border-electric-400/60',
      neon: 'bg-gradient-to-r from-neon-400 to-neon-600 text-dark-bg shadow-glow-green hover:shadow-glow-green-sm hover:-translate-y-1',
      ghost: 'text-gray-300 hover:text-white hover:bg-white/5',
      danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30',
    },
    size: {
      xs: 'px-3 py-1.5 text-xs',
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-3.5 text-base',
      xl: 'px-10 py-4 text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export default function Button({ children, variant = 'primary', size = 'md', className = '', isLoading = false, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${buttonVariants()} ${className} ${variant}-btn`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin">⏳</span>
      ) : null}
      {children}
    </motion.button>
  )
}
