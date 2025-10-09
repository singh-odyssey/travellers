import { render, screen } from "@testing-library/react"
import SiteFooter from "../site-footer"

describe("SiteFooter", () => {
    it("renders travellersmeet brand text", () => {
        render(<SiteFooter />)
        expect(
            screen.getByText("travellersmeet", { selector: "span" })
        ).toBeInTheDocument()
    })

    it("renders navigation links", () => {
        render(<SiteFooter />)

        expect(screen.getByRole("link", { name: /features/i })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /how it works/i })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /faq/i })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /get started/i })).toBeInTheDocument()
    })

    it("renders copyright notice", () => {
        render(<SiteFooter />)
        expect(
            screen.getByText(/all rights reserved/i)
        ).toBeInTheDocument()
    })
})