import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

function serveDecapAdmin(): Plugin {
  return {
    name: "serve-decap-admin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (url === "/admin" || url === "/admin/") {
          const adminHtml = path.resolve(__dirname, "public/admin/index.html");
          res.setHeader("Content-Type", "text/html");
          res.end(fs.readFileSync(adminHtml, "utf-8"));
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [serveDecapAdmin(), react(), tailwindcss(), tsconfigPaths(), svgr()],
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
