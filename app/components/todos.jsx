import React from 'react';
export default class Todos extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const todos = this.props.todos;
    return (
      <div>
        {todos.map(todo => <div key={todo.id.toString()}>{todo.name}</div>)}
      </div>
    )
  }

}
