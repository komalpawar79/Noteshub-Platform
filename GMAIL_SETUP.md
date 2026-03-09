# Gmail Setup for Password Reset Feature

## Steps to Configure Gmail for Nodemailer:

### 1. Enable 2-Step Verification
1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the steps to enable it

### 2. Generate App Password
1. After enabling 2-Step Verification, go back to Security settings
2. Under "Signing in to Google", click on "App passwords"
3. Select "Mail" as the app and "Other" as the device
4. Enter "NotesHub" as the device name
5. Click "Generate"
6. Copy the 16-character password (remove spaces)

### 3. Update .env File
Add these variables to your `backend/.env` file:

```
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_character_app_password
FRONTEND_URL=http://localhost:5173
```

Replace:
- `your_gmail@gmail.com` with your actual Gmail address
- `your_16_character_app_password` with the app password you generated

### 4. Restart Backend Server
After updating .env, restart your backend server:
```bash
cd backend
npm run dev
```

## Testing the Feature:

1. Go to login page
2. Click "Forgot Password?"
3. Enter your registered email
4. Check your email inbox for the reset link
5. Click the link and set a new password

## Important Notes:
- The reset link expires in 1 hour
- Make sure your email is registered in the system
- Check spam folder if you don't receive the email
- For production, use environment variables securely

## Troubleshooting:
- If email doesn't send, check your Gmail credentials
- Make sure 2-Step Verification is enabled
- Verify the app password is correct (no spaces)
- Check backend console for error messages
