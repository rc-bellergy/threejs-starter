const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: 'three.js starter page',
        }),
    ],
    module: {
        rules: [
          {
            test: /\.css$/i,
            include: path.resolve(__dirname, 'src'),
            use: [ 'style-loader','css-loader' ],
          },
          {
            test: /\.s[ac]ss$/i,
            include: path.resolve(__dirname, 'src'),
            use: [ 'style-loader','css-loader','sass-loader' ],
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
