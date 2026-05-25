import { useEffect } from 'react';

type Slot = 'morning' | 'midday' | 'evening';

function currentSlot(hour: number): Slot {
	if (hour >= 4 && hour < 12) return 'morning';
	if (hour >= 12 && hour < 18) return 'midday';
	return 'evening';
}

/**
 * Slow Hours — optional time-based highlight.
 *
 * Renders nothing. On client mount, finds the three `[data-slow-hours-slot]`
 * elements (rendered by SlowHours.astro) and sets `data-active="true"` on the
 * one matching the current local hour. CSS in motion.css styles the active vs
 * inactive states (active = full color + copper underline on label; inactive =
 * opacity-65, no underline).
 *
 * If JS never runs (no hydration, no JS at all): all three frames stay
 * equal-weight. The section still reads as a deliberate editorial triptych.
 * That graceful degradation is the whole point — the time highlight is a
 * grace note, not the concept.
 *
 * Honors prefers-reduced-motion by skipping the activation entirely so
 * nothing changes after page paint.
 */
export function SlowHoursActive() {
	useEffect(() => {
		const reduce =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return;

		const slot = currentSlot(new Date().getHours());
		const frames = document.querySelectorAll<HTMLElement>('[data-slow-hours-slot]');
		frames.forEach((f) => {
			f.dataset.active = f.dataset.slowHoursSlot === slot ? 'true' : 'false';
		});
	}, []);

	return null;
}
