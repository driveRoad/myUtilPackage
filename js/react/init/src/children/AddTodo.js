/**
 * react-redux库练习
 */
import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { addTodo } from './actions';

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }

  }

  updateInput(value) {
    this.setState({
      input: value,
    })
  }

  handleAddTodo = () => {
    // 分发action
    this.props.addTodo(this.state.input);

    this.setState({
      input: ''
    })
  }

  render() {
    return (
      <div>
        <input
           onChange={e => this.updateInput(e.target.value)}
           value={this.state.value}
        />
        <button className="add-todo" onClick={this.handleAddTodo}>
          Add Todo
        </button>
      </div>
    )
  }
}

export default connect (
  null,
  { addTodo }
)(AddTodo);
