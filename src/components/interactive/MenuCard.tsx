import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface MenuCardProps {
	className?: string;
	children: ReactNode;
}

/**
 * Tasteful hover/tap interaction for a single menu card.
 * - Spring physics, not bouncy.
 * - Honors prefers-reduced-motion: renders a static <article> with no transform.
 */
export function MenuCard({ className, children }: MenuCardProps) {
	const reduce = useReducedMotion();

	if (reduce) {
		return <article className={className}>{children}</article>;
	}

	return (
		<motion.article
			className={className}
			whileHover={{ y: -8, scale: 1.015 }}
			whileTap={{ scale: 0.99 }}
			transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.6 }}
		>
			{children}
		</motion.article>
	);
}
