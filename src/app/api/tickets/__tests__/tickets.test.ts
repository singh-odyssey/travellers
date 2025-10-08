import { describe, it, expect, beforeEach, vi } from "vitest"
import { prisma } from "@/lib/prisma"
import { POST } from "../route"
import type { NextRequest } from "next/server"

vi.mock("@/lib/prisma")

class MockFile extends Blob {
    name: string
    lastModified: number
    constructor(chunks: any[], name: string, opts?: any) {
        super(chunks, opts)
        this.name = name
        this.lastModified = Date.now()
    }
}
const dummyFile = new MockFile(["dummy"], "ticket.pdf", { type: "application/pdf" }) as any

function makeNextRequest(form: FormData): NextRequest {
    return {
        formData: async () => form,
    } as unknown as NextRequest
}

beforeEach(() => {
    vi.clearAllMocks()
})

describe("POST /api/tickets", () => {
    it("returns 400 if destination is missing", async () => {
        const body = new FormData()
        body.append("departureDate", "2025-12-31")
        body.append("file", dummyFile)

        const res = await POST(makeNextRequest(body))
        const data = await res.json()

        expect(res.status).toBe(400)
        expect(data.error).toBe("Invalid input")
    })

    it("returns 400 if file is missing", async () => {
        const body = new FormData()
        body.append("destination", "Paris")
        body.append("departureDate", "2025-12-31")

        const res = await POST(makeNextRequest(body))
        const data = await res.json()

        expect(res.status).toBe(400)
        expect(data.error).toBe("Invalid input")
    })

    it("returns 400 if departureDate is invalid", async () => {
        const body = new FormData()
        body.append("destination", "Paris")
        body.append("departureDate", "not-a-date")
        body.append("file", dummyFile)

        const res = await POST(makeNextRequest(body))
        const data = await res.json()

        expect(res.status).toBe(400)
        expect(data.error).toBe("Invalid input")
    })

    it("returns 400 if departureDate is empty string", async () => {
        const body = new FormData()
        body.append("destination", "Paris")
        body.append("departureDate", "")
        body.append("file", dummyFile)

        const res = await POST(makeNextRequest(body))
        const data = await res.json()

        expect(res.status).toBe(400)
        expect(data.error).toBe("Invalid input")
    })

    it("returns 401 if no demo user exists", async () => {
        ;(prisma.user.findFirst as any).mockResolvedValue(null)

        const body = new FormData()
        body.append("destination", "Paris")
        body.append("departureDate", "2025-12-31")
        body.append("file", dummyFile)

        const res = await POST(makeNextRequest(body))
        const data = await res.json()

        expect(res.status).toBe(401)
        expect(data.error).toBe("No user")
    })

    it("returns 200 and creates ticket if valid input and user exists", async () => {
        ;(prisma.user.findFirst as any).mockResolvedValue({ id: "user1" })
        ;(prisma.ticket.create as any).mockResolvedValue({
            id: "ticket1",
            userId: "user1",
            destination: "Paris",
            departureDate: new Date("2025-12-31"),
            ticketUrl: "about:blank",
            status: "PENDING",
        })

        const body = new FormData()
        body.append("destination", "Paris")
        body.append("departureDate", "2025-12-31")
        body.append("file", dummyFile)

        const res = await POST(makeNextRequest(body))
        const data = await res.json()

        expect(res.status).toBe(200)
        expect(data.ok).toBe(true)
        expect(prisma.ticket.create).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({
                    userId: "user1",
                    destination: "Paris",
                    status: "PENDING",
                }),
            }),
        )
    })
})