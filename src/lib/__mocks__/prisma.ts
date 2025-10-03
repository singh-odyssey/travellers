import { vi } from "vitest"

export const prisma = {
    user: {
        findUnique: vi.fn(),
        create: vi.fn(),
        findFirst: vi.fn(),
    },
    session: {
        create: vi.fn(),
        findUnique: vi.fn(),
        delete: vi.fn(),
    },
    ticket: {
        create: vi.fn(),
    },
}