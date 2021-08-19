import Plotly from 'plotly.js';
import * as React from 'react';
import {Plot} from 'react-plotly.js';


export const PlotCanvas = () =>{
  
  
  const timeData = Array.from(Array(100)).map(value=>Math.random());
  const fluxData = Array.from(Array(100)).map(value=>Math.random());
  const residualData = Array.from(Array(100)).map(value=>Math.random());
  const declinationData = Array.from(Array(100)).map(value=>Math.random());
  const ascensionData = Array.from(Array(100)).map(value=>Math.random());
  
  console.log('TIME> ' + '')

  var flux = {
    x: timeData,
    y: fluxData,
    mode: 'markers',
    name: 'Flux',
    marker: {
      color: 'rgb(102,0,0)',
      size: 2,
      opacity: 0.4
    },
    type: 'scatter',
    // xaxis: 'x-flux',
    // yaxis: 'y-flux',
  };

  // var residual = {
  //   x: timeData,
  //   y: residualData,
  //   mode: 'markers',
  //   name: 'Residual',
  //   marker: {
  //     color: 'rgb(102,102,0)',
  //     size: 2,
  //     opacity: 0.4
  //   },
  //   type: 'line',
  //   xaxis: 'x-residual',
  //   yaxis: 'y-residual',
  // };

  // var density = {
  //   x: ascensionData,
  //   y: declinationData,
  //   name: 'Density',
  //   ncontours: 20,
  //   colorscale: 'Hot',
  //   reversescale: true,
  //   showscale: false,
  //   type: 'histogram2dcontour',
  //   xaxis: 'x-density',
  //   yaxis: 'y-density',
  // };

  var data = [flux];

  var layout = {
    showlegend: false,
    autosize: true,
    margin: {t: 50},
    hovermode: 'closest',
    bargap: 0,
    // xaxis: {
    //   domain: [0, 0.5],
    //   anchor: 'x-density'
    // },
    // xaxis2: {
    //   domain: [0.5, 0.1],
    //   anchor: 'x-flux'
    // },
    // xaxis3: {
    //   domain: [0.5, 0.1],
    //   anchor: 'x-residual'
    // },
    // yaxis: {
    //   domain: [0, 1],
    //   anchor: 'y-density'
    // },
    // yaxis2: {
    //   domain: [0, 0.5],
    //   anchor: 'y-residual'
    // },
    // yaxis3: {
    //   domain: [0.5, 1],
    //   anchor: 'y-flux'
    // },
  }

  return(
    <>
    <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={{width: 320, height: 240, title: 'A Fancy Plot'}}
      />
      <ControlGroup fill={true} vertical={false}>
              <ButtonGroup>
                  <Button fill={false} icon='new-grid-item'></Button>
                  <Button fill={false} icon='eraser'></Button>
                  <Button fill={false} icon='play'></Button>
                  <Button fill={false} icon='step-forward'></Button>
                  <Button fill={false} icon='stop'></Button>
                </ButtonGroup>
      </ControlGroup>
      </>
  );
}