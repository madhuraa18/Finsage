# FinSage - Quick Start Guide

## 🚀 Frontend Setup Complete!

### ✅ What's Done
- 10 premium pages created with full UI/UX
- All dependencies installed
- `.env` file configured
- Ready to run!

---

## 🏃 Quick Start

### 1. **Start Frontend Dev Server**
```bash
cd frontend
npm run dev
```
The app will open at: **http://localhost:5173**

### 2. **Start Backend Server** (if not running)
```bash
cd backend
# Install Python dependencies
pip install -r requirements.txt

# Set environment variables
set FLASK_ENV=development

# Run server
python app.py
```
Backend API runs at: **http://localhost:5000**

---

## 🌐 Access the App

### Pages Available:
| Page | URL | Status |
|------|-----|--------|
| Landing | http://localhost:5173 | Public |
| Login | http://localhost:5173/login | Public |
| Register | http://localhost:5173/register | Public |
| Dashboard | http://localhost:5173/dashboard | Protected |
| AI Advisor | http://localhost:5173/advisor | Protected |
| SIP Calculator | http://localhost:5173/sip-calculator | Protected |
| Portfolio | http://localhost:5173/portfolio | Protected |
| Market | http://localhost:5173/market | Protected |
| Learning Hub | http://localhost:5173/learn | Protected |
| Onboarding | http://localhost:5173/onboarding | Protected |

---

## 🔑 Demo Credentials

```
Email: user@finsage.com
Password: demo123
```

---

## 📋 Available Commands

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend
```bash
python app.py        # Run Flask server
```

---

## ⚙️ Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=FinSage
```

### Backend (.env in backend folder)
```env
FLASK_ENV=development
MONGO_URI=mongodb://localhost:27017/
JWT_SECRET_KEY=your-secret-key
FRONTEND_URL=http://localhost:5173
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module" errors
**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: Backend connection errors
**Solution:**
1. Ensure MongoDB is running
2. Check `VITE_API_URL` in `.env` matches backend port
3. Verify backend is running on port 5000

### Issue: Port already in use
**Solution:**
```bash
# Find process using port 5173
lsof -i :5173

# Kill process
kill -9 <PID>
```

---

## 📊 Features Enabled

✅ Real-time portfolio tracking  
✅ AI advisor chat  
✅ SIP calculator  
✅ Market data  
✅ Learning courses  
✅ User authentication  
✅ Profile management  
✅ Investment goals  

---

## 🎨 Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```js
colors: {
  electric: '#00D4FF',  // Primary blue
  neon: '#00FF88',      // Secondary green
}
```

### Change Theme
Edit `frontend/src/index.css`:
```css
:root {
  --bg-primary: #050914;
  --electric: #00D4FF;
  --neon: #00FF88;
}
```

---

## 📱 Responsive Design

All pages fully responsive:
- 📱 Mobile (320px+)
- 📱 Tablet (640px+)
- 🖥️ Desktop (1024px+)
- 🖥️ Wide (1280px+)

---

## 🚀 Deployment

### Build for Production
```bash
cd frontend
npm run build
```

Output: `frontend/dist/` folder

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
Drag & drop the `dist` folder to Netlify

---

## 📚 Documentation

See `FRONTEND_COMPLETION.md` for detailed information about:
- Component architecture
- Animation system
- Data structure
- API integration
- Performance optimization

---

## ✨ Next Steps

1. ✅ Start frontend: `npm run dev`
2. ✅ Start backend: `python app.py`
3. ✅ Access http://localhost:5173
4. ✅ Sign up / Login
5. ✅ Explore the app!

---

## 💡 Pro Tips

- Use React DevTools browser extension for debugging
- Check Console (F12) for any warnings
- Mock data is used in charts/forms for demo
- All animations are hardware-accelerated for smooth performance
- Protected routes require authentication

---

## 🎯 Success Checklist

- [ ] Frontend running on 5173
- [ ] Backend running on 5000
- [ ] Can access http://localhost:5173
- [ ] Can see Landing page
- [ ] Can create account
- [ ] Can login
- [ ] Dashboard loads with data
- [ ] All charts display correctly
- [ ] Animations are smooth
- [ ] Mobile view works

---

**Happy Coding! 🚀**
