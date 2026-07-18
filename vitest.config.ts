/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/**/*.d.ts",
        "src/env.d.ts",
        // shadcn 自動生成コード
        "src/shared/ui/dropdown-menu.tsx",
        "src/shared/lib/utils.ts",
        // Astro ランタイム依存（E2E でカバー）
        "src/content.config.ts",
        "src/shared/config/nav.ts",
      ],
      reporter: ["text", "html", "lcov"],
    },
  },
});
