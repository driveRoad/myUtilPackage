/**
 * 手动实现一个eventEmitter
 */
function EventEmitter() {
  this.events = {} // 保存所有的监听函数
  
}

/** 
 * 监听事件
*/
EventEmitter.prototype.addEventListener = function(type, listener) {
  if (this.events[type]) {
    this.events[type].push(listener);
  } else {
    this.events[type] = [listener];
  }
}

/**
 * 触发事件
 */
EventEmitter.prototype.emit = function(type, ...rest) {
  if (this.events[type]) {
    this.events[type].forEach(listener => {
      listener.apply(this, rest);
    });
  }
}


/**
 * 移除事件
 */
EventEmitter.prototype.removeListener = function(type, listener) {
  if (this.events[type]) {
    this.events[type] = this.events[type].filter(l = l!= listener)
  }
}

module.exports = EventEmitter;
