/**
 * 探讨react中的setState异步更新和事件机制
 * 
 * 1. setState 只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的。
   2. setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
   3. State 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次setState，setState的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时setState多个不同的值，在更新时会对其进行合并批量更新。
 */

import React, { Component } from 'react';
import ReactDom from 'react-dom';
class ChildD extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0, val: 10 };
  }
  render() {
    return <div onClick={this.onClick.bind(this)}>点我</div>;
  }

  componentDidMount() {
    //手动绑定mousedown事件
    // ReactDom.findDOMNode(this).addEventListener(
    //   "mousedown",
    //   this.onClick.bind(this)
    // );

    //延时调用onclick事件
    // setTimeout(this.onClick.bind(this), 1000);


    //-----------------------------------
    // this.setState({ val: this.state.val + 1 })
    // console.log(this.state.val)

    // this.setState({ val: this.state.val + 1 })
    // console.log(this.state.val)

    // setTimeout(_ => {
    //   this.setState({ val: this.state.val + 1 })
    //   console.log(this.state.val);

    //   this.setState({ val: this.state.val + 1 })
    //   console.log(this.state.val)
    // }, 0)
    // 输出结果是0023
  }
  onClick(event) {
    // if (event) {
    //   console.log(event.type);
    // } else {
    //   console.log("timeout");
    // }
    // console.log("prev state:", this.state.counter);
    // // this.setState({
    // //   counter: this.state.counter + 1
    // // }, (state) => {
    // //   console.log('---------------');
    // //   console.log(state);
    // // });
    //   console.log('---------------');
    
    // this.setState((preState, props) => ({
    //   counter: preState.counter + 1
    // }));
    
    // console.log("next state:", this.state.counter);

    this.setState({
      val: 9
    });
    console.log(this.state.val);

    
  }
}
export default ChildD;