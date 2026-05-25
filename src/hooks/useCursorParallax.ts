import { useEffect, useRef, type RefObject } from 'react';
import { useMotionValue, useReducedMotion, type MotionValue } from 'motion/react';

interface CursorParallaxResult<T extends HTMLElement> {
	ref: RefObject<T | null>;
	x: MotionValue<number>;
	y: MotionValue<number>;
	reduce: boolean | null;
}

/**
 * useCursorParallax
 * -----------------
 * Returns `x` / `y` MotionValues that track the cursor's offset from the
 * target element's center, scaled by `intensity` (in px) and capped at
 * `±intensity` per axis.
 *
 * Honors `prefers-reduced-motion`: when reduced, the listener never attaches
 * and both motion values stay at 0.
 *
 * Caller:
 *   const { ref, x, y } = useCursorParallax<HTMLDivElement>(8);
 *   <motion.div ref={ref} style={{ x, y }} />
 *
 * Uses `pointermove` on `window` so movement is tracked even when the cursor
 * leaves the element bounds (subtle parallax doesn't snap back abruptly).
 * `pointerleave` on the element resets to center over 0ms — motion's own
 * `useTransform` or `useSpring` can smooth the return if desired.
 */
export function useCursorParallax<T extends HTMLElement>(
	intensity = 8,
): CursorParallaxResult<T> {
	const ref = useRef<T>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const reduce = useReducedMotion();

	useEffect(() => {
		if (reduce) return;
		const el = ref.current;
		if (!el) return;

		let raf = 0;
		const onMove = (e: PointerEvent) => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const rect = el.getBoundingClientRect();
				const cx = (e.clientX - rect.left) / rect.width - 0.5;
				const cy = (e.clientY - rect.top) / rect.height - 0.5;
				// Negate so the photo drifts toward the cursor, not away.
				x.set(Math.max(-intensity, Math.min(intensity, -cx * intensity * 2)));
				y.set(Math.max(-intensity, Math.min(intensity, -cy * intensity * 2)));
			});
		};
		const onLeave = () => {
			cancelAnimationFrame(raf);
			x.set(0);
			y.set(0);
		};

		window.addEventListener('pointermove', onMove, { passive: true });
		el.addEventListener('pointerleave', onLeave);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('pointermove', onMove);
			el.removeEventListener('pointerleave', onLeave);
		};
	}, [intensity, reduce, x, y]);

	return { ref, x, y, reduce };
}
