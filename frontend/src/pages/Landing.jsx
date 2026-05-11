import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, TrendingUp, Brain, BarChart3, Shield, Sparkles } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import { Card } from '../components/ui/FormElements'
import { fadeInUp, staggerContainer } from '../utils/animations'
import CursorGlow from '../components/ui/CursorGlow'
import AnimatedBackground from '../components/ui/AnimatedBackground'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Advisor',
    description: 'Get personalized investment advice from our advanced AI advisor',
    color: 'electric'
  },
  {
    icon: TrendingUp,
    title: 'Real-time Analytics',
    description: 'Track market trends and portfolio performance in real-time',
    color: 'electric'
  },
  {
    icon: BarChart3,
    title: 'Smart Portfolio',
    description: 'Optimized asset allocation based on your risk profile',
    color: 'neon'
  },
  {
    icon: Zap,
    title: 'SIP Calculator',
    description: 'Calculate SIP returns with precision and clarity',
    color: 'electric'
  },
  {
    icon: BookOpen,
    title: 'Learning Hub',
    description: 'Master investing with our comprehensive courses',
    color: 'neon'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security for your financial data',
    color: 'electric'
  },
]

const testimonials = [
  { name: 'Rajesh Kumar', role: 'Investor', text: '\"FinSage helped me build a portfolio that aligns with my goals. Amazing platform!\"' },
  { name: 'Priya Sharma', role: 'Trader', text: '\"The AI advisor insights are incredibly valuable. Highly recommended!\"' },
  { name: 'Amit Patel', role: 'Entrepreneur', text: '\"Finally a fintech app that makes investing simple and accessible.\"' },
]

import { BookOpen } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-dark-bg relative">
      <AnimatedBackground />
      <CursorGlow />
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-electric-400/20">
                <Sparkles size={16} className="text-electric-400" />
                <span className="text-sm font-medium text-gray-300">Welcome to the future of investing</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block text-white mb-2">Your Personal</span>
              <span className="gradient-text">AI Investment Advisor</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Make smarter investment decisions with our AI-powered platform. Get personalized advice, real-time analytics, and grow your wealth effortlessly.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/register">
                <Button variant="primary" size="lg" className="flex items-center gap-2">
                  Get Started <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Cards - Visual Interest */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-4 mt-20 md:mt-32"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                className="glass-card rounded-2xl p-4 text-center hidden md:block"
              >
                <p className="text-3xl font-bold text-electric-400">+{Math.floor(Math.random() * 30) + 10}%</p>
                <p className="text-xs text-gray-400 mt-2">Average Returns</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Everything you need to succeed in your investment journey</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="group"
                >
                  <Card className="h-full hover:border-electric-400/30">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${feature.color === 'electric' ? 'bg-electric-400/10' : 'bg-neon-400/10'} group-hover:scale-110 transition-transform`}>
                        <Icon size={28} className={feature.color === 'electric' ? 'text-electric-400' : 'text-neon-400'} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            Loved by Investors
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full">
                  <p className="text-gray-300 mb-4 italic">{testimonial.text}</p>
                  <div className="flex items-center gap-2 pt-4 border-t border-dark-border">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-electric-400 to-neon-400 flex items-center justify-center text-xs font-bold text-dark-bg">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="glass-card rounded-3xl p-12 border border-electric-400/20"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Investing?</h2>
            <p className="text-gray-400 text-lg mb-8">Join thousands of investors making smarter decisions with FinSage</p>
            <Link to="/register">
              <Button variant="primary" size="lg" className="flex items-center gap-2 mx-auto">
                Create Your Account <ArrowRight size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
