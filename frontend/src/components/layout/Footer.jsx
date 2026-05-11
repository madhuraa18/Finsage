import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const footerLinks = {
  Product: [
    { label: 'AI Advisor', path: '/advisor' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Markets', path: '/market' },
    { label: 'Portfolio', path: '/portfolio' },
  ],
  Learn: [
    { label: 'Learning Hub', path: '/learn' },
    { label: 'SIP Calculator', path: '/sip-calculator' },
    { label: 'Finance Glossary', path: '/learn' },
  ],
  Company: [
    { label: 'About', path: '/' },
    { label: 'Privacy Policy', path: '/' },
    { label: 'Terms of Service', path: '/' },
    { label: 'Contact', path: '/' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-dark-border">
      <div className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,212,255,0.08) 0%, transparent 60%)' }} />
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)' }}>
                <span className="text-sm font-black text-dark-bg">F</span>
              </div>
              <span className="font-display font-bold text-xl gradient-text-blue">FinSage</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              India's smartest AI-powered finance platform. Built to make wealth creation accessible for everyone.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <span className="badge-green text-xs">🇮🇳 Made for India</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">{category}</h4>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <Link to={path} className="text-sm text-gray-400 hover:text-electric-400 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} FinSage. Not SEBI registered. For educational purposes only.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-400 animate-pulse" />
            <span className="text-xs text-gray-500">Systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
