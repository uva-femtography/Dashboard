import Plotly from 'plotly.js';
import { Data } from 'plotly.js';
import { APIPoints } from "./Options";

let width = 0;
let height = 0;

window.onload = () => {
  width = document.getElementsByClassName("flexlayout__tab")[0].clientWidth - 5;
  height = document.getElementsByClassName("flexlayout__tab")[0].clientHeight - 5;
  localStorage.removeItem('data');

}

export function createPlot(index: number, points: Array<APIPoints>, colTitles: string[]) {
  let data: Data[] = [];

  for (let i = 0; i < points.length; i++) {

    console.log(colTitles);
    //j=1 to exempt x from being plotted on y-axis
    for(let j = 0; j < colTitles.length; j++){
      let x:number[] = [];
      let y:number[] = [];
      
      points[i].data.forEach((value) => x.push(value['x']));
      points[i].data.forEach((value) => y.push(value[colTitles[j]]));

      let trace: Data = {
        type: 'scatter',
        mode: 'lines',
        x: x,
        y: y,
        name: `${colTitles[j]}(xbj=${points[i].options.xbj}, t=${points[i].options.t}, q2=${points[i].options.q2})`,
        fill: 'tozerox',
      }
      data.push(trace);
    }
  }

  var layout = {
    autosize: false,
    width: width,
    height: height,
    font: { size: 12 },
    yaxis: {
      title: 'GPD',
    },
  };

  var config = { responsive: true };

  Plotly.newPlot(`results-${index}`, data, layout, config);
}