import { MetadataRoute } from 'next';
import { seoCities, seoPathologies } from '@/data/seo-content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://diagnostic-bois.com';

  const citiesUrls = seoCities.map((city) => ({
    url: `${baseUrl}/diagnostic-bois-${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const pathologiesUrls = seoPathologies.map((patho) => ({
    url: `${baseUrl}/pathologie/${patho.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/diagnostic/nouveau`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cgv`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  return [...staticUrls, ...pathologiesUrls, ...citiesUrls];
}
