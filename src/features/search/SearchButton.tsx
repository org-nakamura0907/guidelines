import { Search } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function SearchButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="検索を開く"
      className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-500 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
    >
      <Search size={14} />
      <span className="hidden sm:inline">検索</span>
      <kbd className="hidden rounded bg-gray-200 px-1 font-mono text-[10px] sm:inline dark:bg-gray-700">
        ⌘K
      </kbd>
    </button>
  );
}
