const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  await resend.emails.send({
    from: 'NotesHub <onboarding@resend.dev>',
    to: email,
    subject: 'Password Reset Request - NotesHub',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #FF6600 0%, #FF8533 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🔐 Password Reset</h1>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Hello!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            You requested to reset your password for your NotesHub account.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="display: inline-block; 
                      padding: 15px 40px; 
                      background-color: #FF6600; 
                      color: white; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      font-weight: bold;
                      font-size: 16px;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Or copy and paste this link in your browser:
          </p>
          <p style="color: #FF6600; word-break: break-all; background: white; padding: 10px; border-radius: 5px; font-size: 12px;">
            ${resetUrl}
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px; margin: 5px 0;">
              ⏰ This link will expire in 1 hour.
            </p>
            <p style="color: #999; font-size: 12px; margin: 5px 0;">
              🔒 If you didn't request this, please ignore this email.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>© ${new Date().getFullYear()} NotesHub. All rights reserved.</p>
        </div>
      </div>
    `
  });
};

module.exports = { sendPasswordResetEmail };
