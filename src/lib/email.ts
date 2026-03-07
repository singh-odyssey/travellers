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
  // Development/Fall-back: log to console if no API key is provided
  if (!process.env.RESEND_API_KEY) {
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
      from: 'Travellers <onboarding@resend.dev>',
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