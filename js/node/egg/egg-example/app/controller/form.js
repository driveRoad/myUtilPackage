const Controller  = require('egg').Controller;

class FormController extends Controller {


  async post(ctx) {
    const createRule = {
      username: {
        type: 'email',
      },
      password: {
        type: 'password',
        compare: 're-password',
      },
    };
    // ctx.validate(createRule);
    console.log('form');
    console.log(ctx.query.name);
    console.log(`${JSON.stringify(ctx.request.body)}`)
    ctx.redirect(`www.baidu.com`);

  }
}

module.exports = FormController;

// /？ ===》 ctx.query.name
// post  ==> ctx.request.body
// /:id/:name => ctx.params[0]; ctx.params[1]