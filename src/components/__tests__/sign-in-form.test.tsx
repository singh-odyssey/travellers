import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignInForm from "../sign-in-form";
import { vi } from "vitest";

const mocks = vi.hoisted(() => ({
  signIn: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
}));

vi.mock("next-auth/react", () => ({
  signIn: mocks.signIn,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mocks.replace,
    refresh: mocks.refresh,
  }),
}));

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => (
    <span role="img" aria-label={alt} />
  ),
}));

describe("SignInForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  async function fillAndSubmit() {
    const user = userEvent.setup();

    render(<SignInForm />);

    const emailInput = screen.getByPlaceholderText("you@example.com");
    const passwordInput = document.querySelector(
      'input[name="password"]',
    ) as HTMLInputElement;

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "wrongpassword");

    await user.click(
      screen.getByRole("button", { name: /^sign in$/i }),
    );
  }

  it("does not redirect when credentials are invalid", async () => {
    mocks.signIn.mockResolvedValue({
      ok: false,
      error: "CredentialsSignin",
      code: "credentials",
      status: 401,
      url: null,
    });

    await fillAndSubmit();

    expect(
      await screen.findByText("Invalid email or password"),
    ).toBeInTheDocument();

    expect(mocks.replace).not.toHaveBeenCalled();
    expect(mocks.refresh).not.toHaveBeenCalled();
  });

  it("redirects to dashboard after successful sign in", async () => {
    mocks.signIn.mockResolvedValue({
      ok: true,
      error: undefined,
      code: undefined,
      status: 200,
      url: "/dashboard",
    });

    await fillAndSubmit();

    await waitFor(() => {
      expect(mocks.replace).toHaveBeenCalledWith("/dashboard");
    });

    expect(mocks.refresh).toHaveBeenCalled();
  });
});