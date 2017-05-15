import React from 'react';

export default class Abs extends React.Component {
  constructor(props) {
    super(props);
    console.log(`Hi, I am ${this.constructor.name} init`);
    this.oldRender = this.render;
    this.render = function() {
      console.log(`Hi, I am ${this.constructor.name} rendering`);
      return this.oldRender();
    }
  }
  componentDidMount() {
    console.log(`Hi, I am ${this.constructor.name} was mounted`);
  }

  componentDidUpdate() {
    console.log(`Hi, I am ${this.constructor.name} was updated`);
  }

  componentWillUnmount() {
    console.log(`Hi, I am ${this.constructor.name} was unmounted`);
  }
}
