// Delegate to NextAuth's built-in handler — do not override.
// The sign-in form uses next-auth/react's signIn() which goes through
// /api/auth/[...nextauth] (callback/credentials endpoint).
// This file is intentionally left to re-export the NextAuth handlers
// so it doesn't shadow the catch-all route with a conflicting implementation.
export { GET, POST } from "../[...nextauth]/route";

