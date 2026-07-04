import { vi } from "vitest";
import DashboardLayout from "./layout";

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({
  auth: mocks.auth,
}));

vi.mock("next/navigation", () => ({
  redirect: mocks.redirect,
}));

vi.mock("@/components/Sidebar", () => ({
  default: () => <aside>Sidebar</aside>,
}));

describe("DashboardLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects unauthenticated users to sign in", async () => {
    mocks.auth.mockResolvedValue(null);

    await DashboardLayout({
      children: <div>Protected content</div>,
    });

    expect(mocks.redirect).toHaveBeenCalledWith("/signin");
  });

  it("allows authenticated users to access the dashboard", async () => {
    mocks.auth.mockResolvedValue({
      user: {
        id: "user-1",
        email: "traveller@example.com",
      },
    });

    await DashboardLayout({
      children: <div>Protected content</div>,
    });

    expect(mocks.redirect).not.toHaveBeenCalled();
  });
});