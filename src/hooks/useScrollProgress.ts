import { useRef, type RefObject } from 'react';
import { useScroll, useReducedMotion, type MotionValue } from 'motion/react';

/**
 * useScrollProgress
 * ------------------
 * Thin wrapper around `motion`'s `useScroll` that returns a target ref,
 * a scroll-progress MotionValue (0 → 1 as the target scrolls through the
 * viewport), and a reduced-motion flag the caller checks to short-circuit.
 *
 * The caller is responsible for the reduced-motion branch:
 *
 *   const { ref, progress, reduce } = useScrollProgress<HTMLDivElement>();
 *   if (reduce) return <StaticVersion />;
 *   const opacity = useTransform(progress, [0, 1], [0, 1]);
 *
 * Defaults to `offset: ['start end', 'end start']` — progress runs from 0 when
 * the top of the target hits the bottom of the viewport, to 1 when the bottom
 * of the target leaves the top of the viewport.
 *
 * Reads from window scroll (which Lenis updates in dev/prod), so it works
 * transparently with the project's smooth-scroll setup.
 */
export function useScrollProgress<T extends HTMLElement>(
	offset: ['start end', 'end start'] | string[] = ['start end', 'end start'],
): {
	ref: RefObject<T | null>;
	progress: MotionValue<number>;
	reduce: boolean | null;
} {
	const ref = useRef<T>(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref as RefObject<HTMLElement>,
		offset: offset as ['start end', 'end start'],
	});
	return { ref, progress: scrollYProgress, reduce };
}
