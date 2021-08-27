/* eslint-disable no-useless-concat */
import Plotly from 'plotly.js';


export async function PlotCanvas(props){
    
  const response = await fetch('http://femtography.uvadcos.io/api/' 
    + props.model + '/' 
    + props.gpd + '/' 
    + props.bjorken_value + '/' 
    + props.momentum_value + '/' 
    + props.momentum_transfer_value);

    const dat = await response.json();

    console.log("model: gpd >> " + props.model + " " + props.gpd)

    var x = [];
    var y = [];

    for(let d of dat){
      x.push(d.xu);
      y.push(d.xd);
    }

    //var config = {responsive: true}

    var trace1 = {
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
    var trace2 = {
      x: x,
      y: y,
      name: 'GPD density',
      ncontours: 50,
      colorscale: 'Hot',
      reversescale: true,
      showscale: false,
      type: 'histogram2dcontour'
    };
    var trace3 = {
      x: x,
      name: 'xu distribution',
      marker: {color: 'rgb(102,0,0)'},
      yaxis: 'y2',
      type: 'histogram'
    };
    var trace4 = {
      y: y,
      name: 'xd distribution',
      marker: {color: 'rgb(102,0,0)'},
      xaxis: 'x2',
      type: 'histogram'
    };
    var data = [trace1, trace2, trace3, trace4];
    var layout = {
      showlegend: true,
      autosize: true,
      margin: {t: 10},
      hovermode: 'closest',
      bargap: 0,
      pad: {
        t: 10,
        b: 10,
        r: 10,
        l: 10
      },
      xaxis: {
        domain: [0, 0.85],
        showgrid: true,
        zeroline: false
      },
      yaxis: {
        domain: [0, 0.85],
        showgrid: true,
        zeroline: false
      },
      xaxis2: {
        domain: [0.85, 1],
        showgrid: false,
        zeroline: false
      },
      yaxis2: {
        domain: [0.85, 1],
        showgrid: false,
        zeroline: false
      }
    };
       document.getElementById('Canvas-id').innerHTML = '';
       Plotly.newPlot('Canvas-id', data, layout);
}