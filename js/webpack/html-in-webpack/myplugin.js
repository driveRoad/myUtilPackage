// const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');


class MyPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
      console.log('The compiler is starting a new compilation');

      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'MyPlugin',
        (data, cb) => {
          data.html += 'The Magic Footer'
          cb(null, data);
        }
      )
    })
  }
}

module.exports = MyPlugin;