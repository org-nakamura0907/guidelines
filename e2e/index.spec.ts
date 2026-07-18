import { test, expect } from "@playwright/test";

test.describe("トップページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/guidelines/");
  });

  test("ページタイトルが正しい", async ({ page }) => {
    await expect(page).toHaveTitle("トップページ | nakamura0907のガイドライン");
  });

  test("カードグリッドが表示される", async ({ page }) => {
    await expect(
      page.getByRole("article").getByRole("link", { name: /GitHub Actions/ }),
    ).toBeVisible();
  });

  test("カードをクリックするとドキュメントページに遷移する", async ({
    page,
  }) => {
    await page
      .getByRole("article")
      .getByRole("link", { name: /GitHub Actions/ })
      .click();
    await expect(page).toHaveURL(/ci-cd\/github-actions/);
  });
});
