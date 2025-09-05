# Copilot PR Review: Repository Instructions

Provide focused, high-signal feedback. Prefer short, actionable comments over long narratives. When relevant, include a small code diff suggestion.

Priorities
- Correctness and security first, then performance, then readability.
- Flag anything that can break auth/session, leak secrets, or corrupt data.

Context
- Framework: Next.js (App Router) + TypeScript + Tailwind CSS.
- Backend: Next.js API routes + Prisma (PostgreSQL by default).
- Auth: See `src/lib/auth.ts` and related `src/app/(auth)` routes.

Checklist for every PR
1) Security
   - No secrets committed. Check `.env` usage and `src/lib/prisma.ts`.
   - Validate and sanitize input in API routes (e.g., `src/app/api/**`).
   - Avoid SQL injection (ensure all DB access goes through Prisma).
   - Protect authenticated endpoints; verify session where appropriate.
2) Reliability
   - Type errors? Suspect `any` usage? Suggest types.
   - Handle null/undefined and error branches in API and UI.
3) Performance
   - Avoid N+1 queries; prefer `include/select` wisely.
   - Mark heavy or server-only work in server components/route handlers.
   - Avoid blocking calls on the client; use async patterns correctly.
4) Next.js & React
   - Server vs Client components: correct usage of `"use client"`.
   - No direct Node APIs in client components.
   - Stable keys in lists; avoid unnecessary re-renders.
5) Accessibility & UX
   - Basic a11y attributes and focus management on forms.
   - Descriptive button text, labels, and alt attributes.
6) Styling
   - Consistent Tailwind utility patterns; remove unused classes.
7) Tests & Tooling
   - If behavior changes, suggest minimal tests or type checks.

When proposing code changes
- Keep diffs minimal and scoped.
- Explain why the change helps with one of the checklist items above.

If something is unclear
- Ask one concise question to clarify assumptions before proposing large refactors.
