import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, RotateCcw, Download, Copy, Check, Bot, User, Zap, TrendingUp, Shield, Target } from 'lucide-react'
import MainLayout, { PageContainer, PageHeader } from '../components/layout/MainLayout'
import { Card } from '../components/ui/FormElements'
import Button from '../components/ui/Button'
import { advisorAPI } from '../api/client'
import toast from 'react-hot-toast'

const QUICK_PROMPTS = [
  { icon: '💰', text: 'What should I do with ₹1 lakh?' },
  { icon: '🛡️', text: 'How to build emergency fund?' },
  { icon: '📈', text: 'Best mutual funds for beginners?' },
  { icon: '💎', text: 'Explain SIP investing' },
  { icon: '🏦', text: 'How to save tax with ELSS?' },
  { icon: '📉', text: 'Market crash — what to do?' },
]

const FEATURE_CARDS = [
  { icon: Zap, label: 'AI Powered', desc: 'Real-time personalized advice' },
  { icon: TrendingUp, label: 'India-Focused', desc: 'SEBI-aligned recommendations' },
  { icon: Shield, label: 'Beginner Safe', desc: 'No jargon, just clarity' },
  { icon: Target, label: 'Goal-Based', desc: 'Advice matching your profile' },
]

export default function AIAdvisor() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Namaste! I\'m FinSage AI, your personal investment advisor for the Indian market.\n\nI can help you with:\n• Building an investment portfolio\n• Understanding mutual funds & SIPs\n• Tax saving strategies (ELSS, PPF, NPS)\n• Emergency fund planning\n• Market crash survival tips\n\nWhat would you like to know today? 🇮🇳',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(null)
  const [investmentPlan, setInvestmentPlan] = useState(null)
  const [loadingPlan, setLoadingPlan] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (messageText = null) => {
    const text = messageText || input
    if (!text.trim() || loading) return

    const userMessage = { role: 'user', content: text, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
      const res = await advisorAPI.chat(history)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: res.data.response,
        timestamp: new Date()
      }])
    } catch (err) {
      toast.error('Failed to get AI response. Please try again.')
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ I\'m having trouble connecting right now. Please try again in a moment.',
        timestamp: new Date()
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleQuickPrompt = (promptText) => {
    handleSend(promptText)
  }

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text)
    setCopied(idx)
    setTimeout(() => setCopied(null), 2000)
  }

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: '👋 Chat cleared! What would you like to know about investing today?',
      timestamp: new Date()
    }])
  }

  const loadInvestmentPlan = async () => {
    setLoadingPlan(true)
    try {
      const res = await advisorAPI.getInvestmentPlan()
      setInvestmentPlan(res.data)
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error('Complete onboarding first to get your personalized plan!')
      } else {
        toast.error('Failed to load investment plan')
      }
    } finally {
      setLoadingPlan(false)
    }
  }

  const exportChat = () => {
    const text = messages.map(m => `[${m.role.toUpperCase()}]: ${m.content}`).join('\n\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'finsage-conversation.txt'
    a.click()
  }

  return (
    <MainLayout>
      <PageContainer>
        <PageHeader
          title="AI Investment Advisor"
          subtitle="Personalized guidance powered by AI — designed for Indian investors"
          action={
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={clearChat} className="flex items-center gap-2">
                <RotateCcw size={16} /> Clear
              </Button>
              <Button variant="secondary" size="sm" onClick={exportChat} className="flex items-center gap-2">
                <Download size={16} /> Export
              </Button>
            </div>
          }
        />

        {/* Feature Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {FEATURE_CARDS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-3 flex items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-electric-400/10">
                <f.icon size={16} className="text-electric-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{f.label}</p>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="flex flex-col h-[600px] md:h-[680px] p-0 overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b border-dark-border bg-electric-400/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-400 to-purple-500 flex items-center justify-center">
                  <Bot size={20} className="text-dark-bg" />
                </div>
                <div>
                  <p className="font-bold text-white">FinSage AI</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-neon-400 animate-pulse" />
                    <p className="text-xs text-gray-400">Online • Indian Finance Expert</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-electric-400/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot size={16} className="text-electric-400" />
                        </div>
                      )}
                      <div className={`max-w-xs md:max-w-md lg:max-w-lg group`}>
                        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-electric-400 to-blue-500 text-white rounded-br-none font-medium'
                            : 'bg-dark-card border border-dark-border text-gray-200 rounded-bl-none'
                        }`}>
                          {msg.content}
                        </div>
                        {msg.role === 'assistant' && (
                          <button
                            onClick={() => copyToClipboard(msg.content, idx)}
                            className="mt-1 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-electric-400"
                          >
                            {copied === idx ? <Check size={12} className="text-neon-400" /> : <Copy size={12} />}
                          </button>
                        )}
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <User size={16} className="text-purple-400" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {loading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-electric-400/20 flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-electric-400" />
                    </div>
                    <div className="bg-dark-card border border-dark-border rounded-2xl rounded-bl-none px-4 py-3">
                      <div className="flex gap-1.5 items-center">
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                            className="w-2 h-2 rounded-full bg-electric-400"
                          />
                        ))}
                        <span className="text-xs text-gray-400 ml-2">FinSage is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-dark-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !loading && handleSend()}
                    placeholder="Ask about SIP, mutual funds, tax saving..."
                    className="input-glass flex-1 text-sm"
                    disabled={loading}
                  />
                  <Button
                    variant="primary"
                    onClick={() => handleSend()}
                    disabled={loading || !input.trim()}
                    className="px-4"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Quick Prompts */}
            <Card>
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-electric-400" /> Quick Questions
              </h3>
              <div className="space-y-2">
                {QUICK_PROMPTS.map((q, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ x: 4 }}
                    onClick={() => handleQuickPrompt(q.text)}
                    disabled={loading}
                    className="w-full text-left text-sm text-gray-300 hover:text-white p-2.5 rounded-xl border border-dark-border/50 hover:border-electric-400/40 hover:bg-electric-400/5 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    <span>{q.icon}</span>
                    <span>{q.text}</span>
                  </motion.button>
                ))}
              </div>
            </Card>

            {/* Investment Plan CTA */}
            <Card className="border-electric-400/20 bg-electric-400/5">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Target size={18} className="text-neon-400" /> Your Investment Plan
              </h3>
              <p className="text-xs text-gray-400 mb-4">Get a personalized AI-generated investment plan based on your profile and goals.</p>

              {!investmentPlan ? (
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={loadInvestmentPlan}
                  disabled={loadingPlan}
                >
                  {loadingPlan ? 'Generating...' : '✨ Generate My Plan'}
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Monthly Surplus</span>
                    <span className="text-neon-400 font-bold">₹{Number(investmentPlan.monthly_surplus || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Health Score</span>
                    <span className="text-electric-400 font-bold">{investmentPlan.financial_health_score}/100</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Profile</span>
                    <span className="text-purple-400 font-bold">{investmentPlan.financial_personality}</span>
                  </div>
                  {(investmentPlan.allocations || []).slice(0, 3).map((a, i) => (
                    <div key={i} className="p-2 rounded-lg bg-dark-card/50 border border-dark-border/40">
                      <p className="text-xs font-semibold text-white truncate">{a.name}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">{a.category}</span>
                        <span className="text-xs text-neon-400 font-bold">{a.percentage}% • {a.expected_return}</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="secondary" size="sm" className="w-full justify-center" onClick={loadInvestmentPlan}>
                    Refresh Plan
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </PageContainer>
    </MainLayout>
  )
}
