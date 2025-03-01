import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "@svgr/rollup";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    envDir: "./environment",
    resolve: {
        alias: {
            "@": path.join(__dirname, "src/"),
        },
    },
    css: {
        postcss: "./postcss.config.js",
    },
});
