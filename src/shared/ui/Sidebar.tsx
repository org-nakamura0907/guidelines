import { useState } from "react";

type NavItem = {
	id: string;
	title: string;
	href: string;
};

type NavSection = {
	label: string;
	pages: NavItem[];
};

type Props = {
	sections: NavSection[];
	currentPath: string;
};

export default function Sidebar({ sections, currentPath }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	function isActive(href: string) {
		return currentPath === href || currentPath === `${href}/`;
	}

	return (
		<>
			<header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center border-b border-gray-200 bg-white px-4 md:hidden">
				<button onClick={() => setIsOpen((prev) => !prev)} aria-label="メニューを開く/閉じる">
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
			</header>

			{isOpen && (
				<div
					className="fixed inset-0 z-20 bg-black/40 md:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			<div
				className={`fixed bottom-0 left-0 top-14 z-30 transition-transform duration-300 md:top-0 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
			>
				<nav className="h-full w-64 overflow-y-auto border-r border-gray-200 bg-white px-4 py-6">
					{sections.map((section) => (
						<div key={section.label} className="mb-6">
							<p className="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
								{section.label}
							</p>
							<ul className="space-y-1">
								{section.pages.map((page) => (
									<li key={page.id}>
										<a
											href={page.href}
											className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
												isActive(page.href)
													? "bg-gray-100 font-medium text-gray-900"
													: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
											}`}
										>
											{page.title}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>
			</div>
		</>
	);
}
