import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  if (mode === "production") {
    const payloadUrl = process.env.VITE_PAYLOAD_URL || "";
    const isLocal =
      !payloadUrl ||
      payloadUrl.includes("localhost") ||
      payloadUrl.includes("127.0.0.1");
    if (isLocal) {
      throw new Error(
        "VITE_PAYLOAD_URL must be the public CMS origin (not localhost) for production builds.",
      );
    }
  }

  return {
    plugins: [react(), tailwindcss(), tsconfigPaths(), svgr()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      minify: process.env.CAPACITY_BUILD_MODE === "preview" ? false : "esbuild",
      sourcemap: process.env.CAPACITY_BUILD_MODE === "preview",
    },
  };
});
