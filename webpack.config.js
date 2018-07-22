const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './src/client.js'],
  output: {
    path: `${__dirname}/deploy`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        ISBROWSER: JSON.stringify('true'),
      },
    }),
  ],
};
