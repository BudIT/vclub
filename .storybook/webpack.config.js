const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css/,
        exclude: /node_modules/,
        loaders: ['style', 'css?modules&importLoaders=1', 'postcss-loader'],
      },
      {
        test: /.(png|gif|jpe?g)(\?[a-z0-9=\.]+)?$/,
        loader: 'url',
        query: {
          limit: 10240,
          name: '[name]-[hash:6].[ext]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      vclub: path.resolve('./src'),
    },
  },
};
