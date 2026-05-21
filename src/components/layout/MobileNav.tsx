import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';

interface MobileNavProps {
	openLabel: string;
	closeLabel: string;
	navLabel: string;
	links: { href: string; label: string }[];
	ctaLabel: string;
	ctaHref: string;
	secondaryLabel: string;
	secondaryHref: string;
}

export function MobileNav({
	openLabel,
	closeLabel,
	navLabel,
	links,
	ctaLabel,
	ctaHref,
	secondaryLabel,
	secondaryHref,
}: MobileNavProps) {
	const [open, setOpen] = useState(false);
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger
				aria-label={open ? closeLabel : openLabel}
				className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--header-fg-strong)] transition-colors duration-300 hover:bg-[var(--header-fg-hover-bg)] md:hidden"
			>
				{open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
			</SheetTrigger>
			<SheetContent side="right" className="w-[88%] max-w-sm bg-background border-l border-foreground/10">
				<SheetTitle className="sr-only">{navLabel}</SheetTitle>
				<SheetDescription className="sr-only">{navLabel}</SheetDescription>
				<nav className="flex h-full flex-col gap-8 px-6 pt-12 pb-8" aria-label={navLabel}>
					<ul className="flex flex-col gap-5">
						{links.map((l) => (
							<li key={l.href}>
								<a
									href={l.href}
									onClick={() => setOpen(false)}
									className="font-heading text-3xl text-foreground transition-colors hover:text-primary"
								>
									{l.label}
								</a>
							</li>
						))}
					</ul>
					<div className="mt-auto flex flex-col gap-3">
						<a
							href={ctaHref}
							className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-[color-mix(in_oklch,var(--primary)_88%,black)]"
						>
							{ctaLabel}
						</a>
						<a
							href={secondaryHref}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex h-12 items-center justify-center rounded-md border border-foreground/15 px-6 text-sm font-semibold tracking-wide text-foreground transition-colors hover:border-foreground/40"
						>
							{secondaryLabel}
						</a>
					</div>
				</nav>
			</SheetContent>
		</Sheet>
	);
}
