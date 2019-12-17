const css = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([
    bundleAnalyzer,
    [optimizedImages],
    [css, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    }]
  ])

