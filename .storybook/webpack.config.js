const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'postcss', 'stylus'],
      },
    ],
  },
  resolve: {
    alias: {
      vclub: path.resolve('./src'),
    },
  },
};
