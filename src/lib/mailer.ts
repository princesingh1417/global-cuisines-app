import nodemailer from 'nodemailer';
import User from '@/models/User';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Generate a secure hashed token to append to the URL parameter
    const rawToken = userId.toString() + Date.now().toString();
    const hashedToken = await bcryptjs.hash(rawToken, 10);

    // Save token in the MongoDB User record
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000 // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000
      });
    }

    // Connect to SMTP Server
    // IMPORTANT: Make sure to set these in your Vercel / .env.local
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS 
      }
    });

    const actionText = emailType === "VERIFY" ? "verify your email" : "reset your password";
    const endpoint = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
    const domain = process.env.DOMAIN || 'http://localhost:3000';

    const mailOptions = {
      from: `"Global Cuisines" <${process.env.SMTP_USER}>`,
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email - Global Cuisines" : "Reset your password - Global Cuisines",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #d11;">Global Cuisines</h2>
          <p>Hello,</p>
          <p>Please click the button below to ${actionText}.</p>
          <a href="${domain}/${endpoint}?token=${hashedToken}" style="display: inline-block; padding: 12px 24px; background-color: #d11; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">
            ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
          </a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #555;">${domain}/${endpoint}?token=${hashedToken}</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: any) {
    throw new Error(error.message);
  }
}
