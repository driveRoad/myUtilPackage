const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MyPlugin = require('./myplugin');
module.exports = {
  entry: {
    pageA: [path.resolve(__dirname, './multiple/pageA.js')],
    pageB: [path.resolve(__dirname, './multiple/pageB.js')],
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name][chunkhash:8].js',
  },

  plugins: [

    // 自动生成html文件，并把打包生成，代码分割的js和css自动引入到html文件中
    new HtmlWebpackPlugin({
      template: './index.html',
      filename:'index.html',
      hash:true,
      minify: {
        removeComments: true,
        removeTagWhitespace: true,
      },
      inject: 'body'
    }),

    new CleanWebpackPlugin(),

    new MyPlugin()
  ],

  // 代码分割
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10
        },
        utils: {
          chunks: 'initial',
          name: 'commons',
          minSize: 0,
        }
      }
    },
    runtimeChunk: {
      name: 'manifest',
    }
  } 
}