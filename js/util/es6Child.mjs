import Parent from './es6Parent';

  /** 
   * 更符合
  */
 class Child extends Parent {
  constructor(x,y) {
    super(x,y) // 此时的super相当于一个函数，这里执行的是函数调用,实质调用的是Child.prototype.constructor.call(this) == Parent.prototype.constructor
    this.z = 4;
    super.w = 6;
    
  }

  show() {
    super.show(); //这里的super是一个对象。可以调用show, Parent.prototype.show.call(this)。所以在class里的东西都是挂载在child的原型对象上的，可以通过原型链的方式实现继承
  }
}

export default Child;
