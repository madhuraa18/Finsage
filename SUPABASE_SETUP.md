# FinSage + Supabase Setup Guide 🚀

## What's Ready

✅ Supabase client library installed  
✅ Authentication service created  
✅ Database schema prepared  
✅ AuthContext updated to use Supabase  
✅ All user credentials stored securely  

---

## 📋 Step-by-Step Setup

### Step 1: Create Supabase Project

1. Go to **[supabase.com](https://supabase.com)** and sign up (free tier available)
2. Click **"New Project"**
3. Fill in details:
   - **Project Name**: FinSage
   - **Database Password**: (strong password)
   - **Region**: Choose closest to you
4. Click **"Create new project"** (takes ~2 min)

### Step 2: Get Supabase Keys

1. Go to **Settings → API** in Supabase dashboard
2. Copy these keys:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`

3. Update `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ0eXAi...paste-your-key...
```

### Step 3: Create Database Tables

1. In Supabase, go to **SQL Editor**
2. Click **"New Query"**
3. Copy-paste the entire SQL from `SUPABASE_SCHEMA.sql`
4. Click **"Run"**

This creates all tables with:
- User profiles
- Portfolio holdings
- Investment goals
- Conversations (AI Advisor)
- Learning progress
- Watchlist

### Step 4: Enable Authentication

1. Go to **Authentication → Providers**
2. Make sure **Email** is enabled (it is by default)
3. Go to **Auth Settings → Email Auth**
4. Configure email templates (optional)

### Step 5: Test Login/Register

1. Start frontend:
```bash
cd frontend
npm run dev
```

2. Go to http://localhost:5173/register
3. Create account
4. Check **Supabase → Authentication → Users** to see your account

---

## 🔐 Data Security Features

### Row Level Security (RLS)
- ✅ Users can ONLY see their own data
- ✅ Policies enforced at database level
- ✅ No data leakage between users

### Encryption
- ✅ Passwords hashed with bcrypt (Supabase built-in)
- ✅ All data encrypted in transit (HTTPS)
- ✅ JWT tokens for session management

### How It Works
1. User signs up → Supabase Auth creates account
2. Auth returns JWT token (session)
3. Token stored in browser sessionStorage
4. API calls include token in header
5. RLS policies verify user owns the data

---

## 🗄️ Database Schema

### profiles
```sql
- id (UUID, primary key)
- full_name, email
- age, occupation, annual_income
- risk_profile (conservative/balanced/aggressive)
- onboarding_complete (boolean)
- financial_personality
```

### portfolio_holdings
```sql
- id (UUID)
- user_id (references profiles)
- symbol, company_name, sector
- shares, purchase_price, current_price
- gain_loss, gain_loss_percent
```

### goals
```sql
- id (UUID)
- user_id
- goal_name, goal_type
- target_amount, current_amount
- monthly_sip, expected_return
```

### conversations
```sql
- id (UUID)
- user_id
- messages (JSON array of chat history)
- title, summary
```

---

## 🔄 API Usage Examples

### Authentication

```javascript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

// Sign out
await supabase.auth.signOut()

// Get current user
const { data: { user } } = await supabase.auth.getUser()
```

### User Profile

```javascript
// Get profile
const profile = await profileService.getProfile(userId)

// Update profile
const updated = await profileService.updateProfile(userId, {
  age: 28,
  risk_profile: 'aggressive'
})
```

### Portfolio

```javascript
// Get holdings
const holdings = await portfolioService.getPortfolio(userId)

// Add holding
const holding = await portfolioService.addHolding(userId, {
  symbol: 'TCS',
  shares: 10,
  purchase_price: 3500,
  current_price: 3850
})

// Update holding
const updated = await portfolioService.updateHolding(holdingId, {
  current_price: 3900
})

// Delete holding
await portfolioService.deleteHolding(holdingId)
```

### Goals

```javascript
// Create goal
const goal = await goalsService.createGoal(userId, {
  goal_name: 'Retirement',
  goal_type: 'retirement',
  target_amount: 5000000,
  monthly_sip: 10000
})

// Get all goals
const goals = await goalsService.getGoals(userId)

// Update goal
const updated = await goalsService.updateGoal(goalId, {
  current_amount: 50000
})
```

---

## 🧪 Testing Authentication

### Test Sign Up
```bash
1. Go to http://localhost:5173/register
2. Enter: 
   - Name: John Doe
   - Email: john@example.com
   - Password: Test@1234
3. Click "Create Account"
4. Check Supabase Dashboard → Auth → Users
```

### Test Sign In
```bash
1. Go to http://localhost:5173/login
2. Enter credentials
3. Should redirect to dashboard
4. User data loads from Supabase
```

### Test Data Storage
```javascript
// In browser console (F12)
const { data } = await supabase
  .from('profiles')
  .select('*')
console.log(data)
```

---

## 📊 Monitor User Data

### In Supabase Dashboard:
- **Auth → Users**: See all registered users
- **Table Editor**: View all tables
- **SQL Editor**: Run custom queries
- **Logs**: Check API calls and errors

### Common Queries

```sql
-- See all users
SELECT id, email, created_at FROM auth.users;

-- See user profiles
SELECT id, full_name, email, risk_profile FROM profiles;

-- See portfolio by user
SELECT * FROM portfolio_holdings WHERE user_id = 'user-uuid';

-- See user conversations
SELECT COUNT(*) FROM conversations WHERE user_id = 'user-uuid';
```

---

## 🚨 Common Issues & Fixes

### Issue: "Invalid API key"
**Solution:**
- Check `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`
- They should match exactly from Supabase dashboard
- Restart dev server after updating `.env`

### Issue: "RLS policy violation"
**Solution:**
- This means user is trying to access someone else's data
- Policies are working correctly!
- Check that `user_id` matches `auth.uid()`

### Issue: "Auth required"
**Solution:**
- User must be logged in to access protected routes
- Check AuthContext is wrapping app
- Verify JWT token is being sent with requests

### Issue: "CORS error"
**Solution:**
- Go to Supabase → Settings → API
- Check CORS settings allow your frontend URL
- For localhost: Should work by default

---

## 🔗 Connect Backend (Optional)

If you want to keep Flask backend for AI features:

```python
# backend/config.py
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

# backend/requirements.txt
supabase
```

---

## 📱 Credentials Storage Flow

```
User enters credentials
    ↓
Supabase Auth validates
    ↓
Auth returns JWT token + user data
    ↓
Token stored in sessionStorage (secure)
    ↓
Token sent with API requests
    ↓
RLS policies verify access
    ↓
Data returned only if authorized
```

---

## 🎯 Next Steps

1. ✅ Create Supabase project (supabase.com)
2. ✅ Copy API keys to `.env`
3. ✅ Run SQL schema in Supabase
4. ✅ Start frontend: `npm run dev`
5. ✅ Register new account
6. ✅ Login and explore
7. ✅ Check Supabase dashboard for data

---

## 📚 Documentation Links

- Supabase Auth: https://supabase.com/docs/guides/auth
- PostgreSQL: https://www.postgresql.org/docs/
- JavaScript Client: https://supabase.com/docs/reference/javascript

---

## ✨ You Now Have

✅ Secure user authentication  
✅ Encrypted credential storage  
✅ Row-level security (RLS)  
✅ PostgreSQL database  
✅ Real-time capability  
✅ Scalable infrastructure  

**All completely free tier compatible!** 🚀
