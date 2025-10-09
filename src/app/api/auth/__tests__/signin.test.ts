import { describe, it, expect, beforeEach, vi } from "vitest"
import bcrypt from "bcryptjs"

vi.mock("@/lib/prisma")

import { POST } from "../signin/route"
import { prisma } from "@/lib/prisma"

beforeEach(() => {
    vi.clearAllMocks()
})

describe("POST /api/auth/signin", () => {
    it("returns 401 if email or password is missing", async () => {
        const body = new FormData()
        // no mail and password

        const req = new Request("http://localhost/api/auth/signin", {
            method: "POST",
            body,
        })

        const res = await POST(req as any)
        const data = await res.json()
        expect(res.status).toBe(401)
        expect(data.error).toBe("Invalid credentials")
    })

    it("returns 401 if user does not exist", async () => {
        ;(prisma.user.findUnique as any).mockResolvedValue(null)

        const body = new FormData()
        body.append("email", "nouser@example.com")
        body.append("password", "whatever")

        const req = new Request("http://localhost/api/auth/signin", {
            method: "POST",
            body,
        })

        const res = await POST(req as any)
        const data = await res.json()
        expect(res.status).toBe(401)
        expect(data.error).toBe("Invalid credentials")
    })

    it("returns 401 if password is wrong", async () => {
        const hash = await bcrypt.hash("password", 10)

        ;(prisma.user.findUnique as any).mockResolvedValue({
            id: "1",
            email: "test@example.com",
            passwordHash: hash,
            name: "Tester",
        })

        const body = new FormData()
        body.append("email", "test@example.com")
        body.append("password", "invalid")

        const req = new Request("http://localhost/api/auth/signin", {
            method: "POST",
            body,
        })

        const res = await POST(req as any)
        const data = await res.json()
        expect(res.status).toBe(401)
        expect(data.error).toBe("Invalid credentials")
    })

    it("returns 200 if credentials are valid", async () => {
        const hash = await bcrypt.hash("password", 10)

        ;(prisma.user.findUnique as any).mockResolvedValue({
            id: "1",
            email: "test@example.com",
            passwordHash: hash,
            name: "Tester",
        })

        ;(prisma.session.create as any).mockResolvedValue({
            id: "sess1",
            userId: "1",
            expires: new Date(Date.now() + 60_000),
            sessionToken: "mocktoken",
        })

        const body = new FormData()
        body.append("email", "test@example.com")
        body.append("password", "password")

        const req = new Request("http://localhost/api/auth/signin", {
            method: "POST",
            body,
        })

        const res = await POST(req as any)
        const data = await res.json()
        expect(res.status).toBe(200)
        expect(data.ok).toBe(true)
    })
})