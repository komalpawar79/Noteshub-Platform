# SendGrid Setup Guide for NotesHub

## 🚀 Quick Setup (5 minutes)

### Step 1: Create SendGrid Account
1. Go to: https://signup.sendgrid.com/
2. Sign up for FREE account (100 emails/day forever)
3. Verify your email address

### Step 2: Create API Key
1. Login to SendGrid Dashboard
2. Go to: **Settings** → **API Keys**
3. Click **"Create API Key"**
4. Name: `NotesHub Password Reset`
5. Permissions: Select **"Full Access"** (or "Mail Send" only)
6. Click **"Create & View"**
7. **COPY THE API KEY** (you won't see it again!)

### Step 3: Verify Sender Email
1. Go to: **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Fill in your details:
   - From Name: `NotesHub`
   - From Email: `your_email@gmail.com` (or any email you own)
   - Reply To: Same as above
   - Company Address: Your address
4. Click **"Create"**
5. Check your email and click verification link

### Step 4: Update .env File
Add these to `backend/.env`:

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=your_verified_email@gmail.com
FRONTEND_URL=http://localhost:5173
```

### Step 5: Restart Backend
```bash
cd backend
npm run dev
```

## ✅ Test the Feature

1. Go to login page
2. Click "Forgot Password?"
3. Enter registered email
4. Check email inbox (should arrive in seconds!)
5. Click reset link
6. Set new password

## 📊 SendGrid Free Tier Limits

- ✅ **100 emails/day** - FREE forever
- ✅ **No credit card** required
- ✅ **Professional emails** - No spam issues
- ✅ **99.9% uptime** guarantee
- ✅ **Email analytics** dashboard

## 🔧 Troubleshooting

### Error: "The from email does not match a verified Sender Identity"
**Solution:** Make sure you verified the sender email in Step 3

### Error: "Unauthorized"
**Solution:** Check if API key is correct in .env file

### Email not received?
1. Check SendGrid dashboard → Activity
2. Look for email status (delivered/bounced)
3. Check spam folder
4. Verify recipient email is correct

## 🌐 Production Deployment

For production, update:
```env
FRONTEND_URL=https://your-production-domain.com
```

## 💡 Tips

- Keep API key secret (never commit to Git)
- Use environment variables
- Monitor email usage in SendGrid dashboard
- Upgrade plan if you need more than 100 emails/day

## 📞 Support

SendGrid Support: https://support.sendgrid.com/
SendGrid Docs: https://docs.sendgrid.com/

---

**That's it! Your production-ready email system is ready! 🎉**
