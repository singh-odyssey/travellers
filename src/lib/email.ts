import { Resend } from 'resend';

// Lazy initialization to prevent build-time errors when API key is not available
let resend: Resend | null = null;

function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}


export async function sendOTPEmail(email: string, otp: string) {
  // Development-only fallback: log to console if no API key is provided.
  // In production, a missing key is a real misconfiguration and should
  // surface as a failure, not a silent false success.
  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.log('='.repeat(50));
      console.log('📧 EMAIL VERIFICATION OTP (Terminal Mode)');
      console.log('='.repeat(50));
      console.log(`To: ${email}`);
      console.log(`OTP: ${otp}`);
      console.log(`Expires: 10 minutes`);
      console.log('='.repeat(50));
      console.log('NOTE: Add RESEND_API_KEY to .env to receive actual emails.');
      console.log('='.repeat(50));
      return { success: true };
    }

    console.error('RESEND_API_KEY is not configured in production.');
    return { success: false, error: new Error('Email service not configured') };
  }

  // Production: send real email via Resend
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const client = getResendClient();
    if (!client) {
      throw new Error('Failed to initialize Resend client');
    }

    await client.emails.send({
      from: `Travellers <${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: email,
      subject: 'Verify your email - Travellers',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(to right, #3b82f6, #2563eb); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Travellers!</h1>
            </div>
            <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">Thank you for signing up! Please verify your email address to complete your registration.</p>
              
              <div style="background: white; border: 2px dashed #3b82f6; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                <p style="font-size: 14px; color: #6b7280; margin: 0 0 10px 0;">Your verification code:</p>
                <p style="font-size: 36px; font-weight: bold; color: #3b82f6; letter-spacing: 8px; margin: 0;">${otp}</p>
              </div>
              
              <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
                ⏱️ This code expires in <strong>10 minutes</strong>
              </p>
              
              <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
                If you didn't create an account, you can safely ignore this email.
              </p>
            </div>
            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
              <p>© 2026 Travellers. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Resend email error:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const appUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const resetUrl = `${appUrl}/reset-password?token=${token}`;

  // Development/Fall-back: log to console if no API key is provided
  if (!process.env.RESEND_API_KEY) {
    console.log('='.repeat(50));
    console.log(' PASSWORD RESET EMAIL (Terminal Mode)');
    console.log('='.repeat(50));
    console.log(`To: ${email}`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log(`Expires: 1 hour`);
    console.log('='.repeat(50));
    console.log('NOTE: Add RESEND_API_KEY to .env to receive actual emails.');
    console.log('='.repeat(50));
    return { success: true };
  }

  // Production: send real email via Resend
  try {
    const client = getResendClient();
    if (!client) {
      throw new Error('Failed to initialize Resend client');
    }

    await client.emails.send({
      from: `Travellers <${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: email,
      subject: 'Reset your password - Travellers',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(to right, #3b82f6, #2563eb); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Reset Your Password</h1>
            </div>
            <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hello,</p>
              <p style="font-size: 16px; margin-bottom: 20px;">We received a request to reset the password for your Travellers account. Click the button below to proceed.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Reset Password
                </a>
              </div>
              
              <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
               This link will expire in <strong>1 hour</strong>.
              </p>
              
              <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
                If you didn't request a password reset, you can safely ignore this email.
              </p>
            </div>
            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
              <p>© 2026 Travellers. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Resend email error:', error);
    return { success: false, error };
  }
}