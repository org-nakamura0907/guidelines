import { SITE_TITLE } from "@/shared/config";
import { withBasePath } from "@/shared/lib";
import ThemeToggle from "./ThemeToggle";

type Props = {
	onMenuToggle: () => void;
};

export default function Header({ onMenuToggle }: Props) {
	return (
		<header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950 md:px-6">
			<button
				onClick={onMenuToggle}
				aria-label="メニューを開く/閉じる"
				className="md:hidden"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
			<a href={withBasePath("/")} className="text-sm font-semibold text-gray-900 dark:text-gray-100">
				{SITE_TITLE}
			</a>
			<div className="ml-auto">
				<ThemeToggle />
			</div>
		</header>
	);
}
