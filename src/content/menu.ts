import type { ImageMetadata } from 'astro';
import crispyChickenBowl from '@/assets/photos/menu/crispy-chicken-bowl.jpg';
import prosciuttoEgg from '@/assets/photos/menu/prosciutto-egg.jpg';
import frenchToast from '@/assets/photos/dessert-sorbet.jpg';

/**
 * Featured dishes for the `From the Kitchen` editorial panels (Movement 5).
 *
 * Three dishes only — chosen for full-bleed photo strength, not by category
 * coverage. The full menu is "call us" for v1.
 *
 * - `crispyChickenBowl` — verified by noupou.gr Jan 2026.
 * - `prosciuttoEgg` (Κουλούρι Θεσσαλονίκης) — verified by noupou.gr Jan 2026.
 * - `frenchToastPistachio` — TODO_CLIENT: image00027 (dessert-sorbet.jpg) shows
 *   a fried-bread dessert with raspberry sorbet + meringue crumble. The
 *   raspberry sorbet may correspond to the "forest-fruit sauce" in the
 *   verified `French toast με φιστίκι Αιγίνης` description, but the client
 *   must confirm before publication.
 */
export interface MenuFeature {
	slug: string;
	i18nKey: string;
	image: ImageMetadata;
}

export const menuFeature: MenuFeature[] = [
	{ slug: 'crispy-chicken-bowl', i18nKey: 'crispyChickenBowl', image: crispyChickenBowl },
	{ slug: 'prosciutto-egg', i18nKey: 'prosciuttoEgg', image: prosciuttoEgg },
	{ slug: 'french-toast-pistachio', i18nKey: 'frenchToastPistachio', image: frenchToast },
];
