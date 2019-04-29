/**
 * valueOf主要用于运算，也就是说涉及到运算的时候，调用对象的valueOf，拿到元值，相当于java的拆包
 * toString主要用来展示，比如输出对象的时候，需要转换成字符串展示
 */
var a = {
  age: 12,
  valueOf: function() {
    return 14;
  },
  toString: function() {
    return 'age';
  }
}

String(a)  ==> toString;
+a  => valueOf
'' + a => valueOf
a > 15 =>  valueOf