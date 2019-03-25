// 学习把打包生成的js和css自动放到html中引入，涉及到的插件是html-webpack-plugin

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MyPlugin = require('./myplugin');
const path = require('path');
module.exports = {
  entry: {
    index: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][hash:5].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      title:'hello world',
      // hash: true,
      inject: head,      
      minify: {
        // 清理注释
        removeComments: true,
      }
    }),

    
  ]
}