/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://bbpartners.co.kr",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Yeti", // 네이버 검색 크롤러
        allow: "/",
      },
    ],
    additionalSitemaps: ["https://bbpartners.co.kr/sitemap.xml"],
  },
};
