/**
 * 本工具包主要提供对象相关的工具类
 * 1. 对象的拷贝(深拷贝)
 * 2. 对象的数据类型判断，结果为string, function, boolean, number, null, object, array
 * 
 * 3. 
 * 
 * 4. 获取对象的原型对象
 * 
 * 5. 判断某个对象是否为空
 * 
 * 6. 判断某个对象的某个属性值是否是可枚举的
 * 
 * 7. 给对象添加元素（目前对象添加元素的方法为obj.key = value,或者obj[key] = value,现在希望通过调用方法去push一个对象，可以设置该属性的一些属性参数值）
 * 
 * 8. 给该对象的原型添加对象
 * 
 * 9. 判断某个对象是否含有某个属性（这个判断逻辑包含了属性是否存在于对象上或者该对象的原型链上）
 * 
 * 
 */
"use strict";


function _deepClone(targetObj,sourceObj,fn) {
  //拷贝的必须是对象，所以，判断sourceObj是不是对象，如果不是对象，则直接返回targetObj
  //可以直接调用传递过来的fn，做额外的操作
  
  if(fn(sourceObj) != 'Object' && fn(sourceObj) != 'Array') {
    return targetObj;
  }

  if(fn(targetObj) != 'Object' && fn(targetObj) != 'Array') {
    targetObj = {}
  }
  
  for(var item in sourceObj) {
    //判断sourceObj[item]是不是对象，如果是
    let dest = targetObj[item];
    let src = sourceObj[item];
    if(fn(sourceObj[item]) == 'Array') {
      dest = dest ? dest : [];
      
      dest = _deepClone(dest,src,fn);
    } else if(fn(sourceObj[item]) == 'Object') {
      dest = dest ? dest : {};
      targetObj[item] = _deepClone(targetObj[item],sourceObj[item],fn);
    } else {
      targetObj[item] = sourceObj[item]; //把source里的内容拷贝到targetObj对象里
    }
    
  }

  return targetObj;
}

const Agents = [
  "Android",
  "iPhone",
  "SymbianOS",
  "Windows Phone",
  "iPad",
  "iPod"
];

 class ObjectUtil {

    constructor(options) {
      
    }

    /**
     * 实现深度拷贝
     */
    static deepClone() {
      //解析arguments, 第一个参数认定为目标对象，剩余的默认为源对象
      // let targetObj = arguments && arguments[0] || {};
        return _deepClone(arguments[0],arguments[1],this.getObjType);
    }

    /** 
     * 判断是不是对象
    */
    static isObj(obj) {
      if(this.getObjType(obj) === 'Object') {
        return true;
      }
      return false;
    }

    /**
     * 判断是不是数组
     */
    static  isArray(obj) {
      if(this.getObjType(obj) === 'Array') {
        return true;
      }
      return false;

    }

    /**
     * 判断是不是函数
     */
    static  isFunction(obj) {
      if(this.getObjType(obj) === 'function') {
        return true;
      }
      return false;
    }

    /**
     * 判断是不是undefined
     * @param obj 
     */
    static isUndefined(obj) {
      if(this.getObjType(obj) === 'undefined') {
        return true;
      }
      return false;
    }

    /**
     * 判断一个对象是不是空对象
     * undefined -> true
     * null -> true
     * {} -> true
     * {name:''} -> false
     * []-> true
     * [1,2,3,4] -> false
     * "" -> true
     * "afa" -> false
     * true -> false
     * 21 -> false
     * function -> false;
     */
    static isEmptyObj(obj) {
      if(!obj) {
        return true;
      }
      if(this.isObj(obj)) {
        let keysList = Object.keys(obj);
        if(keysList.length == 0) {
          return true;
        } else {
          return false;
        }
      } 
      if(this.isArray(obj) && obj.length == 0) {
        return true;
      }
      
      if(typeof obj == 'string' && obj.length == 0) {
        return true;
      }
      return false;
    }

    /**
     * 返回该对象的具体某个数据类型
     * @test({}) => return  "object"
     * @test(function) => return  "function"
     * @test([]) => return "Array"
     * @test(other) => string / boolean / number / null / undefined
     */
    static getObjType(obj) {
      if(typeof obj != 'object') {
        return typeof obj;
      } else {
        return  Object.prototype.toString.call(obj).slice(8,-1);
      }
    }


    /**
     * 判断某个对象的属性是否是可枚举的
     * option可传递需要判断的该对象的属性
     */
    static propertyIsEnumerable(obj,option) {
      //如果option没传
      if(!this.isObj(obj)) {
        return false;
      }
      if(this.isUndefined(option)) {
        //判断每个属性，只要有一个属性是不可枚举的，那么就认为是不可枚举
        let propertysObj = Object.getOwnPropertyDescriptors(obj);
        if(this.isEmptyObj(propertysObj)) {
          return false;
        }
        let propertysList = Object.keys(propertysObj);
        for (var item of propertysList) {
          return propertysObj[item] && propertysObj[item].enumerable;
        }
      }

      //传递了option,但传递的option不是数组的形式
      if(!this.isArray(option)) {
        return false;
      }
      for(let item of option) {
        if(!obj.propertyIsEnumerable(item)) {
          return false;
        }
      }
      return true;
    }


    /**
     * cookie操作的工具类, 获取cookie中的值
     */
    static getCookie(name) {
      var cookieName = encodeURIComponent(name) + "=",
          cookieStart = document.cookie.indexOf(cookieName),
          cookieValue = null;
      if(cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(";",cookieStart);
        if(cookieEnd == -1) {
          cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
      }

      return cookieValue;
    }

    /**
     * 设置cookie
     * @param name 
     * @param value 
     * @param expires 
     * @param path 
     * @param domain 
     * @param secure 
     */
    static setCookie(name,value, expires, path, domain,secure) {
      var cookieText = encodeURIComponent(name) + "=" +
                       encodeURIComponent(value);
      if(expires instanceof Date) {
        cookieText += "; expires=" + expires.toDateString();
      }
      if(path) {
        cookieText += "; path=" + path;
      }
      if(domain) {
        cookieText += "; domain" + domain;
      }
      if(secure) {
        secure += "; secure" + secure;
      }
      document.cookie = cookieText;
    }


    /**
     * 删除cookie
     */
    static deleteCookie(name) {
      this.setCookie(name,"",new Date(0), path, domain,secure);
    }

    /**
     * 获取useragent
     * 1.判断是不是手机端
     * 2.获取当前设备是哪种移动端
     * 3.浏览器所在手机操作系统版本
     */
    static getOsVersion(){
      var u = navigator.userAgent,version = '';
      if (u.indexOf('Mac OS X') > -1) {
          //ios
          var regStr_saf = /OS [\d._]*/gi;
          var verinfo = u.match(regStr_saf);
          version = (verinfo + "").replace(/[^0-9|_.]/ig,'').replace(/_/ig,'.');
      } else if (u.indexOf('Android') > -1
          || u.indexOf('Linux') > -1) {
          //android
          version = u.substr(u.indexOf('Android') + 8, u.indexOf(";", u.indexOf("Android")) - u.indexOf('Android') - 8);
      } else if (u.indexOf('BB10') > -1) {
          //黑莓bb10系统
          version = u.substr(u.indexOf('BB10') + 5, u.indexOf(";", u.indexOf("BB10")) - u.indexOf('BB10') - 5);
      } else if (u.indexOf('IEMobile')) {
          //windows phone
          version = u.substr(u.indexOf('IEMobile') + 9, u.indexOf(";", u.indexOf("IEMobile")) - u.indexOf('IEMobile') - 9);
      }
      return version;
    }

    /** 
     * 判断是不是移动端
    */
    static isMobile () {
      var userAgentInfo = navigator.userAgent;
      let flag = true;
      for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
              flag = false;
              break;
          }
      }
      return flag;
    }
 }

 

 export default ObjectUtil;