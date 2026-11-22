import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Prototipo: `npm run demo` (dev) o `npm run build:demo` (estático en demo-dist).
export default defineConfig({
  root: "demo",
  plugins: [react()],
  build: { outDir: "../demo-dist", emptyOutDir: true }
});
