import type { MetadataRoute } from 'next'

const siteUrl = 'https://sagepublishersltd.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/features`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/gallery`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/new-books`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/trailer`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact`, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
