const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.[contenthash].js',
  },
  
  plugins: [
    new HTMLWebpackPlugin({
      template: './template/index.html',
    }),
  ],

  mode,
};
