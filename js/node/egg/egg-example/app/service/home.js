const Service = require('egg').Service;

class HomeService extends Service {

  async getName() {
    console.log('执行service');
    // const result = await this.ctx.curl(`${serverUrl}/hello?name=zll&pwd=123`);
    const result =  await 'zll for service';
    return {
      result: "aaaa"
    }
  }
}

module.exports = HomeService;