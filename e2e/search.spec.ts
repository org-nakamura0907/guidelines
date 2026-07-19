import { test, expect } from "@playwright/test";

test.describe("検索", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/guidelines/");
  });

  test("検索ボタンがヘッダーに表示される", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "検索を開く" }),
    ).toBeVisible();
  });

  test("検索ボタンをクリックするとモーダルが開く", async ({ page }) => {
    await page.getByRole("button", { name: "検索を開く" }).click();
    await expect(page.locator("#pagefind-search")).toBeVisible();
  });

  test("Ctrl+K でモーダルが開く", async ({ page }) => {
    await page.locator("body").click();
    await page.keyboard.press("Control+k");
    await expect(page.locator("#pagefind-search")).toBeVisible();
  });

  test("Escape でモーダルが閉じる", async ({ page }) => {
    await page.getByRole("button", { name: "検索を開く" }).click();
    await expect(page.locator("#pagefind-search")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#pagefind-search")).not.toBeVisible();
  });

  test("モーダル外クリックで閉じる", async ({ page }) => {
    await page.getByRole("button", { name: "検索を開く" }).click();
    await expect(page.locator("#pagefind-search")).toBeVisible();
    await page.mouse.click(10, 10);
    await expect(page.locator("#pagefind-search")).not.toBeVisible();
  });

  test("キーワードを入力すると検索結果が表示される", async ({ page }) => {
    await page.getByRole("button", { name: "検索を開く" }).click();
    const input = page.locator(".pagefind-ui__search-input");
    await input.waitFor();
    await input.fill("GitHub");
    await expect(page.locator(".pagefind-ui__result")).toBeVisible();
  });
});
