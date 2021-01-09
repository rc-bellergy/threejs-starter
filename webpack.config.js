const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    lines: './src/lines.js',
    text: './src/text.js',
    model: './src/model.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'three.js starter page',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({  
      title: 'three.js lines sample',
      filename: 'lines.html',
      chunks: ['lines']
    }),
    new HtmlWebpackPlugin({
      title: 'three.js text sample',
      filename: 'text.html',
      chunks: ['text']
    }),
    new HtmlWebpackPlugin({
      title: 'three.js model sample',
      filename: 'model.html',
      chunks: ['model']
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/models/', to:'models/' },
      ]
  })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
