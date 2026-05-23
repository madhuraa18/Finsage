import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth methods
export const authService = {
  // Sign up with email & password
  async signup(email, password, fullName) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    })
    if (error) throw error
    return data
  },

  // Sign in with email & password
  async signin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  },

  // Sign out
  async signout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // Get session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  },

  // Subscribe to auth changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  },

  // Reset password
  async resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    if (error) throw error
    return data
  }
}

// User profile methods
export const profileService = {
  // Get user profile
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (error) throw error
    return data
  },

  // Update user profile
  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    if (error) throw error
    return data
  },

  // Create user profile
  async createProfile(userId, profileData) {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ id: userId, ...profileData }])
      .select()
      .single()
    if (error) throw error
    return data
  }
}

// Portfolio methods
export const portfolioService = {
  // Get user portfolio
  async getPortfolio(userId) {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', userId)
    if (error) throw error
    return data
  },

  // Add holding
  async addHolding(userId, holding) {
    const { data, error } = await supabase
      .from('portfolio_holdings')
      .insert([{ user_id: userId, ...holding }])
      .select()
      .single()
    if (error) throw error
    return data
  },

  // Update holding
  async updateHolding(holdingId, updates) {
    const { data, error } = await supabase
      .from('portfolio_holdings')
      .update(updates)
      .eq('id', holdingId)
      .select()
      .single()
    if (error) throw error
    return data
  },

  // Delete holding
  async deleteHolding(holdingId) {
    const { error } = await supabase
      .from('portfolio_holdings')
      .delete()
      .eq('id', holdingId)
    if (error) throw error
  }
}

// Goals/SIP methods
export const goalsService = {
  // Get user goals
  async getGoals(userId) {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)
    if (error) throw error
    return data
  },

  // Create goal
  async createGoal(userId, goal) {
    const { data, error } = await supabase
      .from('goals')
      .insert([{ user_id: userId, ...goal }])
      .select()
      .single()
    if (error) throw error
    return data
  },

  // Update goal
  async updateGoal(goalId, updates) {
    const { data, error } = await supabase
      .from('goals')
      .update(updates)
      .eq('id', goalId)
      .select()
      .single()
    if (error) throw error
    return data
  }
}

// Conversation history (for AI advisor)
export const conversationService = {
  // Save conversation
  async saveConversation(userId, messages) {
    const { data, error } = await supabase
      .from('conversations')
      .insert([{
        user_id: userId,
        messages,
        created_at: new Date()
      }])
      .select()
      .single()
    if (error) throw error
    return data
  },

  // Get conversations
  async getConversations(userId) {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  }
}
