const htmlWebpackPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')

const paths = require('./paths')

module.exports = {
  entry: paths.src + '/index.js',
  output: {
    path: paths.build,
    filename: 'bundle.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: paths.src + '/index.html'
    }),
    new extractTextPlugin('bundle.css')
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: extractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(svg|ttf|woff|woff2|eot)$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
