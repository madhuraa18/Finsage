# Supabase Integration Checklist ✅

## Pre-Setup (Before You Begin)

- [ ] Have a browser open to supabase.com
- [ ] Have your project files ready
- [ ] Have .env file open for editing
- [ ] Have Supabase SQL Editor ready

---

## Phase 1: Supabase Project Setup

### Step 1: Create Account
- [ ] Go to https://supabase.com
- [ ] Sign up (email or GitHub)
- [ ] Verify email if needed
- [ ] Login to dashboard

### Step 2: Create Project
- [ ] Click "New Project"
- [ ] Project name: "FinSage"
- [ ] Set strong database password
- [ ] Choose region closest to you
- [ ] Click "Create new project"
- [ ] Wait 2-3 minutes for creation

### Step 3: Get API Keys
- [ ] Go to Settings → API
- [ ] Copy "Project URL" → Save
- [ ] Copy "anon public" key → Save
- [ ] ⚠️ Keep these keys safe!

---

## Phase 2: Update Frontend Configuration

### Step 1: Update .env
- [ ] Open `frontend/.env`
- [ ] Add `VITE_SUPABASE_URL=https://xxx.supabase.co`
- [ ] Add `VITE_SUPABASE_ANON_KEY=your-key`
- [ ] Save file
- [ ] Restart dev server (`npm run dev`)

### Step 2: Verify Installation
- [ ] Run `npm list @supabase/supabase-js`
- [ ] Should show version 2.106.x or higher
- [ ] No errors in terminal

### Step 3: Check Imports
- [ ] Open `src/api/supabase.js`
- [ ] Should exist and be 200+ lines
- [ ] Contains authService, profileService, etc.
- [ ] No import errors in browser console

---

## Phase 3: Create Database Schema

### Step 1: Access SQL Editor
- [ ] Go to Supabase Dashboard
- [ ] Click "SQL Editor" (left sidebar)
- [ ] Click "New Query"
- [ ] ✅ Editor is open

### Step 2: Run Schema
- [ ] Open file: `SUPABASE_SCHEMA.sql`
- [ ] Copy entire content
- [ ] Paste into Supabase SQL Editor
- [ ] Click "Run" (green button)
- [ ] Wait for "Success" message

### Step 3: Verify Tables
- [ ] Click "Table Editor" (left sidebar)
- [ ] Should see 8 new tables:
  - [ ] profiles
  - [ ] portfolios
  - [ ] portfolio_holdings
  - [ ] goals
  - [ ] conversations
  - [ ] investment_plans
  - [ ] learning_progress
  - [ ] watchlist

---

## Phase 4: Test Authentication

### Test 1: Sign Up
- [ ] Start app: `npm run dev`
- [ ] Go to http://localhost:5173/register
- [ ] Fill in details:
  - [ ] Name: Test User
  - [ ] Email: testuser@finsage.com
  - [ ] Password: TestPass123!
- [ ] Click "Create Account"
- [ ] Should see success message
- [ ] ✅ Or toast notification

### Test 2: Check in Supabase
- [ ] Go to Supabase Dashboard
- [ ] Click "Authentication" (left sidebar)
- [ ] Click "Users" tab
- [ ] Should see your test account
- [ ] Email matches what you entered
- [ ] Created timestamp shows recent time

### Test 3: Check Profile Table
- [ ] Go to Table Editor
- [ ] Click "profiles" table
- [ ] Should see one row with:
  - [ ] id (matches user UUID)
  - [ ] full_name (Test User)
  - [ ] email (testuser@finsage.com)
  - [ ] created_at (recent timestamp)

### Test 4: Login
- [ ] Go to http://localhost:5173/logout
- [ ] Click "Sign In"
- [ ] Enter credentials:
  - [ ] Email: testuser@finsage.com
  - [ ] Password: TestPass123!
- [ ] Should redirect to Dashboard
- [ ] ✅ Should see user data loaded

---

## Phase 5: Test Data Operations

### Test 1: Add Portfolio Holding
- [ ] On Dashboard
- [ ] Add sample holding (stock)
- [ ] Go to Supabase Table Editor
- [ ] Click "portfolio_holdings"
- [ ] Should see your holding listed
- [ ] Verify user_id matches your profile id

### Test 2: Create Investment Goal
- [ ] On Dashboard
- [ ] Create sample goal (retirement)
- [ ] Go to Supabase
- [ ] Check "goals" table
- [ ] ✅ Your goal should be there

### Test 3: Check RLS Security
- [ ] Try accessing another user's data (you can't)
- [ ] Should get "unauthorized" error
- [ ] This is RLS working correctly ✅

---

## Phase 6: Verify Integration

### Frontend Checks
- [ ] AuthContext using Supabase ✅
- [ ] No API calls to Flask auth ✅
- [ ] User data loads from Supabase ✅
- [ ] Logout clears session ✅

### Backend Checks (Optional)
- [ ] Flask still running on port 5000 ✅
- [ ] For API endpoints: advisor, market data, etc.
- [ ] Portfolio data from Supabase ✅

### Database Checks
- [ ] All 8 tables created ✅
- [ ] RLS policies enabled ✅
- [ ] Can insert/update own data ✅
- [ ] Can't access other users' data ✅

---

## Phase 7: Common Fixes

If something doesn't work, check:

### "Invalid API key" Error
- [ ] Copy keys exactly from Supabase dashboard
- [ ] No extra spaces or quotes
- [ ] Restart dev server after .env change
- [ ] Check browser console for exact error

### "RLS policy violation"
- [ ] This is security working (not an error!)
- [ ] User trying to access others' data
- [ ] Should see in your code

### "Auth required"
- [ ] User not logged in
- [ ] Session expired
- [ ] JWT token missing
- [ ] Refresh page and login again

### "Table doesn't exist"
- [ ] SQL schema wasn't run
- [ ] Go back to Phase 3
- [ ] Verify all tables were created

### Module not found "@supabase/supabase-js"
- [ ] Run `npm install @supabase/supabase-js`
- [ ] Check package.json has @supabase entry
- [ ] Delete node_modules and reinstall

---

## Final Verification Checklist

### ✅ Project Setup
- [ ] Supabase account created
- [ ] Project created and running
- [ ] API keys obtained
- [ ] Keys added to .env

### ✅ Frontend
- [ ] Supabase package installed
- [ ] supabase.js created
- [ ] AuthContext updated
- [ ] .env configured

### ✅ Database
- [ ] Schema SQL executed
- [ ] All 8 tables created
- [ ] RLS policies enabled
- [ ] Indexes created

### ✅ Authentication
- [ ] Can sign up
- [ ] User appears in Auth → Users
- [ ] Can login with credentials
- [ ] Dashboard loads with user data

### ✅ Data Operations
- [ ] Can add holdings
- [ ] Can create goals
- [ ] Data saves to Supabase
- [ ] Can update/delete data

### ✅ Security
- [ ] RLS prevents unauthorized access
- [ ] Sessions managed with JWT
- [ ] User data isolated per account
- [ ] Passwords encrypted

---

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Can't create project | Check email verified, try another browser |
| API key error | Copy exact key from dashboard, restart server |
| Tables not showing | Run SUPABASE_SCHEMA.sql in SQL Editor |
| Sign up fails | Check password requirements, valid email |
| Can't login | Verify credentials, check Supabase users table |
| RLS error | This is working! User accessing wrong data |
| Profile not loading | Check authContext is wrapping app |
| CORS error | Supabase settings → API → check CORS |

---

## Support Resources

1. **This Project**
   - [ ] SUPABASE_SETUP.md (detailed guide)
   - [ ] SUPABASE_QUICK_REF.md (quick reference)
   - [ ] SUPABASE_EXAMPLES.md (code examples)

2. **Official Docs**
   - Supabase Docs: https://supabase.com/docs
   - Auth Guide: https://supabase.com/docs/guides/auth
   - Database: https://supabase.com/docs/guides/database

3. **Getting Help**
   - Supabase Discord: https://discord.supabase.io
   - Stack Overflow: Search "supabase"
   - GitHub Issues: https://github.com/supabase/supabase

---

## Next Steps After Setup

Once everything is working:

1. [ ] Deploy to production
2. [ ] Set up custom domain
3. [ ] Enable additional auth (Google, GitHub)
4. [ ] Set up email templates
5. [ ] Monitor in Supabase dashboard
6. [ ] Back up regularly
7. [ ] Scale infrastructure as needed

---

## 🎉 Success Criteria

You're done when:
- ✅ Can register new user
- ✅ Can login with email/password
- ✅ Data appears in Supabase tables
- ✅ Dashboard loads user-specific data
- ✅ No console errors
- ✅ Other users can't see your data

**When all checked: You're ready to launch!** 🚀

---

## 💡 Pro Tips

- Keep API keys secret (don't commit to git)
- Use environment variables for all sensitive data
- Test signup/login flows thoroughly
- Monitor Supabase logs for issues
- Read RLS error messages carefully
- Check database constraints before inserting data
- Use Supabase CLI for local development (optional)
- Enable email confirmation for production

---

**Good luck! You've got this! 💪**

Questions? Check the documentation files or Supabase official docs.
