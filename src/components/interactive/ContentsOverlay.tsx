/**
 * R4 ContentsOverlay — React island.
 *
 * Listens for clicks on any element with [data-contents-trigger] anywhere
 * on the page (typically the [ περιεχόμενα ] / [ contents ] buttons on
 * the cover colophon and on each spread's run-on). Renders a full-bleed
 * cream modal that mirrors the approved proof at
 * proofs/r4-magazine-cover/nav.html.
 *
 * Behavior:
 * - Open: focus the close button, lock body scroll, remember the trigger.
 * - Close: restore body scroll, return focus to the trigger that opened it.
 * - Esc closes.
 * - Click on a TOC title closes the overlay (and lets the link navigate).
 * - Stays in normal DOM (no portal) — fixed positioning handles layering.
 *
 * Not used for Phase 1: filter/search, multi-page nav, animations.
 */
import { useEffect, useRef, useState } from 'react';
import '@/styles/contents.css';

/**
 * The page runs Lenis smooth-scroll (instantiated in Layout.astro on
 * non-touch / non-reduced-motion clients, and exposed there as
 * `window.lenis`). When Lenis is active it cancels native
 * `scrollIntoView({ behavior: 'smooth' })`, so TOC navigation must route
 * through Lenis's own `scrollTo`. We read it through a minimal local type
 * (a local cast, NOT a global Window augmentation — the lenis package
 * already declares `Window.lenis`, so augmenting it conflicts).
 */
type LenisLike = {
	scrollTo?: (
		target: Element | string | number,
		options?: { offset?: number; immediate?: boolean; duration?: number }
	) => void;
};

/**
 * Standard focusable-element selector. Excludes elements with tabindex="-1".
 * Used by the focus trap to find the first/last focusable child of the overlay.
 */
const FOCUSABLE_SELECTOR =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface Entry {
	page: string;
	title: string;
	blurb: string;
	href: string;
}

interface Props {
	eyebrow: string;
	title: string;
	closeLabel: string;
	entries: Entry[];
	footerLeft: string;
	footerPhone: string;
	footerPhoneHref: string;
}

export function ContentsOverlay({
	eyebrow,
	title,
	closeLabel,
	entries,
	footerLeft,
	footerPhone,
	footerPhoneHref,
}: Props) {
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLElement | null>(null);
	const closeBtnRef = useRef<HTMLButtonElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	// Attach a document-level click delegate for [data-contents-trigger].
	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement | null;
			if (!target) return;
			const trigger = target.closest('[data-contents-trigger]') as HTMLElement | null;
			if (!trigger) return;
			e.preventDefault();
			triggerRef.current = trigger;
			setOpen(true);
		};
		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	}, []);

	// Open-state effect: keydown handling (Esc + Tab focus trap), body
	// scroll lock, focus on the close button, focus restoration on close.
	useEffect(() => {
		if (!open) return;

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpen(false);
				return;
			}
			if (e.key !== 'Tab') return;

			// Focus trap: cycle Tab / Shift+Tab inside the overlay.
			const root = overlayRef.current;
			if (!root) return;
			const focusables = Array.from(
				root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
			).filter(
				(el) => !el.hasAttribute('aria-hidden') && el.offsetParent !== null
			);
			if (focusables.length === 0) {
				e.preventDefault();
				return;
			}
			const first = focusables[0];
			const last = focusables[focusables.length - 1];
			const active = document.activeElement as HTMLElement | null;
			const activeIsInside = !!active && root.contains(active);

			if (e.shiftKey) {
				if (!activeIsInside || active === first) {
					e.preventDefault();
					last.focus();
				}
			} else {
				if (!activeIsInside || active === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};
		document.addEventListener('keydown', onKey);

		const html = document.documentElement;
		const prevOverflow = html.style.overflow;
		html.style.overflow = 'hidden';

		// Focus the close button after the modal mounts.
		const id = window.setTimeout(() => closeBtnRef.current?.focus(), 0);

		return () => {
			document.removeEventListener('keydown', onKey);
			html.style.overflow = prevOverflow;
			window.clearTimeout(id);
			// Restore focus to the element that opened the overlay.
			triggerRef.current?.focus();
		};
	}, [open]);

	if (!open) return null;

	return (
		<div
			ref={overlayRef}
			className="contents-overlay"
			role="dialog"
			aria-modal="true"
			aria-label={title}
		>
			<header className="overlay-header">
				<p className="overlay-eyebrow">{eyebrow}</p>
				<p className="overlay-title">{title}</p>
				<button
					ref={closeBtnRef}
					type="button"
					className="overlay-close"
					aria-label={closeLabel}
					onClick={() => setOpen(false)}
				>
					<span aria-hidden="true">×</span>
				</button>
			</header>

			<ol className="toc">
				{entries.map((entry, i) => (
					<li className="toc-entry" key={`${entry.page}-${i}`}>
						<span className="toc-page">{entry.page}</span>
						<a
							className="toc-title"
							href={entry.href}
							onClick={(e) => {
								// Close the overlay first so the body scroll lock is
								// released BEFORE we navigate; then scroll to the
								// anchor on the next tick. Without this, scroll-to-
								// anchor races with the overflow:hidden cleanup.
								e.preventDefault();
								const href = entry.href;
								setOpen(false);
								window.setTimeout(() => {
									if (!href.startsWith('#')) {
										window.location.href = href;
										return;
									}
									const target = document.querySelector(href);
									if (!target) return;
									const reduce = window.matchMedia(
										'(prefers-reduced-motion: reduce)'
									).matches;
									const lenis = (window as unknown as { lenis?: LenisLike }).lenis;
									// Preferred path: Lenis owns the scroll on this client,
									// so native smooth scrollIntoView would be cancelled.
									// Route through Lenis when present (and motion allowed).
									if (!reduce && lenis && typeof lenis.scrollTo === 'function') {
										try {
											lenis.scrollTo(target, { offset: 0 });
											return;
										} catch {
											// Lenis failed — instant native scroll still works
											// even while Lenis is running.
											target.scrollIntoView({ behavior: 'auto', block: 'start' });
											return;
										}
									}
									// No Lenis (touch / reduced-motion): native scroll.
									// reduced-motion → instant; otherwise smooth.
									target.scrollIntoView({
										behavior: reduce ? 'auto' : 'smooth',
										block: 'start',
									});
								}, 0);
							}}
						>
							{entry.title}
						</a>
						<span className="toc-blurb">{entry.blurb}</span>
					</li>
				))}
			</ol>

			<footer className="overlay-foot">
				<p className="foot-left">{footerLeft}</p>
				<p className="foot-right">
					<a href={footerPhoneHref}>{footerPhone}</a>
				</p>
			</footer>
		</div>
	);
}

export default ContentsOverlay;
