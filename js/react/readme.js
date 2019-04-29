// 1. react的component有三个成员变量： context, props, refs, updater, 所以继承自component的自定义组件都有这三个属性， props描述了组建之间的结构关系，其子组建会在props属性下面， refs指向真正的dom
    component原型上定义了两个方法：setState, forceUpdate. setState里就是通过updater的enqueueSetState方法更新数据，然后重新渲染视图， forceUpdate通过updater的enqueueForceUpdate强制更新的

    2。shouldComponentUpdate
    // nextProps是父组建的状态改变导致props变化，子组建会重新被渲染，然后就可以通过nextProps和this.props的对比，判断是否需要rerender,
    // nextState是自身的state状态变化了，然后根据nextState和this.state的对比判断是不是需要rerender

    3.componentWillReceiveProps(nextProps)
    // nextProps是父组建的状态改变导致props变化，子组建会重新被渲染，然后就可以通过nextProps和this.props的对比，判断是否需要rerender,

    4. this.props指的什么
    // this.props指的是父组建传过来的，defaultProps会和传过来的合并到一起

    5. react中的事件监听机制什么样的，jquery的事件监听机制又是什么样的

    6.使用React.createElement创建元素并绑定事件的时候，只能使用箭头函数

    7。父组建变化的时候，会触发子组建的生命周期,触发的是update的生命周期