import el from './el.json';
import en from './en.json';

export type Locale = 'el' | 'en';
export const defaultLocale: Locale = 'el';
export const locales: Locale[] = ['el', 'en'];

const dicts = { el, en } as const;

export function getLang(url: URL | { pathname: string }): Locale {
	return url.pathname.startsWith('/en') ? 'en' : 'el';
}

export function useTranslations(lang: Locale) {
	return (key: string): string => {
		const value = key
			.split('.')
			.reduce<unknown>((acc, k) => (acc as Record<string, unknown> | undefined)?.[k], dicts[lang]);
		return typeof value === 'string' ? value : key;
	};
}

export function getLocalePath(path: string, lang: Locale): string {
	const clean = path === '/' ? '' : path.replace(/^\/en/, '');
	if (lang === 'el') return clean || '/';
	return `/en${clean || '/'}`;
}

export function stripLocale(pathname: string): string {
	return pathname.replace(/^\/en/, '') || '/';
}

export function getAlternates(currentPath: string, siteUrl: string) {
	const canonical = stripLocale(currentPath);
	return locales.map((loc) => ({
		locale: loc,
		hreflang: loc === 'el' ? 'el-GR' : 'en-US',
		href: `${siteUrl}${getLocalePath(canonical, loc)}`,
	}));
}

export function getOgLocale(lang: Locale): string {
	return lang === 'el' ? 'el_GR' : 'en_US';
}

export function getHtmlLang(lang: Locale): string {
	return lang === 'el' ? 'el-GR' : 'en-US';
}
