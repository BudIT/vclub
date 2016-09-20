//  __dirname = https://nodejs.org/docs/latest/api/globals.html#globals_dirname

var webpack = require('webpack');

module.exports = {
  entry: [
    './src/club.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      // enabling the latest JS abilities
      // check .babelrc
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css/,
        loaders: ['style', 'css'],
      }
    ],
  },
  resolve: {
    alias: {
      // can
        // import Component from 'vclub/component/Component'
      // even we don't have vclub directory or module
      vclub: __dirname + '/src',
    },
  },
  plugins: [
    // read https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
  ],
  devServer: {
    // automatic refresh on change
    inline: true,
    // server port
    port:3333,
  },
  // easy to debug
  devtool: "source-map"
};
