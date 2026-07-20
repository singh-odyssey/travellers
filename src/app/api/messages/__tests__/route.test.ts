import { describe, it, expect, beforeEach, vi } from "vitest";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { GET, POST } from "../route";

vi.mock("@/lib/prisma", () => ({
  default: {
    message: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
    conversation: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    $transaction: vi.fn((promises) => Promise.all(promises)),
  },
}));

vi.mock("@/lib/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("@/lib/pusher", () => ({
  triggerPusher: vi.fn(() => Promise.resolve()),
}));

describe("Messages API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (auth as any).mockResolvedValue({ user: { id: "user-1", name: "User 1" } });
  });

  describe("GET /api/messages", () => {
    it("returns 400 if conversationId is missing", async () => {
      const req = {
        url: "http://localhost:3000/api/messages",
      };
      const res = await GET(req as any);
      expect(res.status).toBe(400);
    });

    it("returns messages for a valid conversation", async () => {
      (prisma.conversation.findFirst as any).mockResolvedValue({ id: "conv-1" });
      (prisma.message.findMany as any).mockResolvedValue([{ id: "msg-1", text: "Hello" }]);

      const req = {
        url: "http://localhost:3000/api/messages?conversationId=conv-1",
      };
      const res = await GET(req as any);
      const data = await res.json();
      expect(res.status).toBe(200);
      expect(data.messages).toHaveLength(1);
    });
  });

  describe("POST /api/messages", () => {
    it("sends a message and triggers pusher", async () => {
      (prisma.conversation.findFirst as any).mockResolvedValue({ id: "conv-1" });
      (prisma.conversation.findUnique as any).mockResolvedValue({ users: [{ id: "user-1" }, { id: "user-2" }] });
      (prisma.message.create as any).mockResolvedValue({ id: "msg-2", text: "New message" });
      (prisma.conversation.update as any).mockResolvedValue({ id: "conv-1" });

      const req = {
        json: async () => ({ conversationId: "conv-1", text: "New message" }),
      };

      const res = await POST(req as any);
      const data = await res.json();
      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message.text).toBe("New message");
    });
  });
});
