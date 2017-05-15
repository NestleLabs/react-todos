import React from 'react';
import Abs from 'components/abs';
export default class FilterButton extends Abs {
  render() {
    return (
      <div>
      <button type="button" onClick={this.props.handleAll}>handleAll</button>
      <button type="button" onClick={this.props.handleOdd}>handleA</button>
      <button type="button" onClick={this.props.handleEven}>handleB</button>
      </div>
    )
  }
}
