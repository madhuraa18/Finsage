// Example: How to use Supabase in your React components

// ============================================
// EXAMPLE 1: Login Component Integration
// ============================================

import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export function LoginExample() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (email, password) => {
    try {
      await login(email, password)
      // User data automatically loaded into AuthContext
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    // Your login form...
  )
}

// ============================================
// EXAMPLE 2: Using Auth in Dashboard
// ============================================

import { useAuth } from '@/hooks/useAuth'
import { profileService } from '@/api/supabase'

export function DashboardExample() {
  const { user, profile } = useAuth()
  const [portfolio, setPortfolio] = useState(null)

  useEffect(() => {
    if (user) {
      // Load user's portfolio
      loadPortfolio()
    }
  }, [user])

  const loadPortfolio = async () => {
    try {
      const data = await portfolioService.getPortfolio(user.id)
      setPortfolio(data)
    } catch (error) {
      console.error('Failed to load portfolio:', error)
    }
  }

  return (
    <div>
      <h1>Welcome, {profile?.full_name}!</h1>
      <p>Email: {user?.email}</p>
      {/* Display portfolio... */}
    </div>
  )
}

// ============================================
// EXAMPLE 3: Add Portfolio Holding
// ============================================

import { useAuth } from '@/hooks/useAuth'
import { portfolioService } from '@/api/supabase'
import toast from 'react-hot-toast'

export function AddHoldingExample() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleAddHolding = async (formData) => {
    if (!user) {
      toast.error('Please login first')
      return
    }

    setLoading(true)
    try {
      const holding = await portfolioService.addHolding(user.id, {
        symbol: formData.symbol,
        company_name: formData.companyName,
        sector: formData.sector,
        shares: parseFloat(formData.shares),
        purchase_price: parseFloat(formData.purchasePrice),
        current_price: parseFloat(formData.currentPrice),
        quantity: parseFloat(formData.quantity),
        total_value: parseFloat(formData.totalValue)
      })

      toast.success('Holding added successfully!')
      // Refresh portfolio...
    } catch (error) {
      toast.error('Failed to add holding: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    // Your form with handleAddHolding...
  )
}

// ============================================
// EXAMPLE 4: Update User Profile
// ============================================

import { useAuth } from '@/hooks/useAuth'
import { profileService } from '@/api/supabase'
import toast from 'react-hot-toast'

export function UpdateProfileExample() {
  const { user, updateProfile } = useAuth()

  const handleCompleteOnboarding = async (profileData) => {
    try {
      const updated = await updateProfile({
        age: profileData.age,
        occupation: profileData.occupation,
        annual_income: profileData.annualIncome,
        risk_profile: profileData.riskProfile,
        financial_personality: profileData.personality,
        onboarding_complete: true
      })

      toast.success('Profile updated!')
      return updated
    } catch (error) {
      toast.error('Failed to update profile: ' + error.message)
    }
  }

  return (
    // Your onboarding form...
  )
}

// ============================================
// EXAMPLE 5: AI Advisor - Save Conversation
// ============================================

import { useAuth } from '@/hooks/useAuth'
import { conversationService } from '@/api/supabase'
import { advisorAPI } from '@/api/supabase'

export function AIAdvisorExample() {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])

  const handleSendMessage = async (text) => {
    const userMessage = { role: 'user', content: text }
    setMessages(prev => [...prev, userMessage])

    try {
      // Get AI response
      const res = await advisorAPI.chat(
        [...messages, userMessage].map(m => ({
          role: m.role,
          content: m.content
        }))
      )

      const assistantMessage = {
        role: 'assistant',
        content: res.data.response
      }
      setMessages(prev => [...prev, assistantMessage])

      // Save conversation to database
      if (user && messages.length > 0) {
        await conversationService.saveConversation(user.id, [
          ...messages,
          userMessage,
          assistantMessage
        ])
      }
    } catch (error) {
      console.error('Failed to get AI response:', error)
    }
  }

  return (
    // Your chat interface...
  )
}

// ============================================
// EXAMPLE 6: Protected Route Component
// ============================================

import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Usage:
// <ProtectedRoute>
//   <Dashboard />
// </ProtectedRoute>

// ============================================
// EXAMPLE 7: Check User Authentication
// ============================================

import { useAuth } from '@/hooks/useAuth'

export function ProfileHeader() {
  const { user, profile, logout } = useAuth()

  if (!user) return null

  return (
    <div>
      <p>User: {user.email}</p>
      <p>Name: {profile?.full_name}</p>
      <p>Risk Profile: {profile?.risk_profile}</p>
      <button onClick={logout}>Sign Out</button>
    </div>
  )
}

// ============================================
// EXAMPLE 8: Real-time Data Updates
// ============================================

import { supabase } from '@/api/supabase'
import { useEffect } from 'react'

export function RealtimeHoldingsExample() {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    // Subscribe to real-time changes
    const subscription = supabase
      .from('portfolio_holdings')
      .on('*', payload => {
        console.log('Portfolio updated:', payload)
        // Update UI with new data
      })
      .eq('user_id', user.id)
      .subscribe()

    return () => subscription.unsubscribe()
  }, [user])

  return (
    // Your component...
  )
}

// ============================================
// EXAMPLE 9: Query Raw Data from Supabase
// ============================================

import { supabase } from '@/api/supabase'

export function RawQueryExample() {
  const getMyGoals = async (userId) => {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      console.error('Query failed:', error)
      return []
    }

    return data
  }

  return (
    // Use getMyGoals in your component...
  )
}

// ============================================
// EXAMPLE 10: Error Handling Best Practices
// ============================================

export function ErrorHandlingExample() {
  const handleAsyncOperation = async () => {
    try {
      // Your Supabase operation
      const { data, error } = await supabase
        .from('holdings')
        .select('*')

      if (error) {
        // Handle specific errors
        if (error.code === '42P01') {
          console.error('Table does not exist')
        } else if (error.code === '42501') {
          console.error('Permission denied (RLS policy)')
        } else {
          console.error('Query error:', error.message)
        }
        throw error
      }

      return data
    } catch (error) {
      // Log and show user-friendly error
      console.error('Operation failed:', error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    // Your component...
  )
}

// ============================================
// TIPS & BEST PRACTICES
// ============================================

/*
1. Always check if user exists before operations:
   if (!user) { toast.error('Please login'); return; }

2. Use try/catch for all async operations

3. Handle loading states properly

4. Never store sensitive data in localStorage
   (Supabase handles sessions securely)

5. Use hooks properly - useAuth() at component level

6. Always pass user.id to database operations

7. RLS will prevent unauthorized access automatically

8. Use console.log(error) to debug issues

9. Import from @/api/supabase not direct paths

10. Keep API logic in service files, not components
*/
