import FlexLayout, { TabNode, Model, Action, DockLocation } from "flexlayout-react";
import "flexlayout-react/style/light.css";
import Instructions from "./Instructions";
import { APIData } from "./Home";
import { Button } from "@blueprintjs/core";

type ResultsProps = {
  data: Array<APIData>;
  config: Model;
};

function Results({ data, config }: ResultsProps) {

  function handleButtonClick() {

    let newNodeJson = {
      type: "tab",
      name: `Test`,
      component: "grid",
    };

    config.doAction(
      FlexLayout.Actions.addNode(newNodeJson, "0", DockLocation.RIGHT, 0)
    );
  }

  function factory(node: TabNode) {
    let component = node.getComponent();
    if (component === "Instructions") {
      return <Instructions />;
    }
    else {
      let name = node.getName();
      let i = parseInt(name.charAt(name.length - 1));
      //data = {data[i]}
      //return <Table data={data[i]} />;
      return <div id={`results-${i}`}></div>;
    }
  }

  function getSelectedTab(event: Action){
    console.log(event);
    return event;
  }

  return (
    <div className="results">
      <FlexLayout.Layout model={config} factory={factory} onAction={getSelectedTab} />
      <Button icon="add" className="bp3-minimal bp3-small" id="new-window" onClick={handleButtonClick}/>
    </div>
  );
}

export default Results;
