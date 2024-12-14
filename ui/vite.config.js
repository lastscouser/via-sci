import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 5000, // Set the limit (in KB) to avoid warnings
  },
});
