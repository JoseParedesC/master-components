import { defineConfig } from "vitest/config";

export default defineConfig({
  // globals: true permite que Testing Library limpie el DOM entre pruebas.
  test: { environment: "jsdom", globals: true, include: ["tests/**/*.test.tsx"] }
});
