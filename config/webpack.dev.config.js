const merge = require('webpack-merge')
const common = require('./webpack.config.js')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    inline: true,
    publicPath: '/'
  },
})