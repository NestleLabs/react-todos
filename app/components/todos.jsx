import Abs from 'components/abs';
import React from 'react';
import FilterButton from 'components/filter-button'

const filters = {
  all: "all",
  odd: "odd",
  even: "even"
};
export default class Todos extends Abs {

  constructor(props) {
    super(props);
    this.state = {
      origin: [],
      filter: filters.all
    }
  }

  handleAll = (event) => {
    event.preventDefault();
    this.setState({
      filter: filters.all
    })
  }

  handleOdd = (event) => {
    event.preventDefault();
    this.setState({
      filter: filters.odd
    })
  }

  handleEven = (event) => {
    event.preventDefault();
    this.setState({
      filter: filters.even
    });
  }

  render() {
    const todos = this.props.todos.filter(todo => {
      switch(this.state.filter) {
        case filters.all:
          return todo;
        case filters.odd:
          return +todo.name % 2
        case filters.even:
          return !(+todo.name % 2)
      }
    }).map(todo => <div key={todo.id.toString()}>{todo.name}</div>);

    return (
      <div>
        <section className="todos-view">
        {todos}
        </section>
        <FilterButton handleAll={this.handleAll} handleOdd={this.handleOdd} handleEven={this.handleEven}/>
      </div>
    )
  }

}
