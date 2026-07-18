import { render, screen } from "@testing-library/react";
import TableOfContents from "./TableOfContents";

describe("TableOfContents", () => {
  describe("見出しフィルタリング", () => {
    it("見出しが空のとき何も描画しない", () => {
      const { container } = render(<TableOfContents headings={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it("h1 のみのとき何も描画しない", () => {
      const { container } = render(
        <TableOfContents
          headings={[{ depth: 1, slug: "title", text: "タイトル" }]}
        />,
      );
      expect(container.firstChild).toBeNull();
    });

    it("h4 以上のみのとき何も描画しない", () => {
      const { container } = render(
        <TableOfContents
          headings={[{ depth: 4, slug: "deep", text: "深い見出し" }]}
        />,
      );
      expect(container.firstChild).toBeNull();
    });

    it("h2 の見出しを表示する", () => {
      render(
        <TableOfContents
          headings={[{ depth: 2, slug: "section", text: "セクション" }]}
        />,
      );
      expect(screen.getByText("セクション")).toBeInTheDocument();
    });

    it("h3 の見出しを表示する", () => {
      render(
        <TableOfContents
          headings={[{ depth: 3, slug: "subsection", text: "サブセクション" }]}
        />,
      );
      expect(screen.getByText("サブセクション")).toBeInTheDocument();
    });

    it("h1 と h4 を除外して h2・h3 のみ表示する", () => {
      render(
        <TableOfContents
          headings={[
            { depth: 1, slug: "h1", text: "H1見出し" },
            { depth: 2, slug: "h2", text: "H2見出し" },
            { depth: 3, slug: "h3", text: "H3見出し" },
            { depth: 4, slug: "h4", text: "H4見出し" },
          ]}
        />,
      );
      expect(screen.queryByText("H1見出し")).not.toBeInTheDocument();
      expect(screen.getByText("H2見出し")).toBeInTheDocument();
      expect(screen.getByText("H3見出し")).toBeInTheDocument();
      expect(screen.queryByText("H4見出し")).not.toBeInTheDocument();
    });
  });

  describe("インデント", () => {
    it("h3 のリンクに pl-3 クラスを適用する", () => {
      render(
        <TableOfContents
          headings={[{ depth: 3, slug: "subsection", text: "サブセクション" }]}
        />,
      );
      const listItem = screen.getByText("サブセクション").closest("li");
      expect(listItem).toHaveClass("pl-3");
    });

    it("h2 のリンクに pl-3 クラスを適用しない", () => {
      render(
        <TableOfContents
          headings={[{ depth: 2, slug: "section", text: "セクション" }]}
        />,
      );
      const listItem = screen.getByText("セクション").closest("li");
      expect(listItem).not.toHaveClass("pl-3");
    });
  });

  it("各見出しへのアンカーリンクを生成する", () => {
    render(
      <TableOfContents
        headings={[{ depth: 2, slug: "section", text: "セクション" }]}
      />,
    );
    expect(screen.getByRole("link", { name: "セクション" })).toHaveAttribute(
      "href",
      "#section",
    );
  });
});
