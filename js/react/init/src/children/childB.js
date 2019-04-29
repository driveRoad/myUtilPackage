/**
 * react最新版本的生命周期。对比一下
 * props发生了改变，子组件就可以体现出这个变化了，为什么还要多此一举，在getDerivedStateFromProps来更新到state里呢
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChildB extends Component {
  // 创建组件，初始化组件对象的时候
  static defaultProps = {
    variable: 2,
  }
  constructor(props) {
    // 初始化state, 在childb对象上挂载数据, 对象上还有props对象
    super(props);
    this.name = 'ChildB';
    this.props = props;
    this.state = {
      status: 'initial',
      variable: 40,
    }
    this.clickme = this.clickme.bind(this);
    console.log('constructor');
    console.log(this);
    console.log('*************');
  }

  /**
   * 这里统一设置为点击事件区
   */
  clickme() {
    this.setState({
      status:'update'
    })
  }


  // 新增加的一个周期，在16.3版本中只有初始化组件的过程中才会调用。取消了componetWillMount, componetWillReciveProps, 换成了getDerivedStateFromProps
  // 就是不知道这个静态周期到底是为了解决什么问题引入的

  /**
   * 
   * @param {*} props 
   * @param {*} state 
   * componentWillReceiveProps；参数会接收下一个props和上一个state对象。当前组件可以知道谁给我东西了，谁用我，谁给我东西，给我的东西
   */
  static getDerivedStateFromProps(nextprops, prestate) {
    console.log('getDerivedStateFromProps');
    console.log(nextprops);
    console.log(prestate);
    console.log('-----------------------------');
    return null;
    
  }

  // 判断是否需要更新当前组件，接收两个参数
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    console.log(nextProps);
    console.log(nextState);
    console.log('*********************');
    return true;
  }

  // 

  render() {
    console.log('render');
    console.log(this.state);
    console.log(this.props);
    console.log('*************');
    return (
      <div onClick={this.clickme}  id='childB'>
        ChildB
        {this.props.variable}
      </div>
    )
  }

  // 这个是在render生命周期后执行的，原来是componentWillUpdate,在render之前执行。
  getSnapshotBeforeUpdate(props, prestate) {
    console.log('getSnapshotBeforeUpdate');
    console.log(props);
    console.log(prestate);
    console.log('***************************')
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');
    console.log(this.props);
    console.log(this.state);
    console.log('************************');
    // 执行render后，react更新dom和refs。
  }
  

  componentDidUpdate() {
    console.log('componentDidUpdate');
    console.log(this.props);
    console.log(this.state);
    console.log('*****************');
    // 更新时，也就是执行完render后，执行getSnapshotBeforeUpdate, 再执行dom和refs的更新，更新完后执行didUpdate
  }

  // 当执行forceUpdate的时候，直接执行render, 不经过shouldComponetUpdate。


  // componentWillUnmout
}

ChildB.propTypes = {
  variable: PropTypes.number
}