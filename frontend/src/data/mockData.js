// Mock market data
export const marketData = [
  { time: '9:30', SENSEX: 72500, NIFTY: 22100, BankNifty: 48200 },
  { time: '10:30', SENSEX: 72650, NIFTY: 22180, BankNifty: 48500 },
  { time: '11:30', SENSEX: 72400, NIFTY: 22050, BankNifty: 48100 },
  { time: '12:30', SENSEX: 72750, NIFTY: 22250, BankNifty: 48800 },
  { time: '13:30', SENSEX: 72900, NIFTY: 22350, BankNifty: 49200 },
  { time: '14:30', SENSEX: 73100, NIFTY: 22450, BankNifty: 49500 },
  { time: '15:30', SENSEX: 73250, NIFTY: 22550, BankNifty: 49800 },
]

// Portfolio holdings
export const portfolioHoldings = [
  { id: 1, name: 'TCS', symbol: 'TCS', shares: 10, price: 3850, change: 2.5, sector: 'IT' },
  { id: 2, name: 'Infosys', symbol: 'INFY', shares: 25, price: 1680, change: -1.2, sector: 'IT' },
  { id: 3, name: 'HDFC Bank', symbol: 'HDFCBANK', shares: 5, price: 1750, change: 3.1, sector: 'Banking' },
  { id: 4, name: 'Reliance', symbol: 'RELIANCE', shares: 8, price: 2950, change: 1.8, sector: 'Energy' },
  { id: 5, name: 'ICICI Bank', symbol: 'ICICIBANK', shares: 12, price: 950, change: 2.9, sector: 'Banking' },
]

// SIP Calculator presets
export const sipPresets = [
  { name: 'Conservative', allocation: { debt: 70, equity: 30 }, expectedReturn: 7.5 },
  { name: 'Balanced', allocation: { debt: 50, equity: 50 }, expectedReturn: 9.5 },
  { name: 'Moderate Growth', allocation: { debt: 30, equity: 70 }, expectedReturn: 11.5 },
  { name: 'Aggressive', allocation: { debt: 10, equity: 90 }, expectedReturn: 13.5 },
]

// Learning courses
export const courses = [
  {
    id: 1,
    title: 'Stock Market Basics',
    description: 'Learn the fundamentals of stock trading',
    lessons: 12,
    duration: '4 weeks',
    level: 'Beginner',
    image: '📚',
  },
  {
    id: 2,
    title: 'Mutual Funds 101',
    description: 'Understanding mutual fund investments',
    lessons: 8,
    duration: '2 weeks',
    level: 'Beginner',
    image: '💰',
  },
  {
    id: 3,
    title: 'Technical Analysis',
    description: 'Master technical analysis for trading',
    lessons: 15,
    duration: '6 weeks',
    level: 'Intermediate',
    image: '📈',
  },
  {
    id: 4,
    title: 'Portfolio Management',
    description: 'Build and manage your investment portfolio',
    lessons: 10,
    duration: '4 weeks',
    level: 'Advanced',
    image: '📊',
  },
]

// Financial personality quiz
export const personalityQuestions = [
  { question: 'How do you react to a 20% market drop?', options: ['Panic sell', 'Hold & wait', 'Buy more'] },
  { question: 'Ideal investment timeframe?', options: ['Less than 1 year', '1-5 years', 'More than 5 years'] },
  { question: 'Risk tolerance?', options: ['Very low', 'Moderate', 'High'] },
  { question: 'Investment experience?', options: ['Beginner', 'Intermediate', 'Expert'] },
]

// Investment recommendations
export const recommendations = [
  { fund: 'Axis Blue Chip Fund', risk: 'Medium', return: 12.5, allocation: 30 },
  { fund: 'HDFC Mid-Cap Fund', risk: 'High', return: 14.8, allocation: 25 },
  { fund: 'Liquid Fund', risk: 'Low', return: 6.2, allocation: 15 },
  { fund: 'Tax Saver Fund', risk: 'Medium', return: 11.5, allocation: 30 },
]

// AI Advisor sample conversations
export const sampleConversations = [
  {
    role: 'user',
    content: 'I have ₹1 lakh to invest. What should I do?'
  },
  {
    role: 'assistant',
    content: 'Based on your profile, I recommend a diversified approach: 50% in equity mutual funds, 30% in fixed income, and 20% in liquid funds for emergency needs.'
  },
]

// Market indices data for learning
export const marketIndices = [
  { name: 'SENSEX', value: 73250, change: 2.5, changePercent: 1.2 },
  { name: 'NIFTY 50', value: 22550, change: 1.8, changePercent: 0.9 },
  { name: 'BANK NIFTY', value: 49800, change: 2.2, changePercent: 1.1 },
  { name: 'MID CAP', value: 11200, change: -0.5, changePercent: -0.4 },
]
