import { useEffect, useRef, useState } from "react";

type Heading = { depth: number; slug: string; text: string };

type Props = {
	headings: Heading[];
	className?: string;
};

export default function TableOfContents({ headings, className = "" }: Props) {
	const filtered = headings.filter((h) => h.depth === 2 || h.depth === 3);
	const [activeId, setActiveId] = useState<string>("");
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		if (filtered.length === 0) return;

		const headingEls = filtered
			.map((h) => document.getElementById(h.slug))
			.filter(Boolean) as HTMLElement[];

		observerRef.current = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible.length > 0) {
					setActiveId(visible[0].target.id);
				}
			},
			{ rootMargin: "0px 0px -60% 0px", threshold: 0 },
		);

		headingEls.forEach((el) => observerRef.current!.observe(el));
		return () => observerRef.current?.disconnect();
	}, [filtered.map((h) => h.slug).join(",")]);

	if (filtered.length === 0) return null;

	return (
		<nav className={className}>
			<p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
				目次
			</p>
			<ul className="space-y-1">
				{filtered.map((h) => (
					<li key={h.slug} className={h.depth === 3 ? "pl-3" : ""}>
						<a
							href={`#${h.slug}`}
							className={`block text-sm transition-colors ${
								activeId === h.slug
									? "font-medium text-foreground"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							{h.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
