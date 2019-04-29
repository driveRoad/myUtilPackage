// es6中新增加的方法
// 1. 实现迭代器的类数组对象，或者对象，都可以使用扩展运算符或者Array.from转换成数组
var a = {
  name:'zll',
  age:12,
  length:2,
  *[Symbol.iterator]() {
    let i = 0;
    let num= 5;
    while(i < num) {
      yield i++;
    }
  }
}
console.log([...a]);// 输出了0,1,2,3,4; 但当没有iterator的时候，扩展运算符则不能转了，会报错
console.log(Array.from(a)); // 输出了0,1,2,3,4,如果去调Symbol.iterator，则返回[undefined, undefined],

var b = {
  name:'zll',
  age:12,
  length:2,
  *[Symbol.iterator]() {
    for(let k of Object.keys(this)) {
      yield k;
    }
  }
}

console.log([...b]);// 输出了['name', 'age']


// 为什么es5的apply可以实现数组的push
// Array.prototype.push.apply(arr1, arr2); === arr1.concat(arr2) === [...arr1, ...arr2], [arr1,arr2].split('').join('')

// Array.prototype.slice.call(arrayLike);// 实现类数组转换为数组