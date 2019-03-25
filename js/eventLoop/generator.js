// 看看generator的实现。因为promise,  如果一个异步的事件交给了yield，会阻止主线程同步的逻辑吗
var a = 1;

function promiseTimer(res, rej) {
  setTimeout(function() {
    console.log('promise');
    res(2);
  }, 1000);
}

function* generatorTimer() {
  setTimeout(function() {
    console.log('generator');
  }, 0);
}

function* showWords() {
  yield* generatorTimer();
  
}

// new Promise((res, rej)=> {
//   promiseTimer(res, rej);
// }).then(function(val) {
//   //这里拿到 上一个异步的值，这里再执行另一个异步事件，就类似嵌套回调的第二个回调
// }, function(val) {

// })

var show = showWords(); // 执行generator函数,  返回了一个迭代器对象，有个一generatorStatus属性，表示当前迭代器对象处于什么状态，和promise里的状态机一样，

console.log(show.next()); //直接把yield 后面的值返回
console.log('fafa');







// 所以promise解决了异步回调，和catch错误的问题，因为异步try...catch没有用，只能在回调中去try...catch, 无法在最外层去try...catch. 问题是依然通过then进行回调，与同步写法还是有点距离



