import Plotly from 'plotly.js';
import { Data } from 'plotly.js';
import { APIData } from './Home';
import { DataPoint } from './Home';


export default function createPlot(index: number, point: APIData) {
  let x: number[] = [];
  let y: number[] = [];

  point.forEach((value) => x.push(value['x']));
  point.forEach((value) => y.push(value['xu']));


  let trace1: Data = {
    x: x,
    y: y,
    mode: 'markers',
    name: 'GPD points',
    marker: {
      color: 'rgb(102,0,0)',
      size: 8,
      opacity: 0.4
    },
    type: 'scatter'
  };

  let data = [trace1];

  var layout = { 
    autosize: false,
    width: 600,
    height: 400,
    title: 'x vs. xu',
    font: {size: 12}
  };

  var config = {responsive: true};

  Plotly.newPlot(`results-${index}`, data, layout, config)


}