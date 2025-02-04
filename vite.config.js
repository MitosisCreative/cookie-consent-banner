import { defineConfig } from "vite";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [cssInjectedByJsPlugin()],
  build: {
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "CookieConsentPopup",
      fileName: "index",
      formats: ["es", "cjs", "umd"], // Generate ES module and CommonJS formats
    },
    rollupOptions: {
      external: [], // Avoid bundling dependencies
      output: {
        entryFileNames: "[format]/[name].js", // Separate formats into folders
        manualChunks: undefined,
      },
    },
  },
  css: {
    postcss: {
      plugins: [require("autoprefixer")],
    },
  },
});
