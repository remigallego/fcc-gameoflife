import React, { Component } from 'react';
import {PieChart, Pie, LineChart, Line, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';
import $ from 'jquery';
import '../css/charts.css'

class Charts extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.data)
    return(
      <div id="charts-container">
        <div id="barchart">
          <BarChart width={200} height={150} data={this.props.data}>
            <Bar dataKey="alive" stackId="a"fill="#496fd1" />
            <Bar dataKey="dead" stackId="a" fill="#ebf1ff" />
            <Legend />
          </BarChart>
        </div>
      </div>
    )
  }

}


export default Charts
