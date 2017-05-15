import React from 'react';
import TodoForm from 'components/todo-form';

import Abs from 'components/abs';

import "@/base";

export default class DemoContainer extends Abs {
  render() {
    return (
      <div className="demo-container" style={{ display: "flex", justifyContent: "center" }}>
        <TodoForm />
      </div>
    )
  }
}
