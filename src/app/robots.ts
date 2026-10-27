import type { MetadataRoute } from 'next';
import { absoluteUrl, site } from '@/lib/site';

/** Rastreadores de IA a los que se permite explícitamente el acceso (AEO). */
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  const sitemap = absoluteUrl('/sitemap.xml');

  if (site.prelaunch) {
    return { rules: [{ userAgent: '*', disallow: '/' }], sitemap };
  }

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: aiCrawlers, allow: ['/', '/llms.txt', '/llms-full.txt'], disallow: ['/api/'] },
    ],
    sitemap,
    host: site.url,
  };
}
