# 🚀 Production Deployment Guide - NotesHub

## ✅ Pre-Deployment Checklist

- [x] Frontend build created (`dist` folder)
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Environment variables ready
- [ ] Cloudinary account active
- [ ] Resend API key active

---

## 📦 Deployment Options

### Option 1: Deploy on Render (Recommended - FREE)
### Option 2: Deploy on Railway
### Option 3: Deploy on Vercel + Render

---

## 🎯 Option 1: Render Deployment (Best for Full-Stack)

### A. Deploy Backend on Render

1. **Create Render Account**
   - Go to: https://render.com/
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Or use "Public Git Repository" and paste your repo URL

3. **Configure Backend Service**
   ```
   Name: noteshub-backend
   Region: Choose nearest
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_production
   JWT_EXPIRE=7d
   
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   
   RESEND_API_KEY=your_resend_api_key
   FRONTEND_URL=https://your-frontend-url.vercel.app
   
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Copy your backend URL: `https://noteshub-backend.onrender.com`

### B. Deploy Frontend on Vercel

1. **Create Vercel Account**
   - Go to: https://vercel.com/
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Or drag & drop the `frontend` folder

3. **Configure Frontend**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variable**
   ```
   VITE_API_URL=https://noteshub-backend.onrender.com/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app is live! 🎉

---

## 🎯 Option 2: Railway Deployment (Easiest)

### Deploy Both Backend & Frontend on Railway

1. **Create Railway Account**
   - Go to: https://railway.app/
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add Backend Service**
   - Click "New" → "GitHub Repo"
   - Root Directory: `backend`
   - Add all environment variables (same as above)
   - Railway will auto-detect Node.js

4. **Add Frontend Service**
   - Click "New" → "GitHub Repo"
   - Root Directory: `frontend`
   - Add environment variable:
     ```
     VITE_API_URL=${{backend.RAILWAY_PUBLIC_DOMAIN}}/api
     ```

5. **Generate Domains**
   - Click on each service → Settings → Generate Domain
   - Update FRONTEND_URL in backend env variables

---

## 🎯 Option 3: Vercel (Frontend) + Render (Backend)

**Best combination for performance!**

Follow:
- Backend: Option 1A (Render)
- Frontend: Option 1B (Vercel)

---

## 🔧 Post-Deployment Configuration

### 1. Update MongoDB Atlas
- Network Access → Add IP: `0.0.0.0/0` (Allow all)
- Or add Render/Railway IP addresses

### 2. Update Resend
- Add production domain to verified senders (optional)
- Update email templates with production URL

### 3. Update Cloudinary
- No changes needed (works automatically)

### 4. Test Everything
- ✅ User registration
- ✅ Login/Logout
- ✅ Upload notes
- ✅ Download notes
- ✅ Comments
- ✅ Forgot password email
- ✅ Admin panel

---

## 📊 Free Tier Limits

### Render (Backend)
- ✅ 750 hours/month free
- ✅ Sleeps after 15 min inactivity
- ✅ Wakes up in ~30 seconds

### Vercel (Frontend)
- ✅ 100 GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Automatic HTTPS

### Railway
- ✅ $5 free credit/month
- ✅ ~500 hours runtime
- ✅ No sleep mode

---

## 🚨 Important Notes

### Backend Sleep Mode (Render Free Tier)
- Backend sleeps after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up
- Solution: Use a cron job to ping every 14 minutes
  - https://cron-job.org/

### CORS Configuration
Backend already configured for all origins in development.
For production, update in `backend/src/server.js`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
```

### Environment Variables Security
- Never commit `.env` files
- Use platform's environment variable settings
- Rotate secrets regularly

---

## 🎉 Deployment Complete!

Your app is now live at:
- **Frontend:** https://your-app.vercel.app
- **Backend:** https://your-backend.onrender.com

---

## 📞 Troubleshooting

### Backend not connecting?
- Check MongoDB Atlas IP whitelist
- Verify all environment variables
- Check Render logs

### Frontend API errors?
- Verify VITE_API_URL is correct
- Check CORS settings
- Ensure backend is awake

### Emails not sending?
- Verify RESEND_API_KEY
- Check Resend dashboard for errors
- Update FRONTEND_URL to production domain

---

## 🔄 Continuous Deployment

Both Render and Vercel support automatic deployments:
- Push to GitHub → Auto-deploy
- No manual steps needed
- Instant updates

---

**Need help? Check platform docs:**
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- Railway: https://docs.railway.app

**Your production-ready app is ready to deploy! 🚀**
