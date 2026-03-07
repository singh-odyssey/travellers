import { describe, it, expect, beforeEach, vi } from "vitest"
import bcrypt from "bcryptjs"

vi.mock("@/lib/prisma", () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    session: {
      create: vi.fn(),
    },
  },
}))

vi.mock("@/lib/otp", () => ({
  generateOTP: vi.fn(() => "123456"),
  isValidOTPFormat: vi.fn(() => true),
}))

vi.mock("@/lib/email", () => ({
  sendOTPEmail: vi.fn(() => Promise.resolve({ success: true })),
}))

import { POST } from "../signup/route"
import prisma from "@/lib/prisma"

beforeEach(() => {
  vi.clearAllMocks()
})

describe("POST /api/auth/signup", () => {

  const createRequest = (data: Record<string, string>) => {
    const body = new FormData()
    Object.entries(data).forEach(([key, value]) =>
      body.append(key, value)
    )
    return { formData: async () => body }
  }

  it("returns 400 for missing name", async () => {
    const req = createRequest({
      email: "test@example.com",
      password: "password123",
    })

    const res = await POST(req as any)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toBe("Invalid input")
  })

  it("returns 400 if email already exists", async () => {
    ;(prisma.user.findUnique as any).mockResolvedValue({
      id: "1",
      email: "test@example.com",
    })

    const req = createRequest({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    })

    const res = await POST(req as any)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toBe("Email already in use")
  })

  it("returns 200 and creates user/session (test env)", async () => {
    ;(prisma.user.findUnique as any).mockResolvedValue(null)
    ;(prisma.user.create as any).mockResolvedValue({
      id: "1",
      email: "test@example.com",
      name: "Test User",
      passwordHash: await bcrypt.hash("password123", 6),
    })
    ;(prisma.session.create as any).mockResolvedValue({
      id: "sess1",
      userId: "1",
      sessionToken: "mocktoken",
      expires: new Date(Date.now() + 1000),
    })

    const req = createRequest({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    })

    const res = await POST(req as any)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.ok).toBe(true)
  })

  it("uses 12 saltRounds in production", async () => {
    vi.stubEnv("NODE_ENV", "production")

    ;(prisma.user.findUnique as any).mockResolvedValue(null)
    ;(prisma.user.create as any).mockResolvedValue({
      id: "2",
      email: "prod@example.com",
      name: "Prod User",
      passwordHash: await bcrypt.hash("password123", 12),
    })
    ;(prisma.session.create as any).mockResolvedValue({
      id: "sess2",
      userId: "2",
      sessionToken: "mocktoken",
      expires: new Date(Date.now() + 1000),
    })

    const req = createRequest({
      name: "Prod User",
      email: "prod@example.com",
      password: "password123",
    })

    const res = await POST(req as any)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.ok).toBe(true)

    vi.unstubAllEnvs()
  })
})