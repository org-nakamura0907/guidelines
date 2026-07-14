import { describe, expect, it } from "vitest";
import { withBasePath } from "./path";

describe("withBasePath", () => {
  it("先頭スラッシュありのパスを結合する", () => {
    expect(withBasePath("/docs")).toBe("/guidelines/docs");
  });

  it("先頭スラッシュなしのパスを結合する", () => {
    expect(withBasePath("docs")).toBe("/guidelines/docs");
  });

  it("ルートパスを結合する", () => {
    expect(withBasePath("/")).toBe("/guidelines/");
  });
});
