import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { User, Mail, Lock, ArrowRight, AlertCircle, Check } from 'lucide-react'
import MainLayout from '../components/layout/MainLayout'
import { Card, TextInput, Checkbox } from '../components/ui/FormElements'
import Button from '../components/ui/Button'
import CursorGlow from '../components/ui/CursorGlow'
import AnimatedBackground from '../components/ui/AnimatedBackground'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name')
      return false
    }
    if (formData.name.length < 2) {
      setError('Name must be at least 2 characters')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep2()) return
    if (!formData.agreeTerms) {
      setError('Please agree to the terms and conditions')
      return
    }

    setLoading(true)
    try {
      await register(formData.name, formData.email, formData.password)
      navigate('/onboarding')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.')
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
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Start your investment journey today</p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-8"
        >
          {[1, 2].map(num => (
            <motion.div
              key={num}
              animate={{
                width: num === step ? '60%' : '40%',
                background: num <= step ? '#00D4FF' : '#1a2540',
              }}
              className="h-1 rounded-full transition-all"
            />
          ))}
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
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

            {/* Step 1: Name */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <TextInput
                  label="Full Name"
                  icon={User}
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
                <p className="text-xs text-gray-500">
                  We'll use this name to personalize your experience
                </p>
              </motion.div>
            )}

            {/* Step 2: Email & Password */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
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

                <TextInput
                  label="Password"
                  icon={Lock}
                  type="password"
                  name="password"
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                />

                {/* Password Strength */}
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <div className="flex gap-1 h-1 rounded-full overflow-hidden">
                      {[1, 2, 3].map(bar => (
                        <motion.div
                          key={bar}
                          animate={{
                            background:
                              formData.password.length < 6
                                ? '#FF4D6D'
                                : formData.password.length < 10
                                ? '#FFAA00'
                                : '#00FF88'
                          }}
                          className="flex-1 transition-all"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      {formData.password.length < 6 && 'Weak password'}
                      {formData.password.length >= 6 && formData.password.length < 10 && 'Medium strength'}
                      {formData.password.length >= 10 && 'Strong password'}
                    </p>
                  </motion.div>
                )}

                <TextInput
                  label="Confirm Password"
                  icon={Lock}
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                {/* Terms & Conditions */}
                <Checkbox
                  label="I agree to Terms & Conditions and Privacy Policy"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
              </motion.div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              {step === 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setError('')
                    setStep(1)
                  }}
                  className="flex-1"
                >
                  Back
                </Button>
              )}

              {step === 1 ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  Next <ArrowRight size={18} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={loading}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  Create Account <ArrowRight size={18} />
                </Button>
              )}
            </div>
          </Card>
        </motion.form>

        {/* Login Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-gray-400"
        >
          Already have an account?{' '}
          <Link to="/login" className="text-electric-400 font-semibold hover:text-electric-300">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}
