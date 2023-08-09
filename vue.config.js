import SitemapPlugin from 'sitemap-webpack-plugin'
// You can write the paths as an array of strings or an array of objects
const paths = [
  {
      path: '/',
      lastmod: '2021-11-22',
      priority: 1.0,
      changefreq: 'yearly'
  },
  {
      path: '/about/',
      lastmod: '2021-11-22',
      priority: 0.9,
      changefreq: 'yearly'
  }
]

// eslint-disable-next-line no-undef
export const configureWebpack = {
    plugins: [
        new SitemapPlugin({ base: 'https://example.com', paths })
    ]
}