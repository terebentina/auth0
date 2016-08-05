const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const atImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const discardComments = require('postcss-discard-comments');
const advancedVariables = require('postcss-advanced-variables');
const flexbugsFixes = require('postcss-flexbugs-fixes');
const nested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const reporter = require('postcss-reporter');

const babelQuery = {
  presets: ['es2015', 'stage-0', 'react'],
};

const env = ['NODE_ENV', 'AUTH0_DOMAIN', 'AUTH0_CLIENT_ID'];

const defines = env.reduce(
  (obj, key) => {
    // eslint-disable-next-line no-param-reassign
    obj[`process.env.${key}`] = JSON.stringify(process.env[key]);
    return obj;
  },
  {}
);

module.exports = {
  context: __dirname,
  entry: path.resolve('./src/index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/',
    pathinfo: true,
    sourceMapFilename: '[name].map',
  },
  target: 'web',
  devtool: false,
  debug: false,
  cache: false,
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: [/node_modules/, path.resolve(__dirname, './build')], query: babelQuery },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[local]-[hash:base64:5]!postcss') },
    ],
  },
  postcss: [
    atImport(), postcssUrl(),

    // Discard comments in your CSS files with PostCSS.
    // https://github.com/ben-eb/postcss-discard-comments
    // Remove all comments... we don't need them further down the line
    // which improves performance (reduces number of AST nodes)
    discardComments({
      removeAll: true,
    }),

    // PostCSS plugin for Sass-like variables, conditionals, and iteratives
    // Supports local variables + @for/@each inspired by Sass
    // https://github.com/jonathantneal/postcss-advanced-variables
    advancedVariables({
      variables: {},
    }),

    // Tries to fix all of flexbug's issues
    // https://github.com/luisrudge/postcss-flexbugs-fixes
    flexbugsFixes,

    // Unwrap nested rules like how Sass does it.
    // https://github.com/postcss/postcss-nested
    nested,

    autoprefixer({ browsers: ['last 2 versions'] }),

    // Log PostCSS messages to the console
    reporter({
      clearMessages: true,
    }),
  ],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(defines),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
    new HtmlWebpackPlugin({
      title: 'Dan Caragea + Auth0 = ❤',
      template: 'src/index.html',
    }),
  ],
};
