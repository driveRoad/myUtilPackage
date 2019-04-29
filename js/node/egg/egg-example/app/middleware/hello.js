// 中间件中的this指的是ctx,即context，在其它文件中通过this.ctx来使用contenxt对象
module.exports = (options, app) => {
  return async function hello(ctx, next) {
    console.log('走到hello.js中间件了');
    console.log(options);// 其配置为这个  

    await next();
    ctx.redirect('http://www.baidu.com')
  }
  
}