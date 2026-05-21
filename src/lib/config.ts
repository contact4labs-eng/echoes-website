interface GeoPoint {
	latitude: number;
	longitude: number;
}

interface HoursSpec {
	days: string;
	dayOfWeek: string[];
	opens: string;
	closes: string;
}

export const site = {
	name: 'Echoes Bistrot',
	wordmark: 'Echoes',
	tagline: { el: 'Brunch χωρίς πόζες.', en: 'A quieter take on brunch.' },
	url: 'https://echoesbistrot.gr',
	phone: '+302109901676',
	phoneDisplay: '210 990 1676',
	address: {
		streetAddress: 'Νυμφών 33',
		streetAddressEn: 'Nymfon 33',
		addressLocality: 'Ηλιούπολη',
		addressLocalityEn: 'Ilioupoli',
		postalCode: '163 41',
		addressRegion: 'Αττική',
		addressRegionEn: 'Attica',
		addressCountry: 'GR',
	},
	// TODO_CLIENT: confirm exact rooftop pin (GBP). Until confirmed, no `geo` in JSON-LD.
	geo: null as GeoPoint | null,
	// TODO_CLIENT: confirm exact open times. Until confirmed, no `openingHoursSpecification` in JSON-LD.
	// Visible UI copy in `visit.hoursWeekdays/Weekends` is verified ("morning until 18:00 / 23:00") and stays.
	hours: null as HoursSpec[] | null,
	cuisine: ['Brunch', 'Bistro', 'Mediterranean', 'Coffee'],
	priceRange: '€€',
	social: {
		instagramHandle: 'echoes_bistrot',
		instagramUrl: 'https://instagram.com/echoes_bistrot',
		instagramDm: 'https://ig.me/m/echoes_bistrot',
	},
	mapsSearchUrl:
		'https://www.google.com/maps/search/?api=1&query=' +
		encodeURIComponent('Echoes Bistrot Νυμφών 33 Ηλιούπολη'),
	mapsEmbedUrl:
		'https://www.google.com/maps?q=' +
		encodeURIComponent('Νυμφών 33, Ηλιούπολη 163 41') +
		'&output=embed',
	ogImage: '/og-image.jpg',
};

export type SiteConfig = typeof site;
