/* eslint-disable semi */
/* eslint-disable comma-dangle */
const path = require('path')
const webpack = require('webpack')

/*
 * Webpack Plugins
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const ProductionPlugins = [
  // production webpack plugins go here
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
]

const debug = process.env.NODE_ENV !== 'production'
const rootAssetPath = path.join(__dirname, 'assets')

module.exports = {
  // Removes lots of "Child mini-css-extract-plugin" messages.
  stats: {
    entrypoints: false,
    children: false,
  },
  // configuration
  context: __dirname,
  entry: {
    main_js: './assets/js/main',
    main_css: [
      path.join(__dirname, 'node_modules', 'font-awesome', 'css', 'font-awesome.css'),
      path.join(__dirname, 'assets', 'js', 'Components', 'AccountStats', 'style.css'),
      path.join(__dirname, 'assets', 'js', 'Components', 'Cards', 'cards.css'),
      path.join(__dirname, 'assets', 'js', 'Components', 'Cards', 'card.css'),
      path.join(__dirname, 'assets', 'js', 'Components', 'Focus', 'style.css'),
      path.join(__dirname, 'assets', 'js', 'Components', 'Welcome', 'style.css'),
      path.join(__dirname, 'assets', 'js', 'Components', 'PvP', 'style.css'),
      path.join(__dirname, 'assets', 'js', 'Components', 'PGCR', 'style.css'),
      path.join(__dirname, 'assets', 'js', 'Components', 'PGCR_Splash', 'style.css'),
      path.join(__dirname, 'assets', 'js', 'Components', 'Progress', 'style.css'),
      path.join(__dirname, 'assets', 'js', 'Components', 'WeaponSummary', 'style.css'),
      path.join(__dirname, 'assets', 'js', 'Components', 'CharacterPlate', 'style.css'),
      path.join(__dirname, 'assets', 'js', 'Components', 'CharacterSelect', 'style.css'),
      path.join(__dirname, 'assets', 'js', 'Utils', 'Loading', 'style.css'),
      path.join(__dirname, 'assets', 'css', 'icons.css'),
      path.join(__dirname, 'assets', 'css', 'style.css'),
    ],
  },
  mode: debug,
  output: {
    chunkFilename: '[id].js',
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'destiny_focus', 'static', 'build'),
    publicPath: '/static/build/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  devtool: debug ? 'eval-source-map' : false,
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].bundle.css' }),
    new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
    new webpack.DefinePlugin({
      'process.env.GOOGLE_ANALYTICS_ID': JSON.stringify(process.env.GOOGLE_ANALYTICS_ID || '')
    }),
  ].concat(debug ? [] : ProductionPlugins),
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: debug,
            },
          },
          'css-loader!less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: debug,
            },
          },
          'css-loader',
        ],
      },
      { test: /\.html$/, loader: 'raw-loader' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: { limit: 10000, mimetype: 'application/font-woff' },
      },
      {
        test: /\.(ttf|eot|png|jpe?g|gif|ico|json|xml|webmanifest)(\?.*)?$/i,
        use: [
          {
            loader: `file-loader?context=${rootAssetPath}&name=[path][name].[ext]`,
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties',
          ],
          cacheDirectory: true
        },
      },
    ],
  },
}
