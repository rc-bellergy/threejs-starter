const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    cube: './src/cube.js',
    primitive: './src/primitive.js',
    font: './src/font.js',
    points: './src/points.js',
    position: './src/position.js',
    scroller: './src/scroller.js',
    loader: './src/GLTFLoader.js',
    loader2: './src/DRACOLoader.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0'
  },
  plugins: [
    new CleanWebpackPlugin(),

    // copy models to dist directory
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/models/', to: 'models/' },
        { from: './src/lib/', to: 'lib/' }
      ]
    }),
    // create html pages
    new HtmlWebpackPlugin({
      title: 'three.js hello cube',
      filename: 'index.html',
      chunks: ['cube']
    }),
    new HtmlWebpackPlugin({
      title: 'three.js hello primitive',
      filename: 'primitive.html',
      chunks: ['primitive']
    }),
    new HtmlWebpackPlugin({
      title: 'three.js hello font',
      filename: 'font.html',
      chunks: ['font']
    }),
    new HtmlWebpackPlugin({
      title: 'three.js hello points',
      filename: 'points.html',
      chunks: ['points']
    }),
    new HtmlWebpackPlugin({
      title: 'three.js hello position',
      filename: 'position.html',
      chunks: ['position']
    }), new HtmlWebpackPlugin({
      title: 'three.js hello DRACO Loader',
      filename: 'loader2.html',
      chunks: ['loader2']
    }), new HtmlWebpackPlugin({
      title: 'three.js hello GLTF Loader',
      filename: 'loader.html',
      chunks: ['loader']
    }),
    new HtmlWebpackPlugin({
      title: 'three.js hello scroller',
      filename: 'scroller.html',
      chunks: ['scroller'],
      template: './src/scroller.ejs'
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
