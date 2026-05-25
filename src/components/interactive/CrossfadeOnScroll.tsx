import { useEffect, useRef, useState } from 'react';
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
 * Through the Door — the one major scroll-driven moment in the build.
 *
 * Pin + crossfade fire ONLY on desktop with a fine pointer at ≥ 768 px.
 * Touch/mobile/coarse-pointer + reduced-motion both get the stacked layout:
 * exterior photo → caption block → interior photo, in normal document flow,
 * no scroll pinning, no opacity choreography.
 *
 * SSR renders the stacked layout (safe default for crawlers + no-JS); after
 * hydration on a qualifying viewport, the cinematic pin takes over.
 */
export function CrossfadeOnScroll({ exterior, interior, caption }: CrossfadeOnScrollProps) {
	const ref = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const [cinematic, setCinematic] = useState(false);

	useEffect(() => {
		if (reduce) {
			setCinematic(false);
			return;
		}
		const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)');
		const update = () => setCinematic(mq.matches);
		update();
		mq.addEventListener('change', update);
		return () => mq.removeEventListener('change', update);
	}, [reduce]);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});

	const exteriorOpacity = useTransform(scrollYProgress, [0.25, 0.55], [1, 0]);
	const interiorOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
	const captionOpacity = useTransform(scrollYProgress, [0.32, 0.5, 0.68], [0, 1, 0]);
	const interiorScale = useTransform(scrollYProgress, [0.4, 0.7], [1.08, 1]);
	const exteriorScale = useTransform(scrollYProgress, [0.25, 0.55], [1, 0.96]);

	if (reduce || !cinematic) {
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
