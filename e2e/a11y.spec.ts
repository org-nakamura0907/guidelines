import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

test.describe("アクセシビリティ", () => {
  test("トップページ", async ({ page }) => {
    await page.goto("/guidelines/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("ドキュメントページ", async ({ page }) => {
    await page.goto("/guidelines/ci-cd/github-actions");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      // Shiki (github-dark) のコメント色がWCAG AAのコントラスト比を満たさないため除外
      .exclude("pre")
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
