import { site } from './config';
import { getLocalePath, getHtmlLang, type Locale } from '@/i18n/utils';

type Restaurant = Record<string, unknown> & { '@context': string; '@type': 'Restaurant' };

export function buildRestaurantSchema(locale: Locale): Restaurant {
	const url = `${site.url}${getLocalePath('/', locale)}`;
	const street = locale === 'el' ? site.address.streetAddress : site.address.streetAddressEn;
	const locality = locale === 'el' ? site.address.addressLocality : site.address.addressLocalityEn;
	const region = locale === 'el' ? site.address.addressRegion : site.address.addressRegionEn;

	const schema: Restaurant = {
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
		sameAs: [site.social.instagramUrl],
		inLanguage: getHtmlLang(locale),
	};

	// Only emit `geo` once the client confirms exact lat/lng.
	if (site.geo) {
		schema.geo = {
			'@type': 'GeoCoordinates',
			latitude: site.geo.latitude,
			longitude: site.geo.longitude,
		};
	}

	// Only emit `openingHoursSpecification` once exact opening times are confirmed.
	if (site.hours) {
		schema.openingHoursSpecification = site.hours.map((h) => ({
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: [...h.dayOfWeek],
			opens: h.opens,
			closes: h.closes,
		}));
	}

	return schema;
}
