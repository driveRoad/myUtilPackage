// // 手动封装http请求库

// Object.extend =function(targetObj,fnJson){
//   //扩展方法，类似于jQuery的$.extend,可以扩展类的方法，也可以合并对象
//   for(var fnName in fnJson){
//       targetObj[fnName]=fnJson[fnName];
//   }
//   return targetObj;
// };



// var HttpAjax = (function(){
//   function HttpAjax(options) {
//     var settings = {
//       type:'post',
//       dataType: '',// 接收的请求类型:accept
//       contentType: '',// 发送的请求头content-type
//       url: '',
//       data: '', //发送的数据
//       success: function(){},
//       fail:function(){}
//     };

//     this.options =  Object.assign(settings, options);

//     Object.extend(HttpAjax.prototype , {
//       _init() {
//         // 初始化异步请求对象
//         if (this.options.url == '') return;
//         this.xhr = this._createXhr();
//         this._regCallback(this.xhr);
//         if (this.options.type.toLowerCase() === 'post') {
//           this._post(this.xhr);
//         } else {
//           this._get(this.xhr);
//         }
//       },


//       _post(xhr) {
//         xhr.open('post', this.options.url, true);
//         xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
//         xhr.send(this._encodeData(this.options.data));
//       },

//       _get(xhr) {
//         var data = this._encodeData(this.options.data);
//         var url = this.options.url + '?' + data;
//         xhr.open('get', url, true);
//         xhr.send(null);
//       },

//       // 创建异步请求对象
//       _createXhr() {
//         if (typeof XMLHttpRequest !== 'undefined') {
//           return new XMLHttpRequest();
//         } else if (typeof ActiveXObject !== 'undefined') {
//           return new ActiveXObject();
//         } else {
//           throw new Error('您的浏览器版本太低');
//         }
//       },

//       // 数据编码，转换成age=12&name=zll
//       _encodeData(paramerts) {
//         var data = [];
//         for (var name in paramerts) {
//           var value = paramerts[name].toString();
//           data.push(`${name}=${value}`);
//         }
//         return data.join('&');
//       },

//       // 注册回调
//       _regCallback(xhr) {
//         var _this = this;
//         xhr.onreadystatechange = function() {
          
//           if (xhr.readyState === 4) {
//             if (xhr.status >=200 && xhr.status < 300 || xhr.status == 300) {
//               _this.options.success(_this._getResponseData(xhr), xhr.statusText);
//             } else {
//               console.log(xhr.status);
//               _this.options.fail(xhr.status, xhr.statusText);
//             }
//           }
//         }
//       },

//       // 获取返回数据
//       _getResponseData(xhr) {
//         var responseType = xhr.getResponseHeader("Content-Type");
//         switch(responseType) {
//           case 'text/html': 
//             return xhr.responseXML;
//           case "text/json":
//           case 'text/javascript':
//           case 'application/javascript':
//             return eval('(' + xhr.responseText + ')');
//           default:
//             return xhr.responseText;
//         }
//       }
//     });
//     this._init(this.options);
//   }  
//   return HttpAjax;
// })(window)

// var options = {
//   url:'http://127.0.0.1:8080/api/v4/hello',
//   type:'post',
//   data: {
//     name:'zll',
//     pwd:'12'
//   },
//   success: function(data, text) {
//     console.log(data, text);
//   },
//   fail: function(data) {
//     console.log(data)
//   }
// }
// var ajax = new HttpAjax(options);




// 初始化参数， 创建xmlHttpRequest对象； 监听onreadystatechange事件，接收数据。 

var HttpAjax = (function(){
  function HttpAjax(options) {

    var defaultOptions = {
      url: '',
      type:'get',
      contentType: 'application/x-www-form-urlencoded',
      // dataType:'*', //默认接手所有数据格式
      data: '', // 传输的数据
      success: function() {

      },
      fail: function() {

      }
    }
    this.options =  Object.assign(defaultOptions, options); // 跟新参数

    Object.assign(HttpAjax.prototype, {
      _init() {
        var xhr = this._createXhr();
        this._registerCb(xhr);
        if (this.options.type.toLowerCase() === 'post') {
          this._post(xhr);
        } else {
          this._get(xhr);
        }
      },
      _createXhr() {
        if (typeof XMLHttpRequest !== 'undefined') {
          return new XMLHttpRequest();
        } else if (typeof ActiveXObject !== 'undefined') {
          return new ActiveXObject();
        } else {
          throw new Error('浏览器版本太低，请升级');
        }
      },
      // 注册回调，监听onreadystatechange事件
      _registerCb(xhr) {
        var _this = this;
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status > 200 && xhr.status < 300) {
              _this.options.success(_this._getResponseData(xhr));
            } else {
              _this.options.fail(_this._getResponseData(xhr));
            }
          }
        }
      },

      _getResponseData(xhr) {
        var resContentType = xhr.getResponseHeader('Content-Type');
        switch(resContentType) {
          case 'text/html':
            return xhr.responseXML;
          case 'text/javascript':
            return eval('(' + xhr.responseText + ')');
          default:
            return xhr.responseText;
        }
      },

      _post(xhr) {
        xhr.open('post',this.options.url, true);
        xhr.setRequestHeader('content-type',this.options.contentType);
        // xhr.setRequestHeader('type', this.options.dataType);
        xhr.send(this._encodeData(this.options.data));
      },
      _get(xhr) {
        var newurl = this.options.url + '?' + this._encodeData(this.options.data);
        xhr.open('get',newurl, true);
        xhr.send(null)
      },
      _encodeData(params) {
        var data = [];
        // 会遍历原型上的
        for(var name in params) {
          data.push(`${name}=${params[name]}`);
        }
        return data.join('&');
      }
    });
    this._init();
  }

  return HttpAjax;
})();


var options = {
    url:'http://127.0.0.1:8080/api/v4/hello',
    type:'post',
    data: {
      name:'zll',
      pwd:'12'
    },
    success: function(data, text) {
      console.log(data, text);
    },
    fail: function(data) {
      console.log(data)
    }
  }
  var ajax = new HttpAjax(options);