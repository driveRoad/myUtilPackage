/**
 * 阅读react源码之 React.createElement
 */
import React from 'react';
import ReactDOM from 'react-dom';
function ChildC() {
  const div = document.createElement('div');
  div.setAttribute('class', 'root-node');
  const reactElement =  React.createElement('div', {style:{backgroundColor:'#ff0000'}, key: 12}, 'hello c');
  console.log(ReactDOM.render(reactElement, document.getElementById('root'), function(e){
    // console.log('render callback');
    // console.log(e);
  }));
  return ReactDOM.render(reactElement, document.getElementById('root'), function(e){
    // console.log('render callback');
    // console.log(e);
  })
}

export default ChildC;
console.log(ChildC);

// 经过babel转换，实际是调用React.createElement转换成ReactElement元素。先转成es5, 通过ast树转成es5,再es5基础上转成react元素
// React.createElement(type, props, children)
// type: 节点类型: div, span, a ,ul, li ,header, table
// props: 节点类型上的属性： {styel:{backgroundColor:'#fff'}, key:1, ref:'div'}
// children: hello childC.这个children是一个文本节点，也有可能是一个react元素。
// 最终返回一个reactElement对象，包含一个type, props: {所有的属性， children},key, ref,
