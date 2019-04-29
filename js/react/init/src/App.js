// import React, { Component } from 'react';

// import ChildA from './children/childA';
// import ChildB from './children/childB';
// import ChildC from './children/childC';
// import ChildD from './children/childD';
// // import AddTodo from './children/AddTodo'
// import { Modal } from 'antd-mobile';
// import './App.css';
// import logo from './logo.svg';

// const alert = Modal.alert;

// class App extends Component {
//   static defaultProps = {

//   };
//   static propTypes = {

//   }
//   constructor(props) {
//     super(props);
//     this.state = {
//       name:'parent',
//       age:12,
//       variable: 30,
//       visible: false,
//     }
//     this.clickEvent = this.clickEvent.bind(this);
//   }

//   clickEvent() {
//     alert('Delete', 'Are you sure???', [
//       { text: 'Cancel', onPress: () => console.log('cancel') },
//       { text: 'Ok', onPress: () => console.log('ok') },
//     ])
//     this.setState({
//       // name:'newparent',
//       age:14,
//       name:'update',
//       visible:true,
//       // variable:30,
//     });
//   }


  
//   componentWillReceiveProps(nextProps) {
//     console.log('parent nextprops');

//   }
  
//   render() {
//     return (
//       <div className="App" id='app-root'>
//         <div onClick={this.clickEvent}>设置</div>
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//         {/* <ChildA 
//          />

//         {/* <ChildB
//           variable= {this.state.variable}
//         /> */}
//         {/* <ChildC /> */}
//         {/* <ChildD/> */} */}

        
        
//       </div>
//     );
//   }
// }

// export default App;
import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import React from 'react';

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
    };
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <WingBlank>
        <Button onClick={this.showModal('modal1')}>basic</Button>
        <WhiteSpace />
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="Title"
          footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          afterClose={() => { alert('afterClose'); }}
        >
          <div style={{ height: 100, overflow: 'scroll' }}>
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
          </div>
        </Modal>

        <Button onClick={this.showModal('modal2')}>popup</Button>
        <WhiteSpace />
        <Modal
          popup
          visible={this.state.modal2}
          onClose={this.onClose('modal2')}
          animationType="slide-up"
          afterClose={() => { alert('afterClose'); }}
        >
          <List renderHeader={() => <div>委托买入</div>} className="popup-list">
            {['股票名称', '股票代码', '买入价格'].map((i, index) => (
              <List.Item key={index}>{i}</List.Item>
            ))}
            <List.Item>
              <Button type="primary" onClick={this.onClose('modal2')}>买入</Button>
            </List.Item>
          </List>
        </Modal>
      </WingBlank>
    );
  }
}

export default App;
