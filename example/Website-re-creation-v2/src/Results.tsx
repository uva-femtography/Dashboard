import FlexLayout, { DockLocation, IJsonModel, TabNode , Model} from "flexlayout-react";
import { useState } from "react";
import 'flexlayout-react/style/light.css';
import Table from './Table';
import Options from './Options';

export type APIData = {
  [index: number]: string;
  x: number;
  u: number;
  d: number;
  xu: number;
  xd: number;
}

type ResultsProps = {
  data: Array<APIData> | null;
  config: Model;
}


//Parameters: {data}: ResultsProps
//{data, config}: ResultsProps

function Results({data, config}: ResultsProps) {
  /*let json: IJsonModel = {
    global: {
      tabEnableClose: true,
      tabEnableRename: true,
    },
    borders: [],
    layout: {
      type: "row",
      id: "#1",
      weight: 100,
      children: [
        {
          type: "tabset",
          id: "#2",
          weight: 100,
          selected: 0,
          children: [
            {
              type: "tab",
              name: "Results",
              component: "grid",
            },
            {
              type: "tab",
              name: "Options",
              component: "options",
            },
          ],
        },
      ],
    },
  };


  const [config, setConfig] = useState(FlexLayout.Model.fromJson(json));

  function handleButtonClick() {
    let newNodeJson = {
      type: "tab",
      name: "Results 2",
      component: "grid",
    };


    config.doAction(FlexLayout.Actions.addNode(newNodeJson, "#1", DockLocation.RIGHT, 2));

  }*/



  function factory(node: TabNode) {
    let component = node.getComponent();
    if (component === "grid" && data == null) {
      return <p>{node.getId()}</p>;
    }
    if(component === "options"){
      return <p>Options</p>
    }
  }

  return (
    <div className="results">
      <FlexLayout.Layout model={config} factory={factory} />
    </div>
  );
}

export default Results;

