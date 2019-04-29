// 1. 权限管理的描述
/**
 * 后台的功能需要查询投资人的回款信息，并且设置一些补刀账户的额度，标的的额度设置等信息。后续还再继承APP配置，后台配置等功能，需要一个权限管理，对运营，产品，测试，开发，外包等进行操作管理权限的设置。
 * 1.设计思路：
 *    以用户作为主体, 用户是主体，用户访问页面，用户执行页面上的某个操作，可以把页面，操作当作用户的操作对象，即设计用户模块（创建一个页面，并有一个权限树，选择该用户应该对应的权限）， 页面模块（包含一级页面，二级页面（可以编辑页面的url, 菜单id, 菜单之间的级联关系，在创建菜单的时候，会弹出菜单树，选择在哪个菜单下面创建））， 按钮管理（页面上的具体操作，同样增加功能的时候选择在哪个页面，无非就是增删改查）
 *    添加完菜单和接口后，创建用户的时候，选择某个具体的权限给到这个用户即可。
 * 
 * 2.设计思路
 *    用户是有身份的，身份对应权限，然后在上面的基础上增加了一层角色管理。创建用户的时候列出所有的角色，可以给该用户添加多个角色，创建角色的时候给该角色增加权限。
 *    但这个有个问题，比如都是运营，那么不同的运营有不同的权限，这个时候怎么办？这个可能细化到某个运营只有个别接口的权限，那么对角色再细化一层，对所有的接口归位增删改查四大类，配以不同的权重，1，代表增加 2.代表删除，3，代表查询，4.修改，对改角色配以不同的权重，对于再细的只有这一个接口有权限，那只能增加角色了
 * 
 * 开发
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 3.作为一个测试人员，你觉得需要具备哪些技能
 *  测试我认为主要分为业务测试，功能测试。这两种类型测试
 * 
 * 
 * 4，软件哪些会被认为存在缺陷
 *    软件未实现产品说明书要求的功能
 *    软件未实现产品说明书虽未明确提及但应该实现的目标（这个可能需要和产品沟通，和开发沟通协商，完善产品功能，比如，登录验证码，需要用户手动输入验证码，这个时候应该要实现自动填充功能）
 *    软件实现了产品功能，但存在难以理解，难以使用的功能，这个体现的是用户体验，这个是和bug一样的重要
 *    软件实现了产品说明书未提到的功能，每次迭代都要事先明确本次迭代功能点
 *    软件实现了功能，逻辑也都ok， 但是性能不好，导致用户电量损耗过快，或者是无网情况下
      当然，可能还有一些不是非常特别紧急的，需要先提出来，本次业务迭代完，把这些划到下个迭代中

      软件测试的最终目的：提升产品的可用性，包括无bug 和用户体验好。在提交给用户使用前，尽可能多的找到产品存在的缺陷和使用问题，规避风险。


  5.测试的标准
    所有测试的标准都是建立在用户需求之上
    严格执行


  6. app的性能测试， 需要重点关注哪些方面
    内存、cpu占用、耗电量、流量、流畅度（比如做的视频，在用户未点击播放的时候，是否在一直加载视频）

  7. app测试和web测试有什么区别
     从测试流程上来说，是没有区别的。
     都需要经历测试计划方案，用例设计，测试执行，缺陷管理，测试报告，等
     从技术上大类上：包括功能测试，性能测试，安全测试，ui测试
     区别主要体现在一些细节上：
    web端测的是浏览器的兼容性， app端测的包括webview兼容性和机型，系统的兼容性。（测试主流手机）
    安装测试：交叉事件测试，操作类型测试，网络测试（网络切换，弱网）
    交叉事件测试：在操作软件的时候，来电话，来短信，电量不足等外部事件
    操作类型测试：横竖屏切换，手势测试
    升级测试：升级提醒，强升，建议升级，取消升级会不会影响原有功能，升级后用户数据是否被清除


      app端还需要测的push推送测试：在开关机、待机状态下执行推送，消息的变化和跳转的正确性。包括app在后台运行、杀掉进程后的推送
      触屏测试：同时触摸不同位置或者同时进行不同操作，查看是否会crash
  
      
      8. app crash原因有哪些
       1.内存管理错误：内存泄露，程序运行时间过长，内存耗尽，导致crash
       2.程序逻辑错误，比如数组越界，空指针等。这个导致的crash比较常见
       3.设备兼容性，webview的兼容性会导致一些问题
       4.网络因素：网速不好，无法达到app所需的快速响应时间
  9.给你一个app,你会从哪些方面测试
    1. 安装、卸载测试。是否能够正常运行
    2.UI测试。正常的交互功能和用户体验，测试更应该站在用户的角度上去体验
    3.功能测试：
      升级、操作类型、交叉事件、推送、网络环境，前后台切换，免登录等
    4.兼容性测试
      主流手机，操作系统兼容性，分辨率等

    5.客户端性能测试
      重点关注cpu, 内存，耗电量，流量
    6. 安全测试
      软件权限，数据安全性，通讯安全性co

 */


/**
 * 1. 防抖，节流。闭包
 *  节流是若干时间内只执行一次。借助setTimeout和一个标记位。核心就是这两个。标记为
 *   function throttle(fn) {
 *     var cantrue = true;
 *     if(!cantrue) reutrn;
 *     return function() {
 *        setTimeout(()=>{
 *         cantrue = true;
 *         fn.apply(this,argument);
 *       }, 100) // 100ms内执行了
 *     }
 *   }
 * 
 * // 防抖也是利用settimtout，用这个做缓存迟，指定事件内多次.重置定时器，在指定时间内触发，清楚上一次的定时器，重新开始计时
 *  function debounce(fn) {
 *   var timer = null;
 *   return function() {
 *     clearTimeout(timer);
 *     timer = setTimeout(function(){
 *       fn.applu(this, argument);
 *     },500)
 *   }
 *  }
 * 
 * 2. 图片懒加载
 * 
 * 
 * 3.手动封装网络请求库
 *  
 * 
 * 
 * 
 * 4.手动书写bind
 * 
   <script>
   var name = 'window';
   var obj = {
     name: 'obj'
   };
   Function.prototype.newBind = function (target) {
     var self = this;
     var args = [].slice.call(arguments, 1);// 截取newbind传递过来的参数
     var temp = function(){};
     function F() {
       var _args = [].slice.call(arguments, 0);
       self.apply(this instanceof temp? this:target, args.concat(_args));
     }
     temp.prototype = this.prototype;
     F.prototype = new temp();
     return F;
   }

   function show() {
     console.log(this);
     console.log(this.name);
   }

   // show();
   var aa = show.bind(obj);
   new aa();


   var newshow = show.newBind(obj);
   // newshow();

   // console.log(newshow.prototype.constructor);
   console.log(new newshow())

 </script>
 * 
 * 
 * 
 * 
 * 5.手动书写快速排序
 *   
 * function quickSort(arr) {
     if (arr.length < 2) {return arr}
      var left = 0;
      var right = arr.length - 1;
      while(left < right) {
        while(arr[right] >= arr[0] && left < right) {
          right = right - 1;
        }
        while(arr[left] <= arr[0] && left < right) {
          left++;
        }

        if (right == left) {
          let mid = arr[right];
          arr[right] = arr[0];
          arr[0] = mid;
          break;
        }

        let tem = arr[right];
        arr[right] = arr[left];
        arr[left] = tem;
      }
     return quickSort(arr.slice(0,left)).concat(arr.slice(left,right+1)).concat(quickSort(arr.slice(right+1)));
   }
   var arr = [5,7,2,9,3,8,4,7,1];
   const arr1 = quickSort(arr);
 * 
 * 
 * 
 * 6.手动书写es5的继承 :圣杯模式
   var inherits = (function() {
     var temp = function(){}
     return function(target, source) {
         temp.prototype = source.prototype;
         target.prototype = new temp();
         target.prototype.constructor = target;
     }
   })();

     function child() {
       parent.apply(this, arguments);
     }

     function parent() {
       this.name = 'common';
     }

     parent.prototype.show = function() {
       console.log('show');
     }
     inherits(child, parent);

     var ch1 = new child();
     ch1.show();
 * 
 * 
 * 7. koa context原理。
 *    在每次请求的时候都会创建一个执行上下文。并且在上下文上挂载了扩展的request, resopnse。另外，通过代理在ctx上挂载了一些request, reponse的方法和属性。
 * 在后续的业务逻辑处理过程中就可以直接使用ctx.body, ctx.query, ctx.lastmodified, ctx.header等。contenxt通过apply代理里request, reponse方法。并且借助
 * __defineSetter__和__defineGetter__在ctx设置了属性的get和set方法。所以在后面的请求中直接可以使用了
 * 
 * 8. koa的中间件执行过程
 *   这个跟koa的启动过程有关系。首先通过use 注册中间件，koa对象封装了listen方法，在这个方法中创建server, 并给server传入callback(把注册的中间件串联起来， 借助async和递归实现中间件的顺序执行，当中间件执行完后返回Promise.resolve的对象，在then方法
 *   中处理响应。这个时候获取ctx上的body值，通过ctx.res.end(ctx.body)直接返回)。
 *   所以关于注册进去的多个中间件的处理和执行都在callback中。
 *   callback: 接受两个参数，req, res.
 *   创建context.---> 在context上挂载response, request,app,当前koa对象
 *   通过递归和next函数实现中间件按照注册顺序执行。
 *   执行完所有的中间件后，返回resolve的Promise对象， 调用then方法，在then方法中执行response
 * 
 * 9. 实现一个eventEmitter
 *   
 * 
 * 
 * 
 * 
 * 10. 手动实现一个深拷贝
 *   function isType(variable) {
     return typeof variable === 'object' ? Object.prototype.toString.call(variable).slice(8, -1) : typeof variable;
   }

   function deepclone(target, source) {
     if ( !isType(source) === 'Object' && isType(source) === 'Array') {
       return target;
     }
     if (!isType(target) === 'Object' && isType(target) === 'Array') {
       target = {}
     }

     for (var item in source) {
       let des = target[item];
       let src = source[item];
       if (isType(src) === 'Object') {
         des = des ? des : {};
         target[item] =  deepclone(des, src);
       }
       else if (isType(src) === 'Array') {
         des = des ? des : [];
         target[item] = deepclone(des, src);
       } else {
         target[item] = source[item];
       }
     }
     return target;
   }
 * 
 * 
 * 11. js的隐式类型转换
 *   [] == false ==> 分析：要比较两个数，首先要通过隐式转换成数字，[]转成数字要调用valueOf.toString, 再通过Number('') ==>0, Number(false) ==0
 *   所以相等
 *   []==> Boolean([]) ==> true, 因为是显示类型转换。上面是编译器进行的隐式类型转换
 *   {} == false  ==> {} 不相登。 因为{}.valueOf() ==>返回的是{}.toString的话是'object object', 再进行Number转换不为0.数组的toString转换成了''
 *   
 * 
 *   
 * 12. 合并两个有序链表
 *   function ListNode(val) {
       this.val = val;
       this.next = null;
     }

     var mergeTwoLists = function(l1, l2) {
       if (l1 == null) {
         return l2;
       }
       if (l2 == null) {
         return l1;
       }
       var head = new ListNode(0);
       var curr = head;
       var p1 = l1, p2 = l2;
       while(p1 != null && p2 != null) {
         if (p1.val < p2.val) {
           curr = new ListNode(p1.val);
           curr = curr.next;
           p1 = p1.next;

         } else if (p1.val > p2.val) {
           curr = new ListNode(p2.val);
           curr = curr.next;
           p2 = p2.next;
         } else {
           // 相等的情况
           curr = new ListNode(p1.val);
           curr = curr.next;
           curr = new ListNode(p2.val);
           curr = curr.next;
           p1 = p1.next;
           p2 = p2.next;
         }
       }
       if (p1!== null) {
         curr.next = p1;
       }

       if (p2!== null) {
         curr.next = p2;
       }
     }

     13. 反转链表
       function ListNode(val) {
         this.val = val;
         this.next = null;
       }

       var reverseList = function(head) {
         if (head == null) {
           return head;
         }
         var curr = new ListNode(head.val);
         while(head.next != null) {
           var newNode = new ListNode(head.next.val);
           newNode.next = curr;
           curr = newNode;
           head = head.next;
         }
         return curr;
       }
     
     14. 在nlogn时间复杂度和常数级空间复杂度下，对链表进行排序
         这个把链表转换成数组。借助快速排序，排序完再转换为链表
     
     15. 最小栈
       var MinStack = function () {
         this.cache = [];
         this.minCache = [];
       };

       /** 
        * @param {number} x
        * @return {void}
        */
// MinStack.prototype.push = function (x) {
//   if (x !== 0 &&!Boolean(x)) {
//     return;
//   }
//   this.cache.unshift(x); // 放入栈顶
//   if (this.minCache.length == 0 || this.minCache[0] > x) {
//     this.minCache.unshift(x);
//   }

// };

// /**
//  * @return {void}
//  */
// MinStack.prototype.pop = function () {
//   var ele = this.cache.shift(); // 取出栈顶元素
//   if (ele == this.minCache[0]) {
//     this.minCache.shift();
//   }
// };

// /**
//  * @return {number}
//  */
// MinStack.prototype.top = function () {
//   return this.cache[0]; // 返回栈顶元素
// };

// /**
//  * @return {number} o(n)的时间复杂度
//  */
// MinStack.prototype.getMin = function () {
//   return this.minCache[0];
// };




// 16. 实现观察者模式
// 观察者模式定义了对象之间的一对多依赖，当一个对象改变状态的时候，所有依赖这个对象的都会受到通知并进行更新

var Event = (function () {
  var list = [];

  /**
   * 
   * @param {*} key :注册的消息类型
   * @param {*} fn ：某一个消息类型的回调
   */
  var listen = function (key, fn) {
    if (!list[key]) {
      list[key] = [];
    }
    list[key].push(fn);
  };

  /** 
   * 发布消息
   * 如果招不到对应消息类型的回调，则直接返回
   * 找到则按照注册顺序执行对应回调
  */
  var trigger = function () {
    var key = Array.prototype.shift.call(arguments);
    var fns = list[key];
    if (!fns || fns.length == 0) {
      return;
    }
    for (var i = 0; i < fns.length; i++) {
      fns[i].apply(this, arguments);
    }
  }

  /**
   * 
   * @param {*} key : 注销订阅者的类型
   * @param {*} fn ：注销对应的回调
   */
  var remove = function (key, fn) {
    var fns = list[key];
    // 没找到注册的对应回调
    if (!fns || fns.length == 0) {
      return;
    }

    if (!fn) {
      fns.length = 0; // 如果没有指明注销哪个回调，则全部注销掉
      return;
    }

    for (var i = 0; i < fns.length; i++) {
      var fnd = fns[i];
      if (fnd == fn) {
        fns.splice(i, 1);
      }
    }

  }

  return {
    listen,
    trigger,
    remove
  }
})()

Event.listen('red', function (size) {
  console.log('小红的size', size);
});

Event.listen('black', function (size) {
  console.log('小黑的size', size);
});

Event.trigger('red', 12);
Event.trigger('black', 32);


// 另外一种借助于es6的 proxy和Reflect来实现
var newlist = [];
var obj = {
  name: 'byte',
  age: 12
};
var newObj = new Proxy(obj, {set}); // 返回目标对象的代理，拦截原目标对象的方法，然后注入订阅逻辑

var observe = fn => newlist.push(fn);
var notice = (...args) => {
  for (var i = 0; i< newlist.length; i++) {
    newlist[i](...args);
  }
}
observe((size) => {
  console.log('收到消息',size);
})


// 比如拦截newObj的set方法
function set(target, key, value) {
  Reflect.set(target, key, value);
  // 注入订阅
  notice(12);
}

newObj.age = 8;


// 17. 实现单例模式
function  SingalInstance(name) {
  this.name = name;
}

SingalInstance.prototype.getName = function () {
  return this.name;
}

var getSingalInstance = (function () {
    var instance = null;
    return function (name) {
      if (!instance) {
        instance = new SingalInstance(name);
      }
      return instance;
    }
})()

var a = getSingalInstance("zll");
var b = getSingalInstance('chumo');

// 工厂模式
// 宝马车
function BMW(color, kinds) {
  this.color = color;
  this.kinds = kinds
}
// 奔驰车
function BEN(color, kinds, place) {
  this.color = color;
  this.kinds = kinds;
  this.place = place;
}

// 奥迪车
function AODI(color, kinds) {
  this.color = color;
  this.kinds = kinds;
}

AODI.prototype.getCar = function() {
  return {
    desc: 'this is' + this.color +'and' + this.kinds + '系列'
  }
}

BMW.prototype.getCar = function() {
  return {
    desc: 'this is baoma' + '  ' +   this.color + '  ' +  'and' + '  ' + this.kinds + '系列'
  }
}

BEN.prototype.getCar = function() {
  return {
    desc: 'this is benchi' + '  ' +  this.color +'and' + this.kinds + '系列'
  }
}

function Factory(type) {
  var carType = {
    'BMW': () => BMW,
    'BEN': () => BEN,
    'AODI':() => AODI,
  }
  return carType[type]();
}
var BAOMAObj = new Factory('BMW');
var BENCHIObj = new Factory('BEN');
var AODIObj = new Factory('AODI');
var baoma1 = new BAOMAObj('black','3');
var baoma2 = new BAOMAObj('red', '5');
var baoma3 = new BAOMAObj('orange', '7');
var benchi1 = new BENCHIObj('black', 'c200');
var benchi2 = new BENCHIObj('red', 'c300');
var benchi3 = new BENCHIObj('orange', 'c400');
var aodi1 = new AODIObj('black', 'q3');
var aodi2 = new AODIObj('orange', 'q5');
var aodi3 = new AODI('red', 'q7');

console.log(baoma1.getCar())
console.log(baoma2.getCar())
console.log(baoma3.getCar())
console.log(benchi1.getCar())
console.log(benchi2.getCar());
console.log(benchi3.getCar());
console.log(aodi1.getCar());
console.log(aodi2.getCar())
console.log(aodi3.getCar())


// 18. 实现redux的操作


// 19.清除浮动
  // 19.1 浮动会带来两种后果： 影响兄弟元素（clear:both,空白div）。 或者造成父容器高度塌陷（overflow:hidden, ::after）
