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
			{
				test: /\.css$/,
				use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
			}
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.[contenthash].js',
		publicPath: '/',
  },
  
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './template/index.html'),
    }),
  ],

	devServer: {
		historyApiFallback: true,
	},

  mode,
};
