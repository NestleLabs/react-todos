import React from 'react';

import TodoForm from 'components/todo-form';

export default class DemoContainer extends React.Component {

  render() {
    return (
      <div className="demo-container" style={{ display: "flex", justyContent: "middle" }}>
        <TodoForm />
      </div>
    )
  }
}
