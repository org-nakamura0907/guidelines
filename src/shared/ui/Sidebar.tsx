import type { NavSection } from "./AppShell";

type Props = {
	sections: NavSection[];
	currentPath: string;
	isOpen: boolean;
};

export default function Sidebar({ sections, currentPath, isOpen }: Props) {
	function isActive(href: string) {
		return currentPath === href || currentPath === `${href}/`;
	}

	return (
		<div
			className={`fixed bottom-0 left-0 top-14 z-30 transition-transform duration-300 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
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
	);
}
