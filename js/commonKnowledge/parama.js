// 记录常见的语法奇怪之处
1. undefined == null => true;  Number(undefined) => NaN; Number(null) => 0; NaN == 0 => false
所以上面的undefined == null 就很奇怪了

2。清空数组的方法
  var a = [1,2,4]; ==> a.length = 0; 则把数组清除调

3. 判断0与-0
  function isNegZero(num) {
    if (!isNaN(Number(num))) {
      return num === 0 && (1/num == -Infinity);
    }
    return false;
  }
4. 把类数组对象转换为数组
   原声dom对象、arguments, jquery对象就是类数组对象。把类数组对象转换为数组对象
   Array.prototype.slice.call(arguments);
   [].slice.call(arguments)
   es6的 Array.from(arguments) 
   以上三种方法都可以把类数组转换为数组对像。

5. 封装javascript源文件的全部内容到一个函数块中有什么意义及理由
   jquery,node.js都在采用这种方式。这种技术创建了一个围绕文件全部内容的闭包，创建一个私有的命名空间，从而有助于避免不同javascript模块和库之间潜在的名称冲突。
   另一个特点：允许一个易于引用的别名用于全局变量。
   这个线下去实现一下，建立两个js文件，在html文件中去引用，看看效果

6. 怎么判断isNaN
   根据value != value ==> 返回true.或者es6的Number.isNaN方法
7. 讨论函数isInteger(x)的可能方法，确定x是不是整数
   function isInteger(x) {
     return Number.isInteger(x);
   }
   function isInteger(x) {
     return typeof x === 'number' && x % 1 == 0;
   }

   function isInteger(x) {
     return (x^0) === x;
   }

   function isInteger(x) {
     return Math.round(x)  === x;
   }

   function isInteger(x) {
     return parseInt(x, 10) === x;
   }
   最后parseInt的方法不是很好，一旦x取值相当大的时候，就会有问题，因为parseInt在解析数字之前强制其第一个参数到字符串，因此一旦数目变得很大，它的字符串就会表达为指数形式，例如：1e+20。因此，parseInt函数就会去解析le+21,但当到达e字符串的时候，就会停止解析，因此只会返回值1.

   8. WebWorker 更宏观意义上的并行机制，可以让js代码在另一个线程中执行，并且和主线程（UI 线程）互不影响，两个彼此独立。webWorker是宿主环境提供的一种并行机制，和js语音本身无关系
      8.1 woker中没有window. 在webworker中打印window,ReferenceError
      8.2 在worker文件中直接调用postMessage发送消息，就是发送给主线程的, 直接写onmessage来监听消息， 主线程中可以使用new Worker返回的worker句柄来监听worker发送的消息并且发送给new出来的消息
      main.js  var myworker = new Worker('./webworker.js', {name:'myworker'} );
        myworker.addEventListener('message', function(e) {
          console.log('main thred accept message\n', e);
        }, false);

        myworker.postMessage("hello my child worker");
      worker.js: 
        postMessage("I m working before postmessage");

        onmessage = function(e) {
          console.log('accept main thread message\n', e);
        }

      8.3 worker无法操作dom，如果想要操作dom, 那么应该发消息给主线程去操作
      8.4 worker涉及到和主线程的通信，通信就意味着数据传递，现在的数据传递就是结构化克隆方式，带来内存上的损失。

    9. 理解node类型；nodeType, nodeName, nodeValue
       nodeType:表示dom树上节点的类型，比如document.getElementById('#id').nodeTpye => 1, 表示元素或者文档类型
                                       document.getElementById('#id').getAttributeNode('class').nodeTpye => 2, 表示属性节点
                                       document.getElementById('#id').firstChild.nodeType => 3, 表示文本节点

       nodeName: 表示dom树上节点类型的值，
                 document.nodeName => '#document'
                 document.getElementById('#id').nodeName => 'DIV| SPAN'。就是这个标签的名字，大写的
                 document.getElementById('#id').getAttributeNode('id').nodeName => 属性的名字，比如就返回'id'
                 文本节点的nodeName返回的是“#test”
      nodeValue: 表示name对应的值，document和元素的value都是null, 属性的就是id或class等属性名称对应的名称, 文本节点就是其文本值
    10.节流和防抖
        节流和防抖都是为了限制函数的执行频次，以优化函数触发频率过高导致的响应速度跟不上触发频率，出现延迟、假死、或卡顿
        防抖：触发高频事件后n秒只会执行一次, 如果n秒内高频事件再次被触发，则重新计算时间。
        function debounce(fn) {
          var timer = null;
          return function() {
            clearTimeout(timer);
            timer = setTimeout(()=> {
              fn.apply(this, arguments);
            });
          }
        }

        节流：规定在一个单位时间内，只能执行一次，到设定的时间就执行一次，如果到时间就会执行一次，不像防抖那样，不管怎么样都是为了解决高频率点击事件
        function throttle(fn) {
          var cantrue = true;
          return function() {
            if (!cantrue) return;
            setTimeout(function(){
              fn.apply(this, arguments);
              cantrue = false
            }, 500);
          }
        }

        区别就是实现方式不一样，角度考虑不一样，防抖就是定时器，如果在定时器范围内，一直触发高频率事件，那么callback可能永远不会执行，节流就不一样了，时间一到就执行

      11. js的异步解决方案
          generator, async。为什么要引入async. generator哪里不好
          async解决了什么问题，说是generator和promise的语法糖封装，实现了类似co的功能


      12. async和defer的区别
          async的脚本会在另一个线程去加载，加载的时候不阻止文档解析，加载完就立即执行，执行的时候阻止文档解析。
          defer的脚本也会在另一个线程去加载，加载完不会立即执行，当文档准备完毕之后，domcontentloaded触发之后，再执行


        

        
        
