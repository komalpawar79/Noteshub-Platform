# ⚡ Quick Deployment Checklist

## ✅ Before Deployment

### 1. Frontend Build
```bash
cd frontend
npm run build
```
✅ Check: `frontend/dist` folder created

### 2. Environment Variables Ready

**Backend (.env):**
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RESEND_API_KEY=re_...
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

**Frontend (.env):**
```
VITE_API_URL=https://your-backend.onrender.com/api
```

### 3. MongoDB Atlas
- ✅ IP Whitelist: `0.0.0.0/0` (Allow all)
- ✅ Database user created
- ✅ Connection string copied

### 4. Services Active
- ✅ Cloudinary account
- ✅ Resend API key
- ✅ MongoDB Atlas cluster

---

## 🚀 Recommended: Render + Vercel

### Step 1: Deploy Backend (Render)
1. Go to https://render.com/
2. New → Web Service
3. Connect GitHub repo
4. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add all environment variables
6. Deploy!
7. Copy backend URL: `https://noteshub-backend.onrender.com`

### Step 2: Deploy Frontend (Vercel)
1. Go to https://vercel.com/
2. Import Project
3. Settings:
   - Root Directory: `frontend`
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
   ```
   VITE_API_URL=https://noteshub-backend.onrender.com/api
   ```
5. Deploy!

### Step 3: Update Backend
1. Go back to Render backend
2. Environment → Edit `FRONTEND_URL`
3. Set to: `https://your-app.vercel.app`
4. Save (auto-redeploys)

---

## 🎉 Done!

Your app is live:
- Frontend: https://your-app.vercel.app
- Backend: https://noteshub-backend.onrender.com

---

## 🧪 Test Production

1. ✅ Register new user
2. ✅ Login
3. ✅ Upload note
4. ✅ Download note
5. ✅ Add comment
6. ✅ Forgot password (check email)
7. ✅ Admin login (admin@noteshub.com / admin123)

---

## 📝 Post-Deployment

### Create Admin User in Production
1. Go to Render dashboard
2. Your backend service → Shell
3. Run:
   ```bash
   node src/createAdmin.js
   ```

### Keep Backend Awake (Optional)
Use https://cron-job.org/ to ping your backend every 14 minutes:
- URL: `https://your-backend.onrender.com/api/auth/profile`
- Interval: Every 14 minutes

---

## 🔄 Future Updates

Just push to GitHub:
```bash
git add .
git commit -m "Update"
git push
```

Both Render and Vercel will auto-deploy! 🚀

---

**Total Time: ~15 minutes**
**Cost: $0 (100% FREE)**
