import React, {Component} from 'react';

/**
 * 1. props改变 ----> 触发子组件的componentWillReceiveProps ----> 调用setState  ----> shouldComponetUpdate --->  componentWillUpdate  ---> componentDidUpdate
 * 2. props改变 -----> 处罚componentWillReceiveProp -->不调用setState ----> shouldComponentUpdate ---> componentWillUpdate  ---> componentDidUpdate
 * 
 * 3. componentWillReceiveProp和getDerivedStateFromProps区别：
 *    在componentWillReceiveProp里必须调用setState来更新state数据
 *    在getDerivedStateFromProps里只需要返回一个对象，就自动更新state里的数据
 *    componentWillReceiveProp只有在props变化时才会被调用
 *    getDerivedStateFromProps在初始化，props变化， state变化时都会被调用，只有在forceUpdate的时候不会
 * 
 * 
 */


export default class ChildA extends Component {
  static defaultProps = {
    name: 'childA'
  };
  constructor(props) {
    super(props);
    this.state = {
      type: 'aa',
      name: 'statename'
    }
    console.log('----------constructor-----------');
  }

  componentWillMount() {
    console.log('----------componentWillMount-----------');
  }

  // 当父组建重新render的时候，会
  componentWillReceiveProps(nextProps) {
    // 在这里面调用setState更新state对象，
    console.log('----------componentWillReceiveProps-----------');
    this.setState({
      name: nextProps.name
    })

  }


  // nextProps是父组建的状态改变导致props变化，子组建会重新被渲染，然后就可以通过nextProps和this.props的对比，判断是否需要rerender,
  // nextState是自身的state状态变化了，然后根据nextState和this.state的对比判断是不是需要rerender
  shouldComponentUpdate(nextProps, nextState) {
    console.log('-------------shouldComponentUpdate-----------------');
    return true;
  }

  componentWillUpdate() {
    console.log('----------------componentWillUpdate--------------');
  }

  componentDidUpdate() {
    console.log('----------------componentDidUpdate--------------');
  }


  // this.props指的是父组建传过来的，defaultProps会和传过来的合并到一起

  render() {
    console.log('----------------render--------------');
    return (
      <div>
        {
          this.props.name
        }
        <div>
          this is ChildA
        </div>
      </div>
      
    )
  }
}