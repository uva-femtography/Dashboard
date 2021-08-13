import FlexLayout, { TabNode, Model, Action, DockLocation, IJsonModel } from "flexlayout-react";
import "flexlayout-react/style/light.css";
import Instructions from "./Instructions";
import { APIData } from "./Home";
import { Button } from "@blueprintjs/core";
import { useState } from "react";


function Results() {

  const [index, setIndex] = useState(0);

  let json: IJsonModel = {
    global: {
      tabEnableClose: true,
      tabEnableRename: true,
    },
    borders: [
      {
        type: "border",
        location: "left",
        children: [],
      },
    ],
    layout: {
      type: "row",
      id: "0",
      weight: 100,
      children: [
        {
          type: "tabset",
          id: "1",
          selected: 0,
          children: [
            {
              type: "tab",
              name: "Instructions",
              component: "Instructions",
              id: "instructions",
            },
          ],
        },
      ],
    },
  };

  const [config, setConfig] = useState(FlexLayout.Model.fromJson(json));

  function handleButtonClick() {
    //Delete instructions tab if this is the first Results tab created
    if (index === 0) {
      config.doAction(FlexLayout.Actions.deleteTab("instructions"));
    }

    setIndex(index + 1);

    let tabId = `Results ${index}`;

    //Create configuration for new tab
    let newNodeJson = {
      type: "tab",
      name: tabId,
      id: tabId,
      component: "results",
    };

    //Add new tab into a window that is to the right of the first window rendered
    config.doAction(
      FlexLayout.Actions.addNode(newNodeJson, "0", DockLocation.RIGHT, 0)
    );

    sessionStorage.setItem('tab', tabId);
  }

  function factory(node: TabNode) {
    let component = node.getComponent();
    if (component === "Instructions") {
      return <Instructions />;
    }
    else {
      let id = node.getId();
      let i = parseInt(id.charAt(id.length - 1));
      return <div id={`results-${i}`} ></div>;
    }
  }


  function getSelectedTab(event: Action) {
    if (event.type === "FlexLayout_SelectTab") {
      let id = event.data.tabNode;
      sessionStorage.setItem("tab", id);
      console.log(id);
    }
    return event;
  }

  return (
    <div className="results">
      <FlexLayout.Layout model={config} factory={factory} onAction={getSelectedTab} supportsPopout />
      <Button icon="add" className="bp3-minimal bp3-small" id="new-window" onClick={handleButtonClick} />
    </div>
  );
}

export default Results;
