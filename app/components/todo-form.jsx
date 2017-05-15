import Abs from 'components/abs';
import React from 'react';
import Todos from 'components/todos';
let id = 0;
export default class TodoForm extends Abs {
  state = {
    todos: [],
    todo: {},
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.addTodo({
      id: id++,
      name: this.refs.input.value
    });
    this.refs.input.value = "";
  }

  addTodo = (todo) => {
    this.setState((state) => ({
      todos: this.state.todos.concat(todo)
    }));
  }

  render() {
    return (
      <form className="todo-form" onSubmit={this.handleSubmit}>
          <label className="todo-input">
              请在这里输入:
              <input type="text" ref="input" />
          </label>
          <Todos todos={this.state.todos}/>
      </form>
    )
  }
}
