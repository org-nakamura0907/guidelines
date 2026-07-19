import { useEffect, useRef } from "react";
import { withBasePath } from "@/shared/lib";

type Props = {
  onClose: () => void;
};

export default function SearchModal({ onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.getElementById("pagefind-search");
    if (!el) return;

    // PagefindUI を動的ロード (ビルド後に生成されるファイルのため vite-ignore)
    import(/* @vite-ignore */ withBasePath("/pagefind/pagefind-ui.js")).then(
      () => {
        // @ts-expect-error -- pagefind は型定義を持たない
        new window.PagefindUI({
          element: "#pagefind-search",
          showSubResults: true,
          showImages: false,
          bundlePath: withBasePath("/pagefind/"),
          baseUrl: withBasePath("/"),
          translations: {
            placeholder: "検索...",
            zero_results: "[SEARCH_TERM] の検索結果はありません",
          },
        });
        const input = el.querySelector("input");
        input?.focus();
      },
    );
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[15vh]"
      onClick={handleOverlayClick}
    >
      <div className="border-border bg-background w-full max-w-xl rounded-xl border shadow-2xl">
        <div id="pagefind-search" className="p-2" />
      </div>
    </div>
  );
}
