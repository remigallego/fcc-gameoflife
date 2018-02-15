import React, { Component } from 'react';
import Commands from './components/commands.jsx'
import Box from './components/box.jsx'
import Grid from './components/grid.jsx'
import Charts from './components/charts.jsx'
import './App.css';
import './css/game.css'
import './css/commands.css'
import './css/infos.css'
import $ from 'jquery';

const width = 400;
const height = width;

const BOXES_ON_X = 60
const BOXES_ON_Y = 60
const BOX_W = width/BOXES_ON_X
const BOX_H = height/BOXES_ON_Y
const DEADCOLOR = "#111c32"
const ALIVECOLOR = "#ececec"

const TIMER = 800


class App extends Component {
constructor(props) {
  super(props)
  this.state = {
      grid: [[],[]],
      generation: 1
  }

  this.handleRun = this.handleRun.bind(this)

  this.handleRandom = this.handleRandom.bind(this)
}

// Render
render() {
    return (
      <div className="container">
        <div id="game-container"> {/* Contains the Grid + Commands */}
          <Grid grid={this.state.grid} />
          <div id="commands">
            <Commands handle={this.handleRun} name={this.getButtonStatus()}/>
            <Commands handle={this.handleRandom} name="Random"/>
          </div>
          <div id="info">Generation: {this.state.generation}</div>
          <div id="info">Alive: {this.getHowMany().alive} / Dead: {this.getHowMany().dead}</div>
          <Charts chartArray={[{alive: this.getHowMany().alive, dead: this.getHowMany().dead}]} />
        </div>

      </div>
    );
}

componentDidMount() {
  this.handleRandom()
}

tick() {
  this.mutate();
}


// Return how many Alive and Dead globally
getHowMany() {
  let grid = this.state.grid;
  let result = 0
  for(let x = 0; x < grid.length; x++)
    {for(let y = 0; y < grid[x].length; y++)
      {
        if(grid[x][y] === 1)
          result++
      }
  }
  return {alive: result, dead: BOXES_ON_X*BOXES_ON_Y-result}
}


  // Mutate
mutate() {
  let grid = this.state.grid
  for(let x = 0; x < grid.length; x++)
    {for(let y = 0; y < grid[x].length; y++)
    {
      if(grid[x][y]) // If Box Alive
      {
        if(this.getNeighbours(x, y, grid) === 2 || this.getNeighbours(x, y, grid) === 3)
          {
            grid[x][y] = 1
          }
        else {
            grid[x][y] = 0
        }
      }
      else           // If Box Dead
        {
        if(this.getNeighbours(x, y, grid) === 3)
          {
            grid[x][y] = 1
          }
          else {
            grid[x][y] = 0
          }
        }
    }}

  this.setState({grid: grid})
  this.setState({generation: this.state.generation+1})
}

// Redirect to Run or Pause
handleRun() {
  if(this.state.grid[0][0] != undefined)
  {
    if(!this.state.run)
      {
        this.timerID = setInterval(
            () => this.tick(),
            TIMER
        );
        this.setState({run: true})
      }
    if(this.state.run)
    {
      clearInterval(this.timerID);
      this.setState({run: false})
    }
  }
}

// Return "Run" or "Pause"
getButtonStatus() {
  if(this.state.run)
    {return "Pause"}
  else {
    return "Run"
  }
}

// Get Neighbours of a Box
getNeighbours(x, y, grid) {
  let foundAlive = 0;
  for(let i=-1 ; i <=1 ; i++)
  {
  let newx = x+i
    for(let j=-1 ; j <=1 ; j++)
  {
    let newy = y+j
    if(newx < 0 || newy < 0 || newx >= BOXES_ON_X || newy >= BOXES_ON_Y )
      {}
      else
      if(newx === x && newy === y)
        {}
        else
        if(grid[newx][newy] === 1)
            foundAlive++
    }
  }
  return foundAlive;
}

// Handle the Random Button
handleRandom() {
  let xgrid = [];
  let ygrid = [];
  let w = BOXES_ON_X;
  let h = BOXES_ON_Y;
  let array = []
  let temp = []
  for(let i=0; i<w;i++)
  {
    array.push([])
    temp = array[i]
    for(let j=0;j<h;j++)
    {
      temp.push(this.random())
    }
     array[i] = temp
  }

  this.setState({grid: array})
  console.log("__ Grid populated");
}

// Return 1 or 0 randomly
random() {

  if(Math.floor(Math.random() * 4) === 1)
    return 1
  else {
    return 0
  }
}
}

export default App;
export {DEADCOLOR, ALIVECOLOR, BOXES_ON_X, BOXES_ON_Y, BOX_W, BOX_H};
