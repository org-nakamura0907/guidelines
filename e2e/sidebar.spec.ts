import { test, expect } from "@playwright/test";

test.describe("サイドバーナビゲーション", () => {
  test("サイドバーのリンクをクリックするとページに遷移する", async ({
    page,
  }) => {
    await page.goto("/guidelines/");
    await page.getByRole("link", { name: "GitHub Actions" }).first().click();
    await expect(page).toHaveURL(/ci-cd\/github-actions/);
  });

  test("現在のページのリンクがアクティブ表示になる", async ({ page }) => {
    await page.goto("/guidelines/ci-cd/github-actions");
    const activeLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "GitHub Actions" });
    await expect(activeLink).toHaveClass(/bg-accent/);
  });
});

test.describe("サイドバー開閉（モバイル）", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("初期状態でサイドバーが閉じている", async ({ page }) => {
    await page.goto("/guidelines/");
    const nav = page.getByRole("navigation").filter({ hasText: "CI/CD" });
    await expect(nav).not.toBeInViewport();
  });

  test("ハンバーガーメニューをクリックするとサイドバーが開く", async ({
    page,
  }) => {
    await page.goto("/guidelines/");
    await page
      .getByRole("button", { name: "メニューを開く/閉じる" })
      .click();
    const nav = page.getByRole("navigation").filter({ hasText: "CI/CD" });
    await expect(nav).toBeInViewport();
  });
});
