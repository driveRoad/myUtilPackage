const fs = require('fs');
// new Promise((resolve, reject) => {
//   console.log('同步执行');
// }).then(()=> {
//   console.log('promise异步执行回调');
// }, ()=> {

// })

// setTimeout(function() {
//   console.log('setTimeout回调执行');
// },0);

// 从结果来看timeout的优先级比Immediate要高
// 宏观任务队列： setTimeout, setImmediate, setInterval, IO, UI rendering
// 微观任务队列:  process.mextTick, Promise, Object.observe

// 微观队列的优先级 > 宏观队列的优先级; 这里从index.html中已经认证，Promise > timeout

// 1.疑问？
//   同一个优先级别的呢，定时器同时触发的时候，谁先注册的谁先执行回调，不是同时触发，那么谁的定时器时间短，谁先执行
  // setImmediate(function(){
  //   console.log('setImmediate 回调执行');
  // },0);

  // setTimeout(function() {
  //   console.log('setTimeout回调执行');
  // },0);

  // 这两个的执行熟悉不固定 ， setTimeout的优先级和setImmdiate的优先级谁高呢, 测试，同一个定时器，同时触发

  // setTimeout(function() {
  //   console.log('setTimeout1回调执行');
  // },0);

  // setTimeout(function() {
  //   console.log('setTimeout2回调执行');
  // },0);

  // 以上就是setTimeout1总是先于setTimout2执行。证实了定时器同时触发的时候，谁先注册的谁先执行回调

  //但Immediate和timeout不一定，这什么原因，为什么要引入Immediate？
      // 等待答复：

  //   fs.readFileSync('index.html','utf-8', function(err,data) {
  //     console.log(data);
      
  //   });
  //   new Promise((resolve, reject) => {
  //     // 这里放置异步事件，还是要等到异步事件做完，才能往下继续进行，而不是说你去处理其它的事情，异步的事情交给内部底层线程池去做，做好后，在异步队列里放置回调，处罚promise的then回调
  //     fs.readFile('index.html','utf-8', function(err,data) {
  //       console.log(data);
  //       resolve(data);
  //     });
  //     // var data =  fs.readFileSync('index.html','utf-8');
  //     // console.log(data);
  //   }).then((val) => {
  //     console.log(val);
  //   }, ()=> {

  //   });

  // console.log('后续执行');

  // console.log(fs.readFileSync('data.txt','utf-8'));

  // Promise中的如果是异步操作，那么异布操作交给其它线程去执行，主线程继续往下执行栈内的内容，当异步操作执行结束后，则在异步队列中放置回调，等待事件轮询，接下来就是事件轮询的程序了，拿出相应队列中的回调到主线程中执行。根据结果来看，确实先打印“后续执行， data.txt内容，再打印出index,html的内容”;

  // 对于Promise中的同步，即执行fs.readFileSync的时候，会等待这个执行结束，即先打印出index.html的内容，再打印"后续执行“， data.txt中的内容。


  // node.js中的事件队列

  // setTimeout(function() {
  //   console.log('setTimeout回调1');
  // });
  
  // fs.readFile('data.txt','utf-8', function(err,data) {
  //   console.log(data);
  // });

  // fs.readFile('index.html','utf-8', function(err, data) {
  //   console.log(data);
  // })

  // setTimeout(function(){
  //   console.log('setTimeout回调2');
  // });

  // // 打印结果是先打印出setTimeout1和setTimeout2, 再打印出data.txt中的内容。证实了I/O 的优先级低于setTimeout

  // new Promise((resolve, reject) =>{
  //   resolve(1);
  // }).then(() => {
  //   console.log('promise');
  // }, ()=> {
    
  // })

  // process.nextTick(function(){
  //   console.log('process nexttick');
  // });

  // 综上所述： nextTick > Promise（注册多个，依次执行）  >  setTimeout(同时注册多个，按照注册顺序依次执行) > I/0（注册这个，依次执行）

  // 问题，为什么引入setImmediate，相当于setTimeout(function(){},0),  事实上机器会有延迟，大概4ms，那么也就是说进入times，然后统计计时的时候时间到了 那么就执行setTimeout,但是如果没到这个事件，setTimeout不执行，那么主线程就拿setImmediate执行。其实可以理解setImmediate不需要进入timer阶段，直接进入poll阶段，进入事件循环
  // 确保setImmediate比setTimeout先执行，放到一个异步中,
  // fs.readFile('data.txt','utf-8', function(err,data) {
  //   setTimeout(function(){
  //     console.log('异步 setTimeout执行');
  //   },0);

  //   setImmediate(function(){
  //     console.log('异步 setImmediate执行');
  //   });
  // });


  //如果在高优先级的队列中递归调用，那么低优先级的队列中的回调就没发执行
  process.nextTick(function(){
    console.log('first nextick');
    process.nextTick(function(){
      console.log('second nextick');
      process.nextTick(function(){
        console.log('third nextick');
        process.nextTick(function(){
          console.log('fourth nextick');
          process.nextTick(function(){
            console.log('last nexttick')
          })
        })
      })
    })
  });

  new Promise((resolve, reject) => {
    resolve(1);
  }).then(()=> {
    console.log('promise huidiao');
  },() => {
    console.log('promise huidiao');
  })

  // 打印出first nextick
      // second nextick
      // third nextick
      // fourth nextick
      // last nexttick
      // promise huidiao

  

  // 最后一个问题，为什么setTimeout和setImmdiate的执行顺序不一致？




    