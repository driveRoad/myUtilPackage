const EventEmitter2 = require('./eventEmitter');

var eventEmitter = new EventEmitter2();

eventEmitter.addEventListener('test', function(data){
  console.log('监听到test消息');
  console.log(data);
});

eventEmitter.emit('test', 'aaa');