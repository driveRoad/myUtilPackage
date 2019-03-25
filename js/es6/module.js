// 探讨模块化的东西

// 1. 打印出这两个变量
// console.log(exports);
// console.log(module.exports);

// 打印出的内容： {} , {}

// 2. exports的改变会导致module.exports的改变吗

// module.exports.display = function() {

// }

// exports.show = function() {

// }

// function aa() {

// }
// exports.default = aa;

// console.log(exports);

// const exports = module.exports;

// 打印的内容exports和module.exports内容一样

// module.exports = {
//   foo: function() {

//   }
// }

// exports.show = function() {

// }

//  require后最后打印出的内容为{ foo: [Function: foo] }

// exports = {
//   display: function() {

//   }
// }

// module.exports.show = function() {

// }

// require后打印得到的内容是module.exports中的{ show: [Function] }


/**
 * 总结：exports指向了module.exports,所以当module.exports改变了指针放心,exports的内容无论怎么改变，require的内容都是module.exports的内容
 * exports指向了module.exports,就算使用exports,没用使用module.exports,最后依然转换为module.exports
 */
