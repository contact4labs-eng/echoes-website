import type { ImageMetadata } from 'astro';
import crispyChickenBowl from '@/assets/photos/menu/crispy-chicken-bowl.jpg';
import prosciuttoEgg from '@/assets/photos/menu/prosciutto-egg.jpg';
import scrambleChorizo from '@/assets/photos/menu/scramble-chorizo.jpg';
import eggsToast from '@/assets/photos/menu/eggs-toast.jpg';
import milkshake from '@/assets/photos/menu/milkshake.jpg';

export interface MenuHighlight {
	slug: string;
	i18nKey: string;
	image: ImageMetadata;
}

/** Featured items on the home page. The full menu is "call us" for v1. */
export const menuHighlights: MenuHighlight[] = [
	{ slug: 'crispy-chicken-bowl', i18nKey: 'crispyChickenBowl', image: crispyChickenBowl },
	{ slug: 'prosciutto-egg', i18nKey: 'prosciuttoEgg', image: prosciuttoEgg },
	{ slug: 'scramble-chorizo', i18nKey: 'scrambleChorizo', image: scrambleChorizo },
	{ slug: 'eggs-toast', i18nKey: 'eggsToast', image: eggsToast },
	{ slug: 'milkshake', i18nKey: 'milkshake', image: milkshake },
];
