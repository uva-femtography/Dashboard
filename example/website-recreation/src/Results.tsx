import FlexLayout, { IJsonModel, TabNode } from "flexlayout-react";
import { useState } from "react";
import 'flexlayout-react/style/light.css';
import Table from './Table';

export type APIData = {
  [index : number]: string;
  x: number;
  u: number;
  d: number;
  xu: number;
  xd: number;
}

type ResultsProps = {
  data: Array<APIData>;
}

function Results({data}: ResultsProps) {
  let json: IJsonModel = {
    global: { 
      tabEnableClose: true,
      tabEnableRename: true,
     },
    borders: [],
    layout: {
      type: "row",
      weight: 100,
      children: [
        {
          type: "tabset",
          weight: 100,
          selected: 0,
          children: [
            {
              type: "tab",
              name: "Results",
              component: "grid",
            },
          ],
        },
      ],
    },
  };


  const [config, setConfig] = useState(FlexLayout.Model.fromJson(json));

  function factory(node: TabNode) {
    let component = node.getComponent();
    if (component === "grid") {
      return <Table data={data} />
    }
  }

  return(
    <div className="results">
      <FlexLayout.Layout model={config} factory={factory} />
    </div>  
  ); 
}

export default Results;

