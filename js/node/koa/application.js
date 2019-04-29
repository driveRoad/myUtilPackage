let http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');
let EventEmitter = require('events');


class Application extends EventEmitter{
  constructor() {
    super();
    this.callbackFunc = [];
    this.context = context;
    this.request = request;
    this.response = response;
    
  }

  listen(...args) {
    let server = http.createServer(this.callback());
    server.listen(...args);
  }

  use(fn) {
    this.callbackFunc.push(fn);
  }

  callback() {
    this.emit('error', 'aaa');
    const fn = this.compose(this.callbackFunc)
    const handleRequest = (req, res) => {
      let ctx = this.createContext(req, res); // 每次请求过来都创建请求上下文。这个上下文对象挂载了一些代理方法
      let respond = () => this.responseBody(ctx);
      fn(ctx).then(respond).catch(this.onerror.call(this, ctx)); //每个中间件执行后返回promise对象。await返回一个promise对象
    }

    return handleRequest;
  }

  onerror(ctx2) {
    
    let ctx = ctx2;
    
    (err) => {
      if (err.code == 'ENOENT') {
        ctx.status = 404;
      } else {
        ctx.status = 500;
      }
      let msg = err.message || 'Internal error';
      ctx.res.end(msg);
      // 触发error事件
      
    }
  }

  compose(middlewares) {
    for (var middleware of middlewares) {
      if (typeof middleware !== 'function') {
        throw new Error('middleware must be function')
      }
    }
    return function(context, next) {
      var index = -1;
      function dispatch(i) {
        if (i <= index) throw new Error('this function has already excuss');
        index = i;
        var fn = middlewares[i]; // 取出第0个中间件
        if (i === middlewares.length) fn = next;  // 最后一个next就是一个null
        if (!fn) return Promise.resolve(); // 终止执行
        try {
          return Promise.resolve(fn(context, function next() {
            return dispatch(i+1);
          }));
        } catch( err ) {
          return Promise.reject(err);
        }   
        
      }
      return dispatch(0)
    }
  }

  /**
   * 创造context,执行上下文
   */
  createContext(req, res) {
    let ctx = Object.create(this.context);
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }

  /**
   * 对客户端消息进行回复
   */
  responseBody(ctx) {
    let content = ctx.body;
    if (typeof content === 'string') {
      ctx.res.end(content);
    }
    else if (typeof content === 'object') {
      ctx.res.end(JSON.stringify(content));
    }
  }
}

module.exports = Application;



