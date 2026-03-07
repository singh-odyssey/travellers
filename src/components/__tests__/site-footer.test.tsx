import { render, screen } from "@testing-library/react"
import SiteFooter from "../site-footer"
import { vi } from "vitest"

// Mock next/image
vi.mock("next/image", () => ({
    default: ({ src, alt, ...props }: any) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt} {...props} />
    },
}))

// Mock lucide-react
vi.mock("lucide-react", () => ({
    Github: () => <div data-testid="github-icon" />,
    Twitter: () => <div data-testid="twitter-icon" />,
    Instagram: () => <div data-testid="instagram-icon" />,
    Plane: () => <div data-testid="plane-icon" />,
}))

describe("SiteFooter", () => {
    it("renders travellersmeet brand text", () => {
        render(<SiteFooter />)
        expect(
            screen.getByText("travellersmeet", { selector: "span" })
        ).toBeInTheDocument()
    })

    it("renders section headers", () => {
        render(<SiteFooter />)
        expect(screen.getByRole("heading", { name: /Explore/i })).toBeInTheDocument()
        expect(screen.getByRole("heading", { name: /Community/i })).toBeInTheDocument()
        expect(screen.getByRole("heading", { name: /Legal/i })).toBeInTheDocument()
        expect(screen.getByRole("heading", { name: /Newsletter/i })).toBeInTheDocument()
    })

    it("renders copyright notice", () => {
        render(<SiteFooter />)
        expect(
            screen.getByText(/© 2026 TravellersMeet/i)
        ).toBeInTheDocument()
    })
})