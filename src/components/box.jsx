import React, { Component } from 'react';
import {App, DEADCOLOR, ALIVECOLOR} from '../App.js'
import $ from 'jquery';

class Box extends Component {
  constructor(props) {
    super(props)
    this.state = {
      life: this.props.life
    }

    this.boxStyleDead = {
      backgroundColor: DEADCOLOR,
      width: this.props.width + "px",
      height: this.props.height + "px"
    }

    this.boxStyleAlive = {
      backgroundColor: ALIVECOLOR,
      width: this.props.width + "px",
      height: this.props.height + "px"
    }

    this.handleClick = this.handleClick.bind(this)
  }

  getStyle() {
    if (this.props.life === 0)
      return this.boxStyleDead
    else
      return this.boxStyleAlive
  }

  getId() {
    return "box" + this.props.boxId;
  }

  setStyle() {
    if (this.props.life === 0)
      $("#" + this.getId()).css('background-color', ALIVECOLOR);
    else
      $("#" + this.getId()).css('background-color', DEADCOLOR);
    }

  handleClick() {
    // Todo
  }

  render() {

    return (<div id={this.getId()} className="box" style={this.getStyle()} onClick={this.handleClick}></div>)
  }
}
export default Box
