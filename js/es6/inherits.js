// es5, es6的继承
/**
 * 在es5时代，其实不管是在es5还是es6时代，都是通过原型链的方式实现的继承
 */
function Super() {
  this.name = 'super';
}

Super.prototype.show = function () {
  console.log(this.name);
}

function Child() {
  // this.name = 'child';
}

Child.prototype = new Super();

// 通过原型链的方式实现了继承，后面的子对象都可以调用父对象的属性或者方法
var child1 = new Child();
var child2 = new Child();
// child1.show();
child2.name = 'newsuper';
// child1.show();

// 总结，这种通过原型链实现属性的继承存在大的问题，即所有的子对象实例都继承自同一个属性的引用，并不是拷贝的，所以任何一个实例改动这个属性都会影响其它对象。
// 同时，没办法给父亲传参

// 为了解决上面的问题，采用组合继承，即方法采用原型链的方式继承，属性采用apply方法继承，实际就是改版this指针方向

function Super1(...superparam) {
  console.log(superparam[2])
  this.name = 'super';
}

Super1.prototype.show = function () {
  console.log(this.name);
}

function Sub1(...param) {
  Super1.apply(this, param);
}
Sub1.prototype = new Super1();

var sub1 = new Sub1('a', 'b', 'c');
sub1.show();
var sub2 = new Sub1();
sub2.name = 'newparent';
sub2.show();


// 这个时候就不会有影响了,解决了上面说的两个问题

// 但又有一个新问题
// Sub1.prototype.constructor === Super1, 正常应该是指向Sub1

// 所以在上面的步骤后再加一步
// Sub1.prototype.constructor = Sub1;
console.log('************************');
function Super2() {
  this.name = 'Super2';
}
Super2.prototype.show = function(){
  console.log(this.name);
}

function Sub2() {

}
Sub2.__proto__ = new Super2;
Sub2.prototype.__proto__ = Super2.prototype; // es6的属性继承

var sub2 = new Sub2();
sub2.show(); //show里的this指向sub2, Sub2里又没有name

var sub22 = new Sub2();
sub22.name = 'new Super2';
sub22.show();




/**
 * es6的继承， 对于一个class， 生成一个_createClass函数，这个函数返回一个函数,里面实现了通过Object.defineProperty(B.prototype,' key', 'descriptor'),
 * 也就是通过Object.defineProperty来函数的挂载，在class内部定义的函数都挂载到原型上了
 */

//  extends是通过inherits来实现的。
subclass.prototype.__proto__ = superClass.prototype; //实现了方法的继承
// // 再通过
Object.setPrototypeOf(subclass, superClass) ==> subClass.__proto__ = superClass;


var _createClass = function () { 
    function defineProperties(target, props) { 
      for (var i = 0; i < props.length; i++) { 
        var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; 
        descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; 
        Object.defineProperty(target, descriptor.key, descriptor); 
      } 
    } 
    return function (Constructor, protoProps, staticProps) { 
      if (protoProps) 
        defineProperties(Constructor.prototype, protoProps); 
          if (staticProps) 
            defineProperties(Constructor, staticProps); 
              return Constructor; 
    }; 
  }();




  function _inherits(subClass, superClass) { 
    if (typeof superClass !== "function" && superClass !== null) { 
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); 
    } 
    subClass.prototype = Object.create(superClass && superClass.prototype, { 
        constructor: { 
          value: subClass, 
          enumerable: false, 
          writable: true, 
          configurable: true 
        } 
      }); 
    if (superClass) 
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; 
    }


    return _possibleConstructorReturn(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this));


    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
