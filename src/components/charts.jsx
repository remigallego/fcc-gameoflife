import React, { Component } from 'react';
import {LineChart, Line, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';
import $ from 'jquery';
import '../css/charts.css'

class Charts extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return(
      <div id="charts-container">
        <div id="barchart">
          <BarChart width={730} height={250} data={this.props.chartArray}>
            <CartesianGrid strokeDasharray="3 10" />
            <XAxis dataKey="generation" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="alive" fill="#006989" />
            <Bar dataKey="dead" fill="#111c32" />
          </BarChart><br />
        </div>
      </div>
    )
  }

}


export default Charts
