import { test, expect } from "@playwright/test";

test.describe("ドキュメントページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/guidelines/ci-cd/github-actions");
  });

  test("h1 タイトルが表示される", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "GitHub Actions",
    );
  });

  test("目次が表示される", async ({ page }) => {
    await expect(page.locator("aside").getByText("目次")).toBeVisible();
  });

  test("目次リンクをクリックすると該当見出しにスクロールする", async ({
    page,
  }) => {
    const tocLink = page.getByRole("navigation").getByRole("link").first();
    const href = await tocLink.getAttribute("href");
    await tocLink.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
  });

  test("コンテンツが表示される", async ({ page }) => {
    await expect(page.getByRole("article")).toBeVisible();
  });
});
