import { site } from './config';
import { getLocalePath, getHtmlLang, type Locale } from '@/i18n/utils';

export function buildRestaurantSchema(locale: Locale) {
	const url = `${site.url}${getLocalePath('/', locale)}`;
	const street = locale === 'el' ? site.address.streetAddress : site.address.streetAddressEn;
	const locality = locale === 'el' ? site.address.addressLocality : site.address.addressLocalityEn;
	const region = locale === 'el' ? site.address.addressRegion : site.address.addressRegionEn;

	return {
		'@context': 'https://schema.org',
		'@type': 'Restaurant',
		'@id': `${site.url}/#restaurant`,
		name: site.name,
		url,
		telephone: site.phone,
		image: `${site.url}${site.ogImage}`,
		servesCuisine: [...site.cuisine],
		priceRange: site.priceRange,
		address: {
			'@type': 'PostalAddress',
			streetAddress: street,
			addressLocality: locality,
			postalCode: site.address.postalCode,
			addressRegion: region,
			addressCountry: site.address.addressCountry,
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: site.geo.latitude,
			longitude: site.geo.longitude,
		},
		openingHoursSpecification: site.hours.map((h) => ({
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: [...h.dayOfWeek],
			opens: h.opens,
			closes: h.closes,
		})),
		sameAs: [site.social.instagramUrl],
		inLanguage: getHtmlLang(locale),
	};
}
