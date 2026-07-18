import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["src/pages/**/*.{astro,ts}"],
  project: ["src/**/*.{ts,tsx,astro}", "e2e/**/*.ts"],
  ignoreDependencies: [
    // CSS @import で使用 — JS import がないため Knip が検出できない
    "@fontsource-variable/geist",
    "@tailwindcss/typography",
    "tailwindcss",
    "tw-animate-css",
    // CLI ツールとして使用 (npx shadcn add ...) かつ CSS @import でも使用
    "shadcn",
  ],
  ignore: [
    // shadcn が自動生成したファイル — 将来利用予定のエクスポートを含む
    "src/shared/ui/dropdown-menu.tsx",
  ],
};

export default config;
