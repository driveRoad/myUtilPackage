var fs = require('fs');

// 1. EventEmitter的newListenser事件有什么用处
// answer:  newListener可以用来做事件机制的反射， 当任何on事件添加到EventEmitter时，就会触发newListener事件，基于这个，可以做自定义处理
var EventEmitter = require('events').EventEmitter;
var utils = require('util');
var test = require('./test.js');
function MyEmitter() {
  EventEmitter.call(this);
}

utils.inherits(MyEmitter, EventEmitter); //继承 EventEmitter

var em = new MyEmitter();

em.on('hello', function(data) {
  console.log(data);
});

em.emit('hello','EventEmittter  传递消息方便');

var emitter3 = new MyEmitter();
emitter3.on('newListener', function(name, listener) {
  console.log('新事件的名字:', name);
  console.log('新事件的代码:', listener);
  setTimeout(function() {
    console.log('我是自定义延时处理机制');
  }, 1000);
});

emitter3.on('hello', function() {
  console.log('hello node');
});
// 新事件的名字: hello
// 新事件的代码: function() {
//   console.log('hello node');
// }
// 我是自定义延时处理机制
// 从这个结果可以看，newListener也响应了hello事件


//2.怎么读取json文件？
// answer: 主要两种方式：1. 利用node内置的require模块机制，直接得到js对象; 第二种读入文件内容，然后用JSON.parse(content)转换成js对象。
// 两种方式的区别：require机制情况下，如果多个模块都加载了同一个json文件，那么其中一个改变了js对象，其它跟着变，这是由于node模块的缓存机制造成的，只有一个js模块对象。
var test = require('./test.js');
var test2 = require('./test.js');
test.name = 'zll';
console.log(test2); // 输出了name:zll说明被改变了
// 3. fs.watch和fs.watchFile有什么区别，怎么应用
// answer: 两者都用来监听文件变动，fs.watch利用操作系统原生机制来监听，可能不适用网络文件系统，fs.watchFile则是定期检查文件状态变更，适用网络文件系统，则相比fs.watch有些慢


// 4. nodejs的常用的核心模块： fs 模块， eventEmitter模块， http模块， https模块， cluster模块， os 模块， child_process模块， process模块
  //  利用child_process实现两个进程的通信
  //  child_process fork出一个子进程， 主进程拿到子进程句柄，调用on监听子进程的消息， 调用send向子进程发送消息。子进程内通过process.on监听父进程发送的消息， 调用process.send向父进程发送消息

  //  fs文件模块：
  //   readFile: 文件异步读写
  //   readFileSync: 文件同步读写
  //   egg loader中使用fs.statSync(fullPath); 
  console.log(fs.statSync('./test.js').isFile()); // fs.statSync返回的fs.stats对象，描述了文件的信息。isDirectory, isFile,
  console.log(fs.existsSync('./test.js'));// 判断文件路径是否存在
  console.log(fs.realpathSync(''));
  // egg中涉及的文件读写都是采用的同步方法


// 5. 怎么让一个js文件变得像 linux命令一样可执行
  // 在文件头部加入 #!/usr/bin/env node chmod命令把js文件改为可执行文件。



