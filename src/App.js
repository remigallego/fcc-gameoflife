import React, { Component } from 'react';
import Commands from './components/commands.jsx'
import Box from './components/box.jsx'
import Grid from './components/grid.jsx'
import Charts from './components/charts.jsx'
import './App.css';
import './css/game.css'
import './css/commands.css'
import './css/infos.css'

const width = 600;
const height = width;

const BOXES_ON_X = 75
const BOXES_ON_Y = 75


const TIMER = 100


class App extends Component {
constructor(props) {
  super(props)
  this.alive = 0
  this.dead = 0
  this.arr = []
  this.state = {
      grid: Array(this.rows).fill().map(()=> Array(this.cols).fill(0)),
      generation: 0
  }
  this.handleRun = this.handleRun.bind(this)
  this.handleRandom = this.handleRandom.bind(this)
  this.formatToCharts = this.formatToCharts.bind(this)
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
        </div>
        <Charts data={this.formatToCharts()}/>
      </div>
    );
}

formatToCharts() {
  let arr = this.arr;
  arr = [{generation: this.state.generation, alive: this.alive, dead: this.dead}]
  this.arr = arr;
  return this.arr
}

componentDidMount() {
  this.handleRandom()
}

tick() {
  this.mutate();
}

  // Mutate
mutate() {
    let g  = this.state.grid;
    let g2 = this.state.grid;
    let countDead = 0
    let countAlive = 0
    for (let i = 0; i < BOXES_ON_X; i++) {
		  for (let j = 0; j < BOXES_ON_X; j++) {
		    let count = 0;
		    if (i > 0) if (g[i - 1][j]) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
		    if (i > 0 && j < BOXES_ON_X - 1) if (g[i - 1][j + 1]) count++;
		    if (j < BOXES_ON_X - 1) if (g[i][j + 1]) count++;
		    if (j > 0) if (g[i][j - 1]) count++;
		    if (i < BOXES_ON_X - 1) if (g[i + 1][j]) count++;
		    if (i < BOXES_ON_X - 1 && j > 0) if (g[i + 1][j - 1]) count++;
		    if (i < BOXES_ON_X - 1 && BOXES_ON_X - 1) if (g[i + 1][j + 1]) count++;
		    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = 0;
		    if (!g[i][j] && count === 3) g2[i][j] = 1;
        if(g[i][j] === 0)
          { countDead++ }
        else {
            countAlive++
        }
		  }
		}
    this.alive = countAlive;
    this.dead =  countDead;
		this.setState({
		  grid: g2,
		  generation: this.state.generation + 1
      });
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

// Handle the Random Button
handleRandom() {
  let xgrid = [];
  let ygrid = [];
  let w = BOXES_ON_X;
  let h = BOXES_ON_Y;
  let countAlive = 0
  let countDead = 0
  let array = []
  let temp = []
  let r = 0
  for(let i=0; i < w; i++)
  {
    array.push([]);
    temp = array[i];
    for(let j=0 ; j < h ; j++)
    {
      r = this.random();
      if(r)
        countAlive++
      else
        countDead++
      temp.push(r);
    }
    array[i] = temp
  }

  this.alive = countAlive
  this.dead = countDead
  this.setState({grid: array})
  console.log("__ Grid populated");
}

// Return 1 or 0 randomly
  random() {
    if(Math.floor(Math.random() * 10) === 1)
      return 1
    else {
      return 0
    }
  }
}

export default App;
