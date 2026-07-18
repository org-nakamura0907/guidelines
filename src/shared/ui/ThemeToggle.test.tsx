import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("トリガーボタンを表示する", () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: "テーマを切り替える" }),
    ).toBeInTheDocument();
  });

  it("ドロップダウンを開くとテーマ選択肢が表示される", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "テーマを切り替える" }));
    expect(screen.getByText("ライト")).toBeInTheDocument();
    expect(screen.getByText("ダーク")).toBeInTheDocument();
    expect(screen.getByText("システム")).toBeInTheDocument();
  });

  it("'ダーク' を選択すると localStorage に保存し dark クラスを適用する", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "テーマを切り替える" }));
    fireEvent.click(screen.getByText("ダーク"));
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement).toHaveClass("dark");
  });

  it("'ライト' を選択すると localStorage に保存し dark クラスを除去する", () => {
    document.documentElement.classList.add("dark");
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "テーマを切り替える" }));
    fireEvent.click(screen.getByText("ライト"));
    expect(localStorage.getItem("theme")).toBe("light");
    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("'システム' を選択すると localStorage に保存する", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "テーマを切り替える" }));
    fireEvent.click(screen.getByText("システム"));
    expect(localStorage.getItem("theme")).toBe("system");
  });
});
