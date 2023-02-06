import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
  envPrefix: "REACT_APP",
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
  },
  plugins: [react(), svgrPlugin()],
});
