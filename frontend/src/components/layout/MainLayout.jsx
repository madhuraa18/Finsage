import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'

// Page wrapper with animations and layout
export default function MainLayout({ children, showFooter = false, dark = true }) {
  return (
    <div className={`min-h-screen ${dark ? 'bg-dark-bg' : ''} relative`}>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="pt-20"
      >
        {children}
      </motion.main>
      {showFooter && <Footer />}
    </div>
  )
}

export function PageContainer({ children, className = '' }) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${className}`}>
      {children}
    </div>
  )
}

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{title}</h1>
        {subtitle && <p className="text-gray-400 text-lg">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export function Section({ title, subtitle, children, className = '' }) {
  return (
    <section className={`py-12 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-8">
          {title && <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>}
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  )
}
