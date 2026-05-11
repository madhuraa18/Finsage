import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('finsage_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('finsage_token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// Market API
export const marketAPI = {
  getOverview: () => api.get('/market/overview'),
  getIndices: () => api.get('/market/indices'),
  getMutualFunds: () => api.get('/market/mutual-funds'),
  getSentiment: () => api.get('/market/sentiment'),
  getNews: () => api.get('/market/news'),
  getTickers: () => api.get('/market/tickers'),
}

// Advisor API
export const advisorAPI = {
  chat: (messages, stream = false) => api.post('/advisor/chat', { messages, stream }),
  getInvestmentPlan: () => api.get('/advisor/investment-plan'),
  refreshPlan: () => api.post('/advisor/investment-plan/refresh'),
  explainELI5: (concept) => api.post('/advisor/explain-eli5', { concept }),
  crashSimulator: (pct) => api.post('/advisor/crash-simulator', { crash_percentage: pct }),
}

// Portfolio API
export const portfolioAPI = {
  get: () => api.get('/portfolio/'),
  add: (data) => api.post('/portfolio/add', data),
  remove: (id) => api.delete(`/portfolio/remove/${id}`),
  update: (id, data) => api.put(`/portfolio/update/${id}`, data),
}

// Goals API
export const goalsAPI = {
  get: () => api.get('/goals/'),
  create: (data) => api.post('/goals/', data),
  update: (id, data) => api.put(`/goals/${id}`, data),
  delete: (id) => api.delete(`/goals/${id}`),
  sipCalculate: (data) => api.post('/goals/sip-calculate', data),
}

// Profile API
export const profileAPI = {
  get: () => api.get('/profile/'),
  completeOnboarding: (data) => api.post('/profile/onboarding', data),
  update: (data) => api.put('/profile/', data),
  healthScore: () => api.get('/profile/health-score'),
}

// Learning API
export const learnAPI = {
  getLessons: () => api.get('/learn/lessons'),
  completeLesson: (id) => api.post(`/learn/complete/${id}`),
  getQuiz: (id) => api.get(`/learn/quiz/${id}`),
}
