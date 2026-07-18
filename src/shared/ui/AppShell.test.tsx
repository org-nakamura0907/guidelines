import { render, screen, fireEvent } from "@testing-library/react";
import AppShell from "./AppShell";
import type { NavSection } from "./AppShell";

const sections: NavSection[] = [
  {
    label: "CI/CD",
    pages: [
      {
        id: "ci-cd/github-actions",
        title: "GitHub Actions",
        href: "/guidelines/ci-cd/github-actions",
      },
    ],
  },
];

describe("AppShell", () => {
  it("初期状態でサイドバーが閉じている", () => {
    const { container } = render(
      <AppShell sections={sections} currentPath="/" />,
    );
    // Sidebar wrapper は最後の子要素
    expect(container.lastChild).toHaveClass("-translate-x-full");
  });

  it("初期状態でバックドロップを表示しない", () => {
    const { container } = render(
      <AppShell sections={sections} currentPath="/" />,
    );
    // バックドロップは isOpen=true のときのみ描画される
    expect(container.querySelector(".inset-0")).not.toBeInTheDocument();
  });

  it("ハンバーガーメニューをクリックするとサイドバーが開く", () => {
    const { container } = render(
      <AppShell sections={sections} currentPath="/" />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "メニューを開く/閉じる" }),
    );
    expect(container.lastChild).toHaveClass("translate-x-0");
  });

  it("ハンバーガーメニューをクリックするとバックドロップを表示する", () => {
    const { container } = render(
      <AppShell sections={sections} currentPath="/" />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "メニューを開く/閉じる" }),
    );
    expect(container.querySelector(".inset-0")).toBeInTheDocument();
  });

  it("バックドロップをクリックするとサイドバーが閉じる", () => {
    const { container } = render(
      <AppShell sections={sections} currentPath="/" />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "メニューを開く/閉じる" }),
    );
    fireEvent.click(container.querySelector(".inset-0")!);
    expect(container.lastChild).toHaveClass("-translate-x-full");
  });
});
