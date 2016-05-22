const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const TextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    // site: path.resolve(__dirname, 'src/site.js'),
    club: path.resolve(__dirname, 'src/club.js'),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loader: TextPlugin.extract('style', 'css!postcss!stylus'),
      },
    ],
  },
  resolve: {
    alias: {
      vclub: path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new TextPlugin('[name].bundle.css'),
  ],
  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
};
