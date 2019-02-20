/**
 * 用于objUtil工具类的测试
 */

 import ObjUtil from '../util/ObjectUtil'
 import StringUtil from '../util/StringUtil'
 import Child from '../util/es6Child';

 /**
  * 获取对象具体某个数据类型的方法测试
  */
//  export default function test() {
//   let obj1 = null;
//   let obj2 = "hello";
//   let obj3 = [1,23];
//   let obj4;
//   let obj5=function() {

//   };
//   let obj6 = Object.create(null);
//   let obj7 = 213;
//   console.log(ObjUtil.getObjType(obj1));
//   console.log(ObjUtil.getObjType(obj2));
//   console.log(ObjUtil.getObjType(obj3));
//   console.log(ObjUtil.getObjType(obj4));
//   console.log(ObjUtil.getObjType(obj5));
//   console.log(ObjUtil.getObjType(obj6));
//   console.log(ObjUtil.getObjType(obj7));
//  }
 
//  test();


//测试是否是某个类型的函数

//  export default function testIsType() {
//   let obj1 = null;
//   let obj2 = "hello";
//   let obj3 = [1,23];
//   let obj4;
//   let obj5=function() {

//   };
//   let obj6 = Object.create(null);
//   let obj7 = 213;

//   console.log(obj1 + ":" );console.log(ObjUtil.isArray(obj1));
//   console.log(obj2 + ":" );console.log(ObjUtil.isArray(obj2));
//   console.log(obj3 + ":" );console.log(ObjUtil.isArray(obj3));
//   console.log(obj4 + ":" );console.log(ObjUtil.isArray(obj4));
//   console.log(obj5 + ":" );console.log(ObjUtil.isArray(obj5));
  
//   console.log(obj7 + ":"); console.log(ObjUtil.isArray(obj7));

//  }

//  testIsType()

/**
 * 测试深度拷贝
 */
// export default function test() {
//   let obj = {

//   };
//   let obj1 = {
//     name:'hello',
//     age:'24',
//     family:{
//       member:'father'
//     },
//     generation: [
//       'tom','lili','lucy'
//     ]
//   };
//   let obj2 = {
//     name:'welcome',
//     age: 30,
//     family:{
//       member: 'mother'
//     },
//     generation:[
//       'lilei','hanmeimei'
//     ]
//   };
//   let result = ObjUtil.deepClone(obj1,obj2);

//   console.log(obj1);
//   obj1.family.member='gradmotherer';
//   console.log(obj2);
//   console.log(obj1);
// }

// test();

/**
 * 测试对象是否为空对象
 */
export default function test() {
  // let obj1 = undefined;
  // // let obj2 = null;
  // // let obj3 = "";
  // // let obj4 = "afa";
  // // let obj5 = {};
  // // let obj6 = {name:'a'};
  // // let obj7 = [];
  // // let obj8 = [1,2,3];
  // // let obj9 = function() {};
  // // let obj10 = 2;
  // let obj11 = true;

  // // console.log(StringUtil.isEmptyObj(obj1));
  // // console.log(StringUtil.isEmptyObj(obj2));
  // // console.log(StringUtil.isEmptyObj(obj3));
  // // console.log(StringUtil.isEmptyObj(obj4));
  // // console.log(StringUtil.isEmptyObj(obj5));
  // // console.log(StringUtil.isEmptyObj(obj6));
  // // console.log(StringUtil.isEmptyObj(obj7));
  // // console.log(StringUtil.isEmptyObj(obj8));
  // // console.log(StringUtil.isEmptyObj(obj9));
  // // console.log(StringUtil.isEmptyObj(obj10));
  // console.log(StringUtil);

  let child = new Child("2","3");
  child.show();

} 
test();




