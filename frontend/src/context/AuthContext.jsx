import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, authService, profileService } from '../api/supabase'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Listen to auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        // Fetch user profile
        try {
          const profileData = await profileService.getProfile(session.user.id)
          setProfile(profileData)
        } catch (error) {
          console.error('Error fetching profile:', error)
        }
      } else {
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const register = async (fullName, email, password) => {
    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      })

      if (authError) throw authError

      // Create user profile
      if (authData.user) {
        const profileData = await profileService.createProfile(authData.user.id, {
          full_name: fullName,
          email,
          onboarding_complete: false,
          created_at: new Date().toISOString()
        })
        setProfile(profileData)
        toast.success('Account created! Please verify your email.')
      }

      setUser(authData.user)
      return authData.user
    } catch (error) {
      toast.error(error.message || 'Registration failed')
      throw error
    }
  }

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      setUser(data.user)

      // Fetch profile
      const profileData = await profileService.getProfile(data.user.id)
      setProfile(profileData)

      toast.success('Logged in successfully!')
      return data.user
    } catch (error) {
      toast.error(error.message || 'Login failed')
      throw error
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      toast.success('Logged out successfully!')
    } catch (error) {
      toast.error('Logout failed')
      throw error
    }
  }

  const updateProfile = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in')

      const updatedProfile = await profileService.updateProfile(user.id, {
        ...updates,
        updated_at: new Date().toISOString()
      })

      setProfile(updatedProfile)
      toast.success('Profile updated!')
      return updatedProfile
    } catch (error) {
      toast.error(error.message || 'Update failed')
      throw error
    }
  }

  const updateUser = (data) => {
    setUser(prev => ({ ...prev, ...data }))
    setProfile(prev => ({ ...prev, ...data }))
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      login,
      register,
      logout,
      updateProfile,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }
