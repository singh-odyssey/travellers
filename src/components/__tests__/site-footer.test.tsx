import { render, screen } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";

import SiteFooter from "../site-footer";

type MockImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
};

vi.mock("next/image", () => ({
  default: ({
    fill: _fill,
    priority: _priority,
    ...props
  }: MockImageProps) => {
    // Next.js-only Image props are intentionally removed before
    // forwarding the remaining attributes to the native img element.
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img alt="" {...props} />;
  },
}));

vi.mock("lucide-react", () => ({
  Github: () => <svg data-testid="github-icon" />,
  Twitter: () => <svg data-testid="twitter-icon" />,
  Instagram: () => <svg data-testid="instagram-icon" />,
  Plane: () => <svg data-testid="plane-icon" />,
}));

vi.mock("react-icons/fa", () => ({
  FaLinkedin: () => <svg data-testid="linkedin-icon" />,
}));

describe("SiteFooter", () => {
  it("renders travellersmeet brand text", () => {
    render(<SiteFooter />);

    expect(
      screen.getByText("travellersmeet", {
        selector: "span",
      }),
    ).toBeInTheDocument();
  });

  it("renders section headers", () => {
    render(<SiteFooter />);

    expect(
      screen.getByRole("heading", { name: /Explore/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /Community/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /Legal/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /Newsletter/i }),
    ).toBeInTheDocument();
  });

  it("renders copyright notice", () => {
    render(<SiteFooter />);

    expect(
      screen.getByText(/© 2026 TravellersMeet/i),
    ).toBeInTheDocument();
  });
});