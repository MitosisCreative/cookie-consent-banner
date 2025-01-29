import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "CookieConsentPopup",
      fileName: "index",
      formats: ["es", "cjs"], // Generate ES module and CommonJS formats
    },
    rollupOptions: {
      external: [], // Avoid bundling dependencies
      output: {
        entryFileNames: "[format]/[name].js", // Separate formats into folders
        assetFileNames: "[name].[ext]",
      },
    },
  },
  css: {
    postcss: {
      plugins: [require("autoprefixer")],
    },
  },
});
