const withPlugins = require('next-compose-plugins')
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([
    bundleAnalyzer,
    [optimizedImages]
  ])

