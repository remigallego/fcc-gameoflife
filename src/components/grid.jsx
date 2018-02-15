import React, { Component } from 'react';
import Box from './box.jsx'
import {App, BOX_W, BOX_H, BOXES_ON_X, BOXES_ON_Y} from '../App.js'
import $ from 'jquery';

class Grid extends Component {

  constructor(props) {
    super(props)
    this.state = {
      grid: this.props.grid
    }

  this.handleChange = this.handleChange.bind(this)
  }

  render() {
    let grid = this.props.grid
    let k = 0
    let w = BOX_W
    let h = BOX_H

    return(
      <div id="game-grid-container">
      {
        grid[1].map((y, index_y) => (
        grid[0].map((x, index_x) =>
          (
            <Box key={k++}
              boxId={k++} width={w} height={h}
              life={grid[index_x][index_y]} X={index_x} Y={index_y}
            />
            )
          )
        ))
      }
      </div>
    )
  }


  handleChange(x, y, life) {
    // Todo 
    let grid = this.state.grid
    grid[x][y] = life;
    this.setState({grid: grid})
  }

}

export default Grid
