import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"
import path from "path"

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./vitest.setup.ts",
        coverage: {
            reporter: ["text", "json", "html"],
            provider: "v8",
        },
    },
    resolve: {
        alias: {
            "next/server": path.resolve(__dirname, "node_modules/next/server.js"),
            "next/navigation": path.resolve(__dirname, "node_modules/next/navigation.js"),
        },
    },
})