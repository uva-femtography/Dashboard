import Plotly from 'plotly.js';
import { Data } from 'plotly.js';
import { APIData } from './Home';


export default function createPlot(index: number, points: Array<APIData>) {

  let data : Data[] = [];

  for(let i=0; i < points.length; i++){
    let x: number[] = [];
    let y1: number[] = [];
    let y2: number[] = [];

    points[i].forEach((value) => x.push(value['x']));
    points[i].forEach((value) => y1.push(value['xu']));
    points[i].forEach((value) => y2.push(value['xd']));

    let trace1: Data = {
      type: 'scatter',
      mode: 'lines',
      x: x,
      y: y1,
      name: 'GPD Up',
      fill: 'tozerox',
    };
  
    let trace2: Data = {
      type: 'scatter',
      mode: 'lines',
      x: x,
      y: y2,
      name: 'GPD Down',
      fill: 'tozerox',
    };
    
    data.push(trace1, trace2);
  }

  var layout = { 
    autosize: false,
    width: 650,
    height: 400,
    font: {size: 12},
    yaxis: {
      title: 'GPD',
    },
  };

  var config = {responsive: true};
  
  Plotly.newPlot(`results-${index}`, data, layout, config)
}