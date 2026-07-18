import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
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

describe("Sidebar", () => {
  describe("アクティブ判定", () => {
    it("現在のパスと一致するリンクをアクティブ表示する", () => {
      render(
        <Sidebar
          sections={sections}
          currentPath="/guidelines/ci-cd/github-actions"
          isOpen={false}
        />,
      );
      expect(screen.getByRole("link", { name: "GitHub Actions" })).toHaveClass(
        "bg-accent",
      );
    });

    it("末尾スラッシュありのパスと一致するリンクをアクティブ表示する", () => {
      render(
        <Sidebar
          sections={sections}
          currentPath="/guidelines/ci-cd/github-actions/"
          isOpen={false}
        />,
      );
      expect(screen.getByRole("link", { name: "GitHub Actions" })).toHaveClass(
        "bg-accent",
      );
    });

    it("異なるパスのリンクを非アクティブ表示する", () => {
      render(
        <Sidebar
          sections={sections}
          currentPath="/guidelines/"
          isOpen={false}
        />,
      );
      expect(
        screen.getByRole("link", { name: "GitHub Actions" }),
      ).not.toHaveClass("bg-accent");
    });
  });

  describe("開閉状態", () => {
    it("isOpen=true のとき表示クラスを持つ", () => {
      const { container } = render(
        <Sidebar sections={sections} currentPath="/" isOpen={true} />,
      );
      expect(container.firstChild).toHaveClass("translate-x-0");
    });

    it("isOpen=false のとき非表示クラスを持つ", () => {
      const { container } = render(
        <Sidebar sections={sections} currentPath="/" isOpen={false} />,
      );
      expect(container.firstChild).toHaveClass("-translate-x-full");
    });
  });

  it("セクションラベルとページタイトルを表示する", () => {
    render(<Sidebar sections={sections} currentPath="/" isOpen={false} />);
    expect(screen.getByText("CI/CD")).toBeInTheDocument();
    expect(screen.getByText("GitHub Actions")).toBeInTheDocument();
  });
});
