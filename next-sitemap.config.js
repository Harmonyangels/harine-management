/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://harinemanagement.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  transform: async (config, path) => {
    let priority = 0.7;

    if (path === '/') {
      priority = 1.0;
    } else if (path.startsWith('/services')) {
      priority = 0.9;
    } else if (path.startsWith('/blog')) {
      priority = 0.8;
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
    ],
  },
};
