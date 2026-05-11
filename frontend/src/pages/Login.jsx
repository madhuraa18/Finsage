import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'
import MainLayout from '../components/layout/MainLayout'
import { Card, TextInput } from '../components/ui/FormElements'
import Button from '../components/ui/Button'
import CursorGlow from '../components/ui/CursorGlow'
import AnimatedBackground from '../components/ui/AnimatedBackground'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg relative flex items-center justify-center">
      <AnimatedBackground />
      <CursorGlow />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full mx-auto px-4"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <Link to="/" className="inline-flex items-center gap-3 group mb-8">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)' }}>
              <span className="text-sm font-black text-dark-bg">F</span>
            </div>
            <span className="font-display font-bold text-2xl gradient-text-blue">FinSage</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
        >
          <Card className="space-y-6 p-8">
            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex gap-3"
              >
                <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Email */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <TextInput
                label="Email Address"
                icon={Mail}
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-300">Password</label>
                <Link to="#" className="text-xs text-electric-400 hover:text-electric-300">
                  Forgot?
                </Link>
              </div>
              <TextInput
                icon={Lock}
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </motion.div>

            {/* Remember Me */}
            <motion.label
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input type="checkbox" className="w-4 h-4 rounded border-2 border-electric-400/30 bg-dark-card" />
              <span className="text-sm text-gray-400">Remember me</span>
            </motion.label>

            {/* Submit */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                className="w-full flex items-center justify-center gap-2"
              >
                Sign In <ArrowRight size={18} />
              </Button>
            </motion.div>
          </Card>
        </motion.form>

        {/* Signup Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 text-gray-400"
        >
          Don't have an account?{' '}
          <Link to="/register" className="text-electric-400 font-semibold hover:text-electric-300">
            Create one
          </Link>
        </motion.p>

        {/* Demo Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 p-4 rounded-lg bg-electric-400/5 border border-electric-400/20"
        >
          <p className="text-xs text-gray-400 mb-2">Demo credentials:</p>
          <p className="text-xs text-gray-300">Email: <span className="font-mono">user@finsage.com</span></p>
          <p className="text-xs text-gray-300">Password: <span className="font-mono">demo123</span></p>
        </motion.div>
      </motion.div>
    </div>
  )
}
