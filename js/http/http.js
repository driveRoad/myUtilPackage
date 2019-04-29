function step(n) { if (n == 1) return 1; if (n == 2) return 2; return step(n - 1) + step(n - 2) }


function step1(n, flag1, flag2) {
  if (n <= 2 ) {
    return flag2;
  }
  return step1(n-1, flag2, flag1 + flag2);
}

var set = new Set(['I', 'have', 'a','book', 'good']);
function isInclude(str) {
  var arr = str.split(' ');
  for (let item of arr) {
    if (!set.has(item)) {
      return false;
    }
  }
  return true;
}

// 手动封装网络请求库
var httpRequest = (function() {
  // 获取参数
   function httpRequest(options) {
      var defaultOptions = {
        url: '',
        type: 'post',
        contentType: 'application/x-www-form-urlencode',
        success:()=>{},
        fail:()=> {}
      };
      Object.assign(defaultOptions, options);

      // 原型上添加方法
      Object.assign(httpRequest.prototype, {

      });


   }



})(window);