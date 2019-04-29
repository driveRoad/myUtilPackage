const a = 1;
let arr = [1,2,3];

var babel = require('@babel/core');

var es6Code = 'let x = n => n + 1';

var es5Code = require('@babel/core')
   .transform(es6Code, {presets:['@babel/env']})
   .code;
console.log(es5Code);
