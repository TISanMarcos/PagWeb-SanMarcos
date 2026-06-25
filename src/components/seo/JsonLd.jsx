import { BRANCH } from '../../constants/branch';
import { SOCIAL_LINKS } from '../../constants/social';
import { googleReviews } from '../../data/googleReviews';
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from '../../constants/seo';

const JsonLd = () => {
  const reviews = googleReviews.map(({ author, quote }) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: author },
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    reviewBody: quote,
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo_sm_horizontal_bicolor.png`,
        description: DEFAULT_DESCRIPTION,
        sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+52-55-5694-3312',
          contactType: 'customer service',
          areaServed: 'MX',
          availableLanguage: ['Spanish'],
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: SITE_NAME,
        url: SITE_URL,
        description: DEFAULT_DESCRIPTION,
        image: `${SITE_URL}/banner_principal_1.jpg`,
        logo: `${SITE_URL}/logo_sm_horizontal_bicolor.png`,
        parentOrganization: { '@id': `${SITE_URL}/#organization` },
        address: {
          '@type': 'PostalAddress',
          streetAddress: BRANCH.addressLine1,
          addressLocality: 'Iztapalapa',
          addressRegion: 'Ciudad de México',
          postalCode: '09040',
          addressCountry: 'MX',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: BRANCH.lat,
          longitude: BRANCH.lng,
        },
        telephone: '+52-55-5694-3312',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '07:00',
            closes: '17:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '07:00',
            closes: '14:00',
          },
        ],
        hasMap: BRANCH.googleMapsUrl,
        priceRange: '$$',
        review: reviews,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'es-MX',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLd;
