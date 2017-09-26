const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'js'),
  resolve: {
    modules: [path.resolve(__dirname, 'js'), 'node_modules']
  },
  entry: {
    main: './main.js',
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].bundle.js',
    publicPath: 'assets/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: false },
          },
        ],
      },
      {
        test: /\.(svg|png|jpg|eot|ttf|woff|woff2|otf)$/,
        loader: 'file-loader'
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname),
  },
};
