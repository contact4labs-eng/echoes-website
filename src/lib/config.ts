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
	geo: {
		// TODO_CLIENT: confirm exact rooftop pin from Google Business Profile.
		latitude: 37.9295,
		longitude: 23.7568,
	},
	hours: [
		{ days: 'Mon-Fri', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
		{ days: 'Sat-Sun', dayOfWeek: ['Saturday', 'Sunday'], opens: '09:00', closes: '23:00' },
	],
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
} as const;

export type SiteConfig = typeof site;
