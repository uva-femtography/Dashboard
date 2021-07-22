import React from "react";
import Plot from "react-plotly.js";
import { DataPoint } from "./Home";

type GraphProps ={
  data: Array<DataPoint>;
};

//Parameters: { data }: GraphProps
function Graph() {
  /*let x: number[] = [];
  let y: number[] = [];

  data.forEach((point) => x.push(point.x));
  data.forEach((point) => y.push(point.xu));*/

  return (
    <Plot
      data={[
        {
          x: [1, 2, 3],
          y: [2, 6, 3],
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "red" },
        },
        { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
      ]}
      layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
    />
  );
}

export default Graph;
