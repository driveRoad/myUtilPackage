// 扩展的自定义对象
const bar = Symbol.for('#BAR');
module.exports = {
  get bar() {
    if (!this[bar]) {
      this[bar] = 'zll';
    }
    return this[bar];
  }
}