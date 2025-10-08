import { vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import Toggle from "../toggle"

describe("Toggle", () => {
    it("is unchecked when theme is light", () => {
        render(<Toggle theme="light" changeTheme={vi.fn()} />)

        const checkbox = screen.getByRole("checkbox")
        expect(checkbox).not.toBeChecked()
    })

    it("is checked when theme is dark", () => {
        render(<Toggle theme="dark" changeTheme={vi.fn()} />)

        const checkbox = screen.getByRole("checkbox")
        expect(checkbox).toBeChecked()
    })

    it("calls changeTheme when toggled", () => {
        const mockChange = vi.fn()
        render(<Toggle theme="light" changeTheme={mockChange} />)

        const checkbox = screen.getByRole("checkbox")
        fireEvent.click(checkbox)

        expect(mockChange).toHaveBeenCalledTimes(1)
    })
})