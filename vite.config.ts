import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@config": path.resolve(__dirname, "src/config"),
      "@configs": path.resolve(__dirname, "src/config"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@features": path.resolve(__dirname, "src/features"),
      "@guards": path.resolve(__dirname, "src/guards"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },
});
