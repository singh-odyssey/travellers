import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock prisma
vi.mock("@/lib/prisma", () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

// Mock next-auth auth method
vi.mock("@/lib/auth", () => ({
  auth: vi.fn(),
}));

// Mock bcryptjs compare and hash
vi.mock("bcryptjs", () => ({
  compare: vi.fn(),
  hash: vi.fn(() => Promise.resolve("new_hashed_password")),
}));

import { PUT } from "../change-password/route";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { compare } from "bcryptjs";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("PUT /api/auth/change-password", () => {
  const createRequest = (bodyData: any) => {
    return {
      json: async () => bodyData,
    };
  };

  it("returns 401 Unauthorized if session is missing", async () => {
    ;(auth as any).mockResolvedValue(null);

    const req = createRequest({ currentPassword: "password123", newPassword: "newpassword123" });
    const res = await PUT(req as any);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data.error).toBe("Unauthorized");
  });

  it("returns 400 for invalid inputs", async () => {
    ;(auth as any).mockResolvedValue({ user: { email: "test@example.com" } });

    // case 1: empty fields
    let req = createRequest({ currentPassword: "", newPassword: "" });
    let res = await PUT(req as any);
    let data = await res.json();
    expect(res.status).toBe(400);

    // case 2: newPassword too short
    req = createRequest({ currentPassword: "password123", newPassword: "short" });
    res = await PUT(req as any);
    data = await res.json();
    expect(res.status).toBe(400);
  });

  it("returns 400 if user is an OAuth user (no passwordHash)", async () => {
    ;(auth as any).mockResolvedValue({ user: { email: "test@example.com" } });
    ;(prisma.user.findUnique as any).mockResolvedValue({
      id: "user123",
      email: "test@example.com",
      passwordHash: null, // OAuth user
    });

    const req = createRequest({ currentPassword: "password123", newPassword: "newpassword123" });
    const res = await PUT(req as any);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain("Google/Apple cannot change passwords directly");
  });

  it("returns 400 if current password is incorrect", async () => {
    ;(auth as any).mockResolvedValue({ user: { email: "test@example.com" } });
    ;(prisma.user.findUnique as any).mockResolvedValue({
      id: "user123",
      email: "test@example.com",
      passwordHash: "old_hashed_password",
    });
    ;(compare as any).mockResolvedValue(false); // wrong password

    const req = createRequest({ currentPassword: "wrongpassword", newPassword: "newpassword123" });
    const res = await PUT(req as any);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Incorrect current password");
  });

  it("returns 200 and updates password hash if input is correct", async () => {
    ;(auth as any).mockResolvedValue({ user: { email: "test@example.com" } });
    ;(prisma.user.findUnique as any).mockResolvedValue({
      id: "user123",
      email: "test@example.com",
      passwordHash: "old_hashed_password",
    });
    ;(compare as any).mockResolvedValue(true); // correct password

    const req = createRequest({ currentPassword: "correctpassword", newPassword: "newpassword123" });
    const res = await PUT(req as any);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: "user123" },
      data: { passwordHash: "new_hashed_password" },
    });
  });
});
