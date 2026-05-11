import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import {
  LayoutDashboard, Brain, TrendingUp, Calculator, Briefcase,
  BookOpen, LogOut, Menu, X, ChevronRight, Bell, Settings, User
} from 'lucide-react'

const navLinks = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/advisor', label: 'AI Advisor', icon: Brain, badge: 'AI' },
  { path: '/market', label: 'Markets', icon: TrendingUp },
  { path: '/sip-calculator', label: 'SIP Calc', icon: Calculator },
  { path: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { path: '/learn', label: 'Learn', icon: BookOpen },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => { logout(); navigate('/') }

  // Landing nav (no auth)
  const isLanding = location.pathname === '/'

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isLanding
            ? 'glass-strong border-b border-dark-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)' }}>
                <span className="text-sm font-black text-dark-bg">F</span>
              </div>
              <span className="font-display font-bold text-xl gradient-text-blue">FinSage</span>
            </Link>

            {/* Desktop Nav */}
            {user && (
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map(({ path, label, icon: Icon, badge }) => {
                  const active = location.pathname === path
                  return (
                    <Link key={path} to={path}
                      className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        active
                          ? 'text-electric-400'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {active && (
                        <motion.div layoutId="nav-indicator"
                          className="absolute inset-0 rounded-xl bg-electric-400/10 border border-electric-400/20"
                        />
                      )}
                      <Icon size={15} />
                      <span className="relative">{label}</span>
                      {badge && (
                        <span className="badge-blue text-[10px] px-1.5 py-0.5">{badge}</span>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}

            {/* Right side */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  {/* Notifications */}
                  <button className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-electric-400 animate-pulse-glow" />
                  </button>

                  {/* User menu */}
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass border border-dark-border hover:border-electric-400/30 transition-all"
                    >
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-dark-bg"
                        style={{ background: 'linear-gradient(135deg, #00D4FF, #00FF88)' }}>
                        {user.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <span className="hidden sm:block text-sm font-medium text-gray-200">{user.name?.split(' ')[0]}</span>
                      <ChevronRight size={14} className={`text-gray-400 transition-transform ${userMenuOpen ? 'rotate-90' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-48 glass-strong rounded-2xl border border-dark-border overflow-hidden shadow-xl"
                          onMouseLeave={() => setUserMenuOpen(false)}
                        >
                          <div className="p-3 border-b border-dark-border">
                            <p className="text-sm font-semibold text-white">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                          <div className="p-2">
                            <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                              <User size={15} /> Profile
                            </Link>
                            <button onClick={handleLogout}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-400/5 transition-all">
                              <LogOut size={15} /> Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mobile menu button */}
                  <button onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2 rounded-xl glass border border-dark-border text-gray-400 hover:text-white transition-all">
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-3 py-2">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-primary text-sm px-4 py-2">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && user && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden glass-strong border-t border-dark-border overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-2">
                {navLinks.map(({ path, label, icon: Icon }) => (
                  <Link key={path} to={path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      location.pathname === path
                        ? 'bg-electric-400/10 text-electric-400 border border-electric-400/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={18} />{label}
                  </Link>
                ))}
                <button onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/5 transition-all">
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
