import type { ImageMetadata } from 'astro';
import crispyChickenBowl from '@/assets/photos/menu/crispy-chicken-bowl.jpg';
import prosciuttoEgg from '@/assets/photos/menu/prosciutto-egg.jpg';

/**
 * Featured dishes for the `From the Kitchen` editorial panels (Movement 5).
 *
 * TWO dishes only (R3.1) — both verified by noupou.gr Jan 2026. Each gets a
 * distinct visual treatment in FromTheKitchen.astro, not an alternating two-
 * column rhythm.
 *
 * - `crispyChickenBowl` — verified.
 * - `prosciuttoEgg` (Κουλούρι Θεσσαλονίκης) — verified.
 *
 * `dessert-sorbet.jpg` (image00027) is NOT used here in R3.1 — its dish
 * identity is still TODO_CLIENT. It lives on in The Pass and End Card where
 * the photo speaks atmospherically without needing a verified dish name.
 */
export interface MenuFeature {
	slug: string;
	i18nKey: string;
	image: ImageMetadata;
}

export const menuFeature: MenuFeature[] = [
	{ slug: 'crispy-chicken-bowl', i18nKey: 'crispyChickenBowl', image: crispyChickenBowl },
	{ slug: 'prosciutto-egg', i18nKey: 'prosciuttoEgg', image: prosciuttoEgg },
];
