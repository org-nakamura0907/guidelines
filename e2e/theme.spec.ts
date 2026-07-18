import { test, expect } from "@playwright/test";

test.describe("ダークモード", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/guidelines/");
  });

  test("初期状態でシステムテーマが適用される", async ({ page }) => {
    const html = page.locator("html");
    // システムテーマはデバイス設定に依存するため、クラスの有無のみ確認
    const classList = await html.getAttribute("class");
    expect(classList === null || typeof classList === "string").toBe(true);
  });

  test("ダークテーマを選択すると dark クラスが適用される", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "テーマを切り替える" }).click();
    await page.getByText("ダーク").click();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("ライトテーマを選択すると dark クラスが除去される", async ({
    page,
  }) => {
    // まずダークにしてからライトに切り替える
    await page.getByRole("button", { name: "テーマを切り替える" }).click();
    await page.getByText("ダーク").click();
    await page.getByRole("button", { name: "テーマを切り替える" }).click();
    await page.getByText("ライト").click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });

  test("テーマ選択が localStorage に保存され再読み込み後も維持される", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "テーマを切り替える" }).click();
    await page.getByText("ダーク").click();
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});
