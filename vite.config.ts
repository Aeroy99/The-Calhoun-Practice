import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Capacity preview mode: disable minification and enable source maps for debugging
    minify: process.env.CAPACITY_BUILD_MODE === 'preview' ? false : 'esbuild',
    sourcemap: process.env.CAPACITY_BUILD_MODE === 'preview' ? true : false,
  },

});
