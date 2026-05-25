import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface LayerImage {
	src: string;
	srcSet: string;
	sizes: string;
	width: number;
	height: number;
	alt: string;
}

interface CrossfadeOnScrollProps {
	exterior: LayerImage;
	interior: LayerImage;
	caption: string;
}

/**
 * Through the Door — the one major scroll-driven moment in the v1 build.
 * Two stacked photos crossfade as the user scrolls through the section. A
 * caption appears mid-transition. Pin behavior is desktop-only (CSS sticky
 * on a child + tall parent). Honors reduced-motion by stacking statically.
 */
export function CrossfadeOnScroll({ exterior, interior, caption }: CrossfadeOnScrollProps) {
	const ref = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});

	const exteriorOpacity = useTransform(scrollYProgress, [0.25, 0.55], [1, 0]);
	const interiorOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
	const captionOpacity = useTransform(scrollYProgress, [0.32, 0.5, 0.68], [0, 1, 0]);
	const interiorScale = useTransform(scrollYProgress, [0.4, 0.7], [1.08, 1]);
	const exteriorScale = useTransform(scrollYProgress, [0.25, 0.55], [1, 0.96]);

	if (reduce) {
		return (
			<div ref={ref} className="bg-bistro-ink">
				<figure className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[16/8]">
					<img
						src={exterior.src}
						srcSet={exterior.srcSet}
						sizes={exterior.sizes}
						width={exterior.width}
						height={exterior.height}
						alt={exterior.alt}
						loading="eager"
						decoding="async"
						className="h-full w-full object-cover"
					/>
				</figure>
				<div className="px-5 py-16 text-center md:px-8 md:py-24">
					<p className="font-heading mx-auto max-w-3xl text-balance text-3xl leading-tight text-bistro-cream md:text-5xl">
						{caption}
					</p>
				</div>
				<figure className="relative aspect-[3/4] w-full overflow-hidden md:aspect-[16/9]">
					<img
						src={interior.src}
						srcSet={interior.srcSet}
						sizes={interior.sizes}
						width={interior.width}
						height={interior.height}
						alt={interior.alt}
						loading="lazy"
						decoding="async"
						className="h-full w-full object-cover"
					/>
				</figure>
			</div>
		);
	}

	return (
		<div ref={ref} className="relative w-full bg-bistro-ink" style={{ height: '200svh' }}>
			<div className="sticky top-0 h-svh w-full overflow-hidden">
				<motion.img
					src={exterior.src}
					srcSet={exterior.srcSet}
					sizes={exterior.sizes}
					width={exterior.width}
					height={exterior.height}
					alt={exterior.alt}
					loading="eager"
					decoding="async"
					className="absolute inset-0 h-full w-full object-cover"
					style={{ opacity: exteriorOpacity, scale: exteriorScale }}
				/>
				<motion.img
					src={interior.src}
					srcSet={interior.srcSet}
					sizes={interior.sizes}
					width={interior.width}
					height={interior.height}
					alt={interior.alt}
					loading="lazy"
					decoding="async"
					className="absolute inset-0 h-full w-full object-cover"
					style={{ opacity: interiorOpacity, scale: interiorScale }}
				/>
				<div className="pointer-events-none absolute inset-0 bg-bistro-ink/15" aria-hidden="true" />
				<motion.div
					className="pointer-events-none absolute inset-x-0 bottom-[14%] flex items-center justify-center px-5 md:px-8"
					style={{ opacity: captionOpacity }}
				>
					<p className="font-heading mx-auto max-w-3xl text-balance text-center text-3xl leading-tight text-bistro-cream md:text-5xl lg:text-6xl">
						{caption}
					</p>
				</motion.div>
			</div>
		</div>
	);
}
