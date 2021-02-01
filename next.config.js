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
      },
      {
        source: '/sports',
        destination: '/category/sports',
        permanent: false
      },
      {
        source: '/local',
        destination: '/category/local',
        permanent: false
      },
      {
        source: '/business',
        destination: '/category/business',
        permanent: false
      },
      {
        source: '/agriculture-news',
        destination: '/category/agriculture-news',
        permanent: false
      }
    ]
  }
}