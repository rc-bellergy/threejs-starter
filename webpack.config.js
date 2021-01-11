const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    hello_cube: './src/hello_cube.js',
    hello_primitive: './src/hello_primitive.js',
    hello_font: './src/hello_font.js',
    hello_points: './src/hello_points.js',
    hello_position: './src/hello_position.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(),

    // copy models to dist directory
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/models/', to: 'models/' }
      ]
    }),

    // create html pages
    new HtmlWebpackPlugin({
      title: 'three.js hello cube',
      filename: 'index.html',
      chunks: ['hello_cube']
    }),
    new HtmlWebpackPlugin({
      title: 'three.js hello primitive',
      filename: 'hello_primitive.html',
      chunks: ['hello_primitive']
    }),
    new HtmlWebpackPlugin({
      title: 'three.js hello font',
      filename: 'hello_font.html',
      chunks: ['hello_font']
    }),
    new HtmlWebpackPlugin({
      title: 'three.js hello points',
      filename: 'hello_points.html',
      chunks: ['hello_points']
    }),
    new HtmlWebpackPlugin({
      title: 'three.js hello position',
      filename: 'hello_position.html',
      chunks: ['hello_position']
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
