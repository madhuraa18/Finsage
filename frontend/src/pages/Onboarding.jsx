import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ArrowRight, ArrowLeft, CheckCircle, DollarSign, TrendingUp, AlertCircle } from 'lucide-react'
import MainLayout from '../components/layout/MainLayout'
import Button from '../components/ui/Button'
import { Card, TextInput, Checkbox, Select, Badge } from '../components/ui/FormElements'
import { personalityQuestions } from '../data/mockData'

const steps = ['Profile', 'Investment', 'Risk', 'Review']

export default function Onboarding() {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    // Profile step
    age: '',
    occupation: '',
    annualIncome: '',
    // Investment step
    investmentAmount: '',
    investmentGoal: '',
    investmentHorizon: '',
    // Risk step
    riskAnswers: [0, 0, 0, 0],
    // Review
    agreeTerms: false,
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleRiskAnswer = (idx, value) => {
    const newAnswers = [...formData.riskAnswers]
    newAnswers[idx] = value
    setFormData(prev => ({ ...prev, riskAnswers: newAnswers }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1500))
      updateUser({ onboarding_complete: true, profile: formData })
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.age && formData.occupation && formData.annualIncome
      case 1:
        return formData.investmentAmount && formData.investmentGoal && formData.investmentHorizon
      case 2:
        return formData.riskAnswers.every(a => a !== 0)
      case 3:
        return formData.agreeTerms
      default:
        return false
    }
  }

  const calculateRiskProfile = () => {
    const sum = formData.riskAnswers.reduce((a, b) => a + b, 0)
    if (sum <= 4) return { level: 'Conservative', color: 'text-blue-400' }
    if (sum <= 8) return { level: 'Balanced', color: 'text-electric-400' }
    return { level: 'Aggressive', color: 'text-neon-400' }
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Let's Get You Started</h1>
          <p className="text-gray-400">We'll help you set up your investment profile in just a few steps</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center flex-1"
              >
                <motion.div
                  animate={{
                    scale: idx === currentStep ? 1.2 : 1,
                    backgroundColor: idx <= currentStep ? '#00D4FF' : '#1a2540',
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors"
                >
                  {idx < currentStep ? '✓' : idx + 1}
                </motion.div>
                <span className={`text-xs font-semibold ${idx === currentStep ? 'text-electric-400' : 'text-gray-500'}`}>
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="w-full bg-dark-border rounded-full h-1">
            <motion.div
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-electric-400 to-neon-400 rounded-full"
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-8">
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="text-electric-400" /> Profile Information
                    </h2>
                  </div>
                  <TextInput
                    label="Age"
                    type="number"
                    placeholder="Your age"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  />
                  <Select
                    label="Occupation"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    options={[
                      { label: 'Select occupation', value: '' },
                      { label: 'Salaried Employee', value: 'salaried' },
                      { label: 'Self Employed', value: 'self-employed' },
                      { label: 'Student', value: 'student' },
                      { label: 'Retired', value: 'retired' },
                      { label: 'Other', value: 'other' },
                    ]}
                  />
                  <Select
                    label="Annual Income"
                    value={formData.annualIncome}
                    onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                    options={[
                      { label: 'Select income range', value: '' },
                      { label: '₹0 - ₹5L', value: '0-5' },
                      { label: '₹5L - ₹15L', value: '5-15' },
                      { label: '₹15L - ₹30L', value: '15-30' },
                      { label: '₹30L - ₹50L', value: '30-50' },
                      { label: '₹50L+', value: '50+' },
                    ]}
                  />
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <DollarSign className="text-neon-400" /> Investment Details
                    </h2>
                  </div>
                  <TextInput
                    label="Amount to Invest (₹)"
                    type="number"
                    placeholder="e.g., 50000"
                    value={formData.investmentAmount}
                    onChange={(e) => handleInputChange('investmentAmount', e.target.value)}
                  />
                  <Select
                    label="Primary Investment Goal"
                    value={formData.investmentGoal}
                    onChange={(e) => handleInputChange('investmentGoal', e.target.value)}
                    options={[
                      { label: 'Select a goal', value: '' },
                      { label: 'Wealth Creation', value: 'wealth' },
                      { label: 'Retirement Planning', value: 'retirement' },
                      { label: 'Education Fund', value: 'education' },
                      { label: 'Home Purchase', value: 'home' },
                      { label: 'Emergency Fund', value: 'emergency' },
                    ]}
                  />
                  <Select
                    label="Investment Timeline"
                    value={formData.investmentHorizon}
                    onChange={(e) => handleInputChange('investmentHorizon', e.target.value)}
                    options={[
                      { label: 'Select timeframe', value: '' },
                      { label: 'Less than 1 year', value: '<1' },
                      { label: '1-3 years', value: '1-3' },
                      { label: '3-5 years', value: '3-5' },
                      { label: '5-10 years', value: '5-10' },
                      { label: '10+ years', value: '10+' },
                    ]}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      <AlertCircle className="text-electric-400" /> Risk Assessment
                    </h2>
                    <p className="text-gray-400 text-sm">Answer these questions to determine your risk profile</p>
                  </div>

                  {personalityQuestions.map((q, idx) => (
                    <div key={idx} className="space-y-3">
                      <label className="text-sm font-semibold text-gray-300">{q.question}</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {q.options.map((option, optIdx) => (
                          <motion.button
                            key={optIdx}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleRiskAnswer(idx, optIdx + 1)}
                            className={`p-3 rounded-xl text-sm font-semibold transition-all ${
                              formData.riskAnswers[idx] === optIdx + 1
                                ? 'bg-electric-400/20 border border-electric-400/60 text-electric-400'
                                : 'border border-dark-border text-gray-400 hover:border-electric-400/30'
                            }`}
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <CheckCircle size={48} className="text-neon-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Almost There!</h2>
                    <p className="text-gray-400">Review your profile and complete setup</p>
                  </div>

                  <div className="space-y-4 bg-dark-card/50 rounded-xl p-6">
                    <ReviewItem label="Age" value={formData.age} />
                    <ReviewItem label="Occupation" value={formData.occupation} />
                    <ReviewItem label="Annual Income" value={formData.annualIncome} />
                    <ReviewItem label="Investment Amount" value={`₹${formData.investmentAmount}`} />
                    <ReviewItem label="Investment Goal" value={formData.investmentGoal} />
                    <ReviewItem label="Timeline" value={formData.investmentHorizon} />
                    <ReviewItem
                      label="Risk Profile"
                      value={<span className={`font-bold ${calculateRiskProfile().color}`}>{calculateRiskProfile().level}</span>}
                    />
                  </div>

                  <Checkbox
                    label="I agree to the terms and conditions"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                  />
                </div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Back
          </Button>

          <div className="flex items-center gap-3">
            <Badge variant="blue">{currentStep + 1} of {steps.length}</Badge>
          </div>

          {currentStep === steps.length - 1 ? (
            <Button
              variant="primary"
              onClick={handleSubmit}
              isLoading={loading}
              disabled={!isStepValid()}
            >
              Complete Setup
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2"
            >
              Next <ArrowRight size={18} />
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

function ReviewItem({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-dark-border/50 last:border-0">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-semibold capitalize">{value}</span>
    </div>
  )
}
