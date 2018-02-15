import React, { Component } from 'react';

class Commands extends Component {
  constructor(props) {
    super(props)
    this.handleNext = this.handleNext.bind(this)
  }
  render() {
    return(
      <div>
      <button onClick={this.handleNext}>{this.props.name}</button>
    </div>
    )
  }

  handleNext() {
      this.props.handle()
  }
}

export default Commands
