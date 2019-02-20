/**
 * 主要探讨Object的一些常用方法和一些方法的用处及区别
 * 1.探讨对象的深拷贝的方法及区别、
 * 2.对象的一些常用方法的探讨
 */

 
/**
 * 1.通过JSON.parse和 JSON.stringify实现
 * 2.通过递归自己实现深拷贝
 */
var a = {name: 'dog'};
var b = JSON.parse(JSON.stringify(a));

a.name = 'cat';
// console.log(b.name) ===>  dog， 此方法会共用同一个原型,改变其中的一个的原型，另一个的原型也改变了，共用一个原型，还不是完全的深拷贝
//另外，JSON.stringify本身有自己的局限性
/**
 * JSON.stringify会把数字，空对象、null、数组、boolean、字符串、对象序列化为一个字符串，但在某些情况下会忽略入参
 * JSON.stringify({})  ===> "{}"
 * JSON.stringify(null)   ===> "null"
 * JSON.stringify(true)  ===> "true"
 * JSON.stringify(2)    ===> "2"
 * JSON.stringify(undefined)  => undefined
 * JSON.stringify({x:2})  ==> "{"x":2}"
 * 
 * //下面这些问题会导致JSON.stringify解决深度拷贝不是很完美
 * JSON.stringify({x:undefined}) ===> "{}"
 * JSON.stringify({x: Object})  ===> "{}"
 * JSON.stringify({x:Symbol()})  ===> "{}"
 * JSON.stringify({get: function(){return 2}})  ===> "{}"
 * 
 * 还有两个参数的问题，比如JSON.stringify([1,2,3],[4,5,6])  ==> "[1,2,3]"
 * 
 */





 //2.  通过Object.assign()，这个是浅拷贝，共用一个原型

 /**
  * var a = {name: 'dog'};var b = Object.assign(a);
  * b.name = 'cat';  ==> a.name: dog
  * 
  * var a = {people: {name:'dog'}}; var b = Object.assign(a);
  * b.people.name='cat'; a 的name: cat了，所以这个方法实现的是浅拷贝
  */


//3. Object.create;  这个是返回一个空对象，空对像的原型和参数的原型一样

 

/**
 * 4.js继承方式
 *  4.1 构造函数继承： 使用call和 apply实现
 *      优点：简单明了，直接继承超类构造函数的属性和方法
 *      缺点：无法继承原型链上的属性和方法
 * 
 *  4.2 原型链继承
 *      function super() {}
 *      function sub(){}
 *      sub.prototype = super.prototype  肯定不能这样写，如果sub的原型加了新的内容，那么super的原型也会增加，所以增加一个中间变量
 *      funtion temp() {}
 *      temp.prototype = super.prototype
 *      sub.prototype = new temp();
 *      sub.prototype.constructor = sub;
 *  4.3 拷贝继承
 *      通过for in循环，把父类的属性拷贝到子类的属性中，缺点是对于父类中不可枚举的数据无法遍历到
 */ 
  


/**
 * Object.freeze()
 * 引用链接： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * 这个文档可介绍该方法的具体用法
 */

 