  // var test = require('./test.js');
// var test2 = require('./test.js');
var fs = require('fs');
// test.name = 'zll';
// console.log(test2);

// function getFile() {
//   fs.readFile('test.js', 'utf-8', function(err, data) {
//     return data;
//     console.log(data);
//   });
// }
// console.log(getFile());

// function* testGenerator() {
//    yield fs.readFile('test.js', 'utf-8', function(err,data) {
//     console.log(data);
//    });
// }

// setTimeout(function(){
//   console.log('定时器');
// }, 0);

// var aa =  testGenerator();  // 返回的是一个迭代器对象，就是遍历了多少个yield,生成了一个对象，包含next方法和generator status
// console.log(aa.next());     // 调用next方法的时候执行第一个yield后的语句，并直接返回后面的值。和promise相比， promise在回调里把异步结果返回到then调用链里，而generator则不可以，
// console.log(aa.next());

// console.log('main thread');

// 如果generator中的代码不是异步的，则同步执行

// generator怎么捕获异常


// function* G() {
//   const a = yield 100;
//   console.log('a', a);
//   const b = yield 200;
//   console.log('b', b);
//   const c = yield 300;
//   console.log('c', c);
// }

// const g = G();
// g.next(); //执行完这个，拿到yield后的值，组成一个对象，作为next的返回值，然后a变量为空值。程序就暂停了
// g.next('aaa'); //下一个next就从上一个yield后执行赋值操作和下一个yield，就停在下一个yield了
// g.next('bbb');
// g.next('ccc');


// 由generator引入了 symbol, iterator, thunk, co, => 最后得出了generator的异步应用



// 无论promise还是generator都离不开callback, js还是js,单线程还是单线程，异步为了解决单线程的弊端，异步行为的执行顺序都是不确定的，为了解决异步确定性问题，引入callback, 一层嵌套一层，导致回调嵌套，promise内部维护了一个状态机器，且状态转换不可逆，通过then的链式调用替代回调嵌套。

// generator则是用yield控制流程的，暂停程序替代回调。但是generator和异步结合的时候需要手动去不停的next,而且还要通过next传参

// const thunk = function(fileName, codeType) {
//   return function(callback) {
//     fs.readFile(fileName, codeType, callback);
//   }
// }

// const readFileThunk = thunk('test.js','utf-8');
// readFileThunk((err, data) => {
//   console.log(data);
// });

// //比如现在我有两个异步读取文件，第二个文件内容依赖第一个
// readFileThunk((err, data) => {
  
// });


// thnkify首先把异步的接口包装了一下，即thnkify化了, 接受一个函数
function thunkify(fn) {
  return function(fileName){
    return function(callback){
      fn(fileName,'utf-8', callback);
    }
  }
}

const thunkifyReadFile =  thunkify(fs.readFile);

const gen = function* () {
  const r1 = yield thunkifyReadFile('test.js'); //以同步的形式
  const r2 = yield thunkifyReadFile('data.js'); //以同步的形式，同时保证了两个文件的读取顺序
}

const g = gen();
g.next().value((err, data) => {
  //拿到第一个文件读取回调
  console.log(data);
  g.next(data).value((err, data) => {
    //把第二个文件读取回调，这样就保证了顺序
    console.log(data);
  });
});

//thunkify还是回调嵌套
