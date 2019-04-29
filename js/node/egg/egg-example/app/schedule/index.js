const Subscription = require('egg').Subscription;

class IndexSchedule extends Subscription {
  static get schedule() {
    return {
      interval: '1m',
      type: 'all'
    }
  }

  async subscribe() {
    this.ctx.app.name = 'hello';
  }
}
module.exports = IndexSchedule;


// 定时任务还支持commonJS的写法
module.exports = app => {
  return {
    schedule: {
      interval: '1m',
      type: 'all'
    },
    async task(ctx) {
      ctx.app.name = 'hello'
    }
  }
}