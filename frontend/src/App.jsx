import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import CursorGlow from './components/ui/CursorGlow'
import AnimatedBackground from './components/ui/AnimatedBackground'
import LoadingScreen from './components/ui/LoadingScreen'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import AIAdvisor from './pages/AIAdvisor'
import Market from './pages/Market'
import SIPCalculator from './pages/SIPCalculator'
import Portfolio from './pages/Portfolio'
import LearningHub from './pages/LearningHub'

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/advisor" element={<ProtectedRoute><AIAdvisor /></ProtectedRoute>} />
      <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
      <Route path="/sip-calculator" element={<ProtectedRoute><SIPCalculator /></ProtectedRoute>} />
      <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
      <Route path="/learn" element={<ProtectedRoute><LearningHub /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-dark-bg relative">
          <AnimatedBackground />
          <CursorGlow />
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#0d1626',
                color: '#f0f4ff',
                border: '1px solid rgba(26,37,64,1)',
                borderRadius: '12px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#00FF88', secondary: '#050914' } },
              error: { iconTheme: { primary: '#FF4D6D', secondary: '#050914' } },
            }}
          />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
