import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: ['루나', 'LUNA Coding'],
  url: SITE_URL,
  logo: `${SITE_URL}/icons/logo.svg`,
  description: SITE_DESCRIPTION,
  foundingDate: '2018',
  sameAs: [
    'https://github.com/LUNA-coding',
    'https://www.instagram.com/dimigo_luna/',
    'https://www.youtube.com/channel/UCWfvTEUzP9b2pPTDBSi9IMg',
    'https://www.facebook.com/lunacoding/',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: '안산시',
    addressRegion: '경기도',
    addressCountry: 'KR',
  },
  parentOrganization: {
    '@type': 'EducationalOrganization',
    name: '한국디지털미디어고등학교',
    alternateName: '디미고',
    url: 'https://www.dimigo.hs.kr',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: '루나',
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'ko-KR',
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
