# Supabase Integration - Quick Reference

## 🔑 Keys Needed

Get from: **Supabase Dashboard → Settings → API**

```env
VITE_SUPABASE_URL=https://PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

---

## 🚀 5-Minute Setup

```bash
# 1. Create account at supabase.com
# 2. Create new project
# 3. Copy API keys to .env
# 4. Run SQL schema in Supabase SQL Editor
# 5. Start app: npm run dev
```

---

## 📝 Import Statements

```javascript
// Authentication
import { supabase, authService } from '@/api/supabase'

// User profile
import { profileService } from '@/api/supabase'

// Portfolio operations
import { portfolioService } from '@/api/supabase'

// Goals/SIP
import { goalsService } from '@/api/supabase'

// Conversations (AI)
import { conversationService } from '@/api/supabase'
```

---

## 🔒 Authentication Methods

```javascript
// Sign up
authService.signup(email, password, fullName)

// Sign in
authService.signin(email, password)

// Sign out
authService.signout()

// Get current user
authService.getCurrentUser()

// Listen to auth changes
authService.onAuthStateChange((event, session) => {
  console.log(event, session)
})
```

---

## 📊 Common Operations

### Create Portfolio Entry
```javascript
const holding = await portfolioService.addHolding(userId, {
  symbol: 'TCS',
  company_name: 'Tata Consultancy Services',
  sector: 'IT',
  shares: 10,
  purchase_price: 3500,
  current_price: 3850,
  quantity: 10,
  total_value: 38500
})
```

### Create Investment Goal
```javascript
const goal = await goalsService.createGoal(userId, {
  goal_name: 'Retirement Planning',
  goal_type: 'retirement',
  target_amount: 5000000,
  current_amount: 0,
  target_date: '2050-12-31',
  monthly_sip: 10000,
  expected_return: 12
})
```

### Save Chat History
```javascript
const conversation = await conversationService.saveConversation(userId, [
  { role: 'user', content: 'How to start SIP?' },
  { role: 'assistant', content: 'SIP is...' }
])
```

### Update User Profile
```javascript
const updated = await profileService.updateProfile(userId, {
  age: 28,
  occupation: 'Software Engineer',
  annual_income: '15-30',
  risk_profile: 'aggressive',
  onboarding_complete: true
})
```

---

## 🔐 Security Features

✅ **Passwords**: Hashed with bcrypt (Supabase)  
✅ **Sessions**: JWT tokens with expiration  
✅ **RLS**: Row-level security on all tables  
✅ **Encryption**: HTTPS/TLS in transit  
✅ **Validation**: Database constraints  

---

## 📱 Real-Time Features (Optional)

```javascript
// Listen to real-time changes
const subscription = supabase
  .from('portfolio_holdings')
  .on('*', payload => {
    console.log('Change received!', payload)
  })
  .subscribe()

// Unsubscribe
subscription.unsubscribe()
```

---

## 🆘 Debugging

```javascript
// Enable debug logging
const { data, error } = await supabase
  .from('profiles')
  .select('*')

console.log(error) // See what went wrong
console.log(data)  // See the data

// Check user in console
const user = await authService.getCurrentUser()
console.log(user)
```

---

## 📈 Monitoring

**Supabase Dashboard:**
- Auth → Users (registered accounts)
- Table Editor (view all data)
- SQL Editor (run queries)
- Logs (API activity)

---

## 🎯 Common Flows

### Signup Flow
```
Register.jsx → authService.signup()
→ Supabase Auth creates account
→ ProfileService.createProfile()
→ User profile created
→ Navigate to Onboarding
```

### Login Flow
```
Login.jsx → authService.signin()
→ Supabase Auth validates
→ JWT token returned
→ ProfileService.getProfile()
→ AuthContext updated
→ Navigate to Dashboard
```

### Portfolio Update Flow
```
Dashboard → portfolioService.addHolding()
→ INSERT into portfolio_holdings
→ RLS validates user_id
→ Data saved
→ UI updates
```

---

## ⚠️ Important Rules

1. **Always use AuthContext** for user data
2. **Never store sensitive data** in localStorage (Supabase handles it)
3. **RLS enforces security** - don't bypass it
4. **Use userId from auth** in all queries
5. **Handle errors gracefully** with try/catch

---

## 📚 Files Modified

- ✅ `src/api/supabase.js` (new) - All Supabase methods
- ✅ `src/context/AuthContext.jsx` - Updated to use Supabase
- ✅ `.env` - Supabase configuration
- ✅ `SUPABASE_SCHEMA.sql` - Database schema

---

## 🚀 Ready to Use!

All files are integrated and working. Just add your Supabase keys and you're done!

Questions? Check `SUPABASE_SETUP.md` for detailed guide.
