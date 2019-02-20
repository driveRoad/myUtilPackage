/**
 *  bind的实现
 * 1. 返回一个函数
 * 2.改变this指针方向
 * 3.返回的函数的原型和原函数的原型内容一样，但是改变原函数的原型不会影响返回的函数的原型
 * 4.保存传入的参数，在需要执行的时候获取到这些参数（通过闭包实现）
 * bind就是利用call和apply及闭包实现的，圣杯模式，新的函数的原型不能影响原来函数的原型
 */

 var obj = {
   name:'obj',
   age:'10'
 }

 window.name='window'
 window.age=100;

 function show(school) {
   //在遇到new 的时候，在show中新建一个对象，var this = {}
    console.log(this.name);
    console.log(this.age);
    console.log(school);
 }

//默认函数内的this指向window,这个时候如果需要想改变this指针方向，需要使用bind

/**
 * 
 * @param {*} target 
 * target: this最终的指向
 */
Function.prototype.newBind = function(target) {

  target = target || window;

  var self = this; //这里的this指向调用newBind的对象,因为最终都要调用原始对象

  var args = [].slice.call(arguments,1);//拿到传给函数的所有参数

  var temp = function(){}

  temp.prototype = this.prototype;
  
  var F = function() {
    var _arg = [].slice.call(arguments,);
    //如果是new的，则这里的this就是show
    return self.apply(this instanceof temp ? this: target,args.concat(_arg)); //通过闭包拿到保存的形式参数
  }
  F.prototype = new temp();
  return F;
}


// show("qinghua");

var newshow = show.newBind(obj,"beijing");



