import FlexLayout, { IJsonModel, TabNode } from "flexlayout-react";
import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import 'flexlayout-react/style/light.css';

function Results() {
  /*let json: IJsonModel = {
    global: { tabEnableClose: true },
    borders: [{
        type: "border",
        location: "left",
        size: 100,
        children: [],
      },],
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
              name: "one",
              component: "text",
            },
          ],
        },
      ],
    },
  };*/

  let json : IJsonModel = {
    "global": {
      "tabEnableRename": false
    },
    "layout": {
      "type": "row",
      "id": "#1",
      "children": [
        {
          "type": "tabset",
          "id": "#2",
          "weight": 50,
          "name": "Navigation",
          "enableDrop": false,
          "enableDrag": false,
          "children": [
            {
              "type": "tab",
              "id": "#3",
              "name": "FX",
              "component": "grid",
              "config": {
                "id": "1"
              }
            }
          ]
        },
        {
          "type": "tabset",
          "id": "#4",
          "weight": 25,
          "children": [
            {
              "type": "tab",
              "id": "#5",
              "name": "FI",
              "component": "grid",
              "config": {
                "id": "2"
              }
            }
          ],
          "active": true
        },
        {
          "type": "tabset",
          "id": "#6",
          "weight": 50,
          "name": "Blotters",
          "enableDrop": false,
          "enableDrag": false,
          "children": [
            {
              "type": "tab",
              "id": "#7",
              "name": "FX",
              "component": "grid",
              "config": {
                "id": "1"
              }
            }
          ]
        }
      ]
    },
    "borders": []
  }


  const [config, setConfig] = useState(FlexLayout.Model.fromJson(json));

  function factory(node: TabNode) {
    let component = node.getComponent();
    if (component === "text") {
      return <p>Test</p>;
    }
  }

  return(
      <FlexLayout.Layout model={config} factory={factory} />
  ); 
}

export default Results;

