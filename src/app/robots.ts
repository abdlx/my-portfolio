import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'anthropic-ai', 'Claude-Web', 'CCBot'],
        allow: '/',
      }
    ],
    sitemap: 'https://abdlx.com/sitemap.xml',
  }
}
