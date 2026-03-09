# Resend Setup Guide - EASIEST Option! 🚀

## ⚡ Super Quick Setup (2 minutes)

### Step 1: Create Resend Account
1. Go to: https://resend.com/signup
2. Sign up with GitHub or Email (FREE)
3. No credit card needed!

### Step 2: Get API Key
1. After login, you'll see the dashboard
2. Click **"API Keys"** in sidebar
3. Click **"Create API Key"**
4. Name: `NotesHub`
5. Permission: **Full Access**
6. Click **"Add"**
7. **COPY THE API KEY** (starts with `re_`)

### Step 3: Update .env File
Add this to `backend/.env`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
```

### Step 4: Restart Backend
```bash
cd backend
npm run dev
```

## ✅ Test Now!

1. Go to login page
2. Click "Forgot Password?"
3. Enter any registered email
4. Email will arrive instantly! ⚡

## 🎁 Resend Free Tier

- ✅ **3,000 emails/month** - FREE forever
- ✅ **No verification** needed
- ✅ **Instant setup** - No waiting
- ✅ **onboarding@resend.dev** - Works immediately
- ✅ **Beautiful emails** - Professional look

## 📝 Notes

- Default sender: `onboarding@resend.dev` (works instantly)
- For custom domain: Add your domain in Resend dashboard
- No email verification needed for testing
- Production ready out of the box

## 🔧 Troubleshooting

### Error: "Missing API key"
**Solution:** Check if `RESEND_API_KEY` is in .env file

### Email not received?
1. Check Resend dashboard → Emails
2. Look for delivery status
3. Check spam folder

## 💡 Why Resend?

- ✅ Easiest setup (2 minutes)
- ✅ No verification hassle
- ✅ Works instantly
- ✅ Modern & developer-friendly
- ✅ Better free tier (3000 vs 100)

---

**That's it! Just get the API key and you're done! 🎉**

**Resend Link:** https://resend.com/signup
