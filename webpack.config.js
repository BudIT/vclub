const path        = require('path');
const webpack     = require('webpack');
const autoreset   = require('postcss-autoreset')
const normalize   = require('postcss-normalize')


const DEV = process.env.NODE_ENV !== 'production';
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  __DEV__: DEV,
  __CLIENT__: false,
  __SERVER__: false,
};

module.exports = [
  // Client config
  {
    name: 'client',
    entry: {
      // site: path.resolve(__dirname, 'src/site.js'),
      club: './src/club.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist/public'),
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
          test: /\.css/,
          exclude: /node_modules/,
          loaders: ['style', 'css?modules&importLoaders=1', 'postcss-loader'],
        }
      ],
    },
    postcss: function() {
      return [autoreset, normalize]
    },
    resolve: {
      alias: {
        vclub: path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new webpack.DefinePlugin(Object.assign({}, GLOBALS, { __CLIENT__: true })),
    ],
  },
  {
    name: 'server',
    entry: {
      server: 'vclub/server',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      libraryTarget: 'commonjs2',
    },
    target: 'node',
    node: {
      __dirname: false,
    },
    externals: (context, request, cb) => {
      cb(null, !request.startsWith('vclub') && !request.startsWith('.'));
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    resolve: {
      alias: {
        vclub: path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new webpack.DefinePlugin(Object.assign({}, GLOBALS, { __SERVER__: true })),
    ],
  },
];
