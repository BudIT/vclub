const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /.css$/,
        loaders: ['style', 'css?modules&importLoaders=1'],
      },
    ],
  },
  resolve: {
    alias: {
      vclub: path.resolve('./src'),
    },
  },
};
