module.exports = {
  images: {
    domains: ['kbhbcms.homesliceweb.com','blackhillsstore.com','api.weather.gov']
  },
  async redirects() {
    return [
      {
        source: '/obituaries',
        destination: '/category/obituaries',
        permanent: false
      },
      {
        source: '/news',
        destination: '/category/news',
        permanent: false
      }
    ]
  }
}