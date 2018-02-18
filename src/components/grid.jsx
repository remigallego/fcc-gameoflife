import React, { Component } from 'react';
import Box from './box.jsx'
import {App, BOX_W, BOX_H, BOXES_ON_X, BOXES_ON_Y} from '../App.js'


class Grid extends Component {
  render() {
    let grid = this.props.grid
    let arr = []
    let boxClass = ""
    let life;

    grid.map((y, index_y) => {
      y.map((x, index_x) => {
        let boxId = index_x + "_" + index_y;
        boxClass = grid[index_y][index_x] === 1 ? "box on" : "box off";
        life = grid[index_y][index_x] ? true : false;
        arr.push(<Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            x={x}
            y={y}
            life={life}
            />)
      })
    })

    return(
      <div id="game-grid-container">
        {arr}
      </div>
    )
  }
}

export default Grid
