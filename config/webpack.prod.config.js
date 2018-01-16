const merge = require('webpack-merge')
const common = require('./webpack.config.js')

const paths = require('./paths')

const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new PurifyCSSPlugin({
      paths: [paths.src + '/index.html']
    }),
    new uglifyjsWebpackPlugin()
  ]
})