/**
 * Generate a 6-digit OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Validate OTP format
 */
export function isValidOTPFormat(otp: string): boolean {
  return /^\d{6}$/.test(otp);
}
