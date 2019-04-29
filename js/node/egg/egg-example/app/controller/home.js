const Controller  = require('egg').Controller;

class HomeController extends Controller {
  
  async index(ctx) {
    console.log(ctx.query.name);
    
    // const result = this.ctx.service.getName();
    console.log(this.config.keys);
    console.log(this.app.config.keys);
    // console.log(this.ctx.service.home.getName().then((data)=> {console.log(data)}));
    // console.log(this.ctx.helper.foo());
    // console.log(this.app.bar);// 通过Symbol + getter挂载全局属性或者方法到app上
    
    const returnBody = `<div style="color:red">hello world</div><link rel="stylesheet" href='../public/hello.css'>`;
    

    this.ctx.body = returnBody;
    // ctx.redirect(`http://www.baidu.com`);

  }
}

module.exports = HomeController;

// egg启动的时候加载根目录下的config目录下的文件
