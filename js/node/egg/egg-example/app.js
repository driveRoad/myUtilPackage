

class AppHookBook {
  constructor(app) {
    this.app = app;
    app.once('server', (server) => {
      console.log('worker进程启动http服务完成之后');
      // console.log(server);
    });
    app.on('request', (ctx) => {
      // 接收到请求后，触发request请求，然后把请求的上下文暴露给开发者
      console.log('接收到请求了');
      // console.log(ctx);
    });
  
    app.on('response', ctx => {
      console.log('响应请求了');
      // console.log(ctx);
    })
  }

  async configWillLoad() {
    // 此时config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    console.log('配置文件加载合并，但还未生效');
  }

  async didLoad() {
    // 文件加载完毕
    console.log('配置文件加载完毕了');
  }

  async willReady() {
    // 所有的插件都已启动完毕，但应用整体还未ready
    console.log('应用即将启动');
  }

  async didReady() {
    // 应用启动完毕
    console.log('应用启动完毕');
  }

  async serverDidReady() {
    // https server已经启动，开始接受外部请求
    console.log('http 服务器启动好了，开始接受外部请求');
  }
  
}
module.exports = AppHookBook


// helper对象挂载到ctx对象上的，通过ctx.helper对象来获取里面的方法，helper的作用将常用的功能抽离在helper文件里。不是一个目录，相当于一个工具类，但是工具类方法都放在一个文件里，有点拥挤
// service不是挂载到ctx对象上的，而是挂载到app上的。service下的每个文件名都是一个对象，文件里的方法都是挂载到对应文件名上的
// middleware中的this指的是ctx
// 在扩展的application中this指的是app, 在扩展的context， request, response中this 指的就是ctx
// 在controller, service, helper中都可以通过this.app获取应用对象，通过this.ctx获取上下文对象
// helper或者service中的this指的就是helper对象或者service对象

// config挂载到app上的，因为在controler中this指的是app,所以可以通过this.config获取到配置文件，同样在controller中可以通过this.app.controller来
// service是挂载到ctx上的，所以需要通过this.ctx.service来获取相对应的服务
// 中间件会被挂载到app上，应用自定义的app.config.appMiddleware 和框架默认中间件app.config.coreMiddleware会被合并为app.middleware
    // 中间件的挂载方式有三种：第一种是在配置文件中通过属性方法挂载；框架和插件不支持这种配置文件的形式进行挂载，通过app.config.appMiddleware.unshift('report'); 在middleware目录下新增加一个report文件。然后该中间件就生效了；第三种：局部挂载，在路由中通过app.middleare对象中挂载中间件，参数方法为一个对象，对应配置文件中的options, 在app.router中第二个参数为挂载的中间件