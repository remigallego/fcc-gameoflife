import React, { Component } from 'react';
import {App, DEADCOLOR, ALIVECOLOR} from '../App.js'
import $ from 'jquery';

class Box extends Component {
  constructor(props) {
    super(props)
    this.age = 0
    this.life = false;
  }
  componentWillUpdate() {
    this.life = this.props.life;
    if(this.props.life)
    {
      if(this.age < 4)
        this.age = this.age + 1;
    }
    else {
      this.age = 0
    }
  }

  render() {

    return (<div className={this.props.boxClass} id={"age"+this.age}></div>)
  }
}
export default Box
