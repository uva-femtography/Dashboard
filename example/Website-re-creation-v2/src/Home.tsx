import { BaseSyntheticEvent, useState } from "react";
import {
  Card,
  FormGroup,
  HTMLSelect,
  NumericInput,
  Button,
  ButtonGroup,
  Spinner,
  Toast,
} from "@blueprintjs/core";
import Results from "./Results";
import FlexLayout, { DockLocation, IJsonModel } from "flexlayout-react";
import createPlot from "./CreatePlot";

export interface Options {
  //Line 6 allows for strings to be used as indexes
  [index: number]: string;
  gpd: string;
  model: string;
  xbj: number;
  t: number;
  q2: number;
}

export type DataPoint = {
  [index: number]: string;
  x: number;
  u: number;
  d: number;
  xu: number;
  xd: number;
};

export type APIData = Array<DataPoint>;

function Home() {
  //Note: consider making options a separate component
  //Options
  let gpdOptions: string[] = ["GPD_E", "GPD_H"];
  let modelOptions: string[] = ["BKM Model", "UVA Model"];
  let xbjOptions: number[] = [
    0.0001, 0.0002, 0.0004, 0.0006, 0.0008, 0.001, 0.002, 0.004, 0.006, 0.008,
    0.01, 0.02, 0.04, 0.06, 0.08, 0.1, 0.2, 0.4, 0.6,
  ];
  let tOptions: number[] = [...Array(19).keys()].map((n) => -(n + 1) / 10);

  const [options, setOptions] = useState<Options>({
    gpd: "GPD_E",
    model: "BKM Model",
    xbj: 0.001,
    t: -0.1,
    q2: 0.1,
  });
  //data will hold data from the API
  const [apiData, setApiData] = useState<APIData[]>([]);

  const [index, setIndex] = useState(0);

  //Whether to show the spinner or not
  const [showSpinner, setShowSpinner] = useState(false);

  //Configuration for the dashboard using flex layout
  let json: IJsonModel = {
    global: {
      tabEnableClose: true,
      tabEnableRename: true,
    },
    borders: [],
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

  /**
   * This function is used for all form fields. It updates the state with
   * the name of the field and the respective user input.
   */
  function handleOptions(event: BaseSyntheticEvent) {
    let newOptions = options;
    newOptions[event.target.name] = event.target.value;
    setOptions(newOptions);
  }

  function handleSubmit(event: BaseSyntheticEvent) {
    setShowSpinner(true);

    const baseURL = "http://localhost:5000/";
    let model: string;
    if (options.model === "BKM Model") {
      model = "bkm";
    } else {
      model = "uva";
    }

    //REMOVE: Currently hardcoded to UVA because BKM is not working
    const url = `${baseURL}api/uva/${options.gpd}/${options.xbj}/${options.t}/${options.q2}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let updatedData = apiData;
        updatedData.push(data);
        setApiData(updatedData);
        handleButtonClick();
      })

    //stop reloading
    event.preventDefault();
  }

  function handleButtonClick() {
    //Adds new tab to dashboard displaying results

    if (index === 0) {
      config.doAction(FlexLayout.Actions.deleteTab("instructions"));
    }

    setIndex(index + 1);

    /**
     * type: "tab",
      name: `Results ${index}`,
      component: "grid",
     */

    let newNodeJson = {
      type: "tab",
      name: `Results ${index}`,
      component: "grid",
    };

    config.doAction(
      FlexLayout.Actions.addNode(newNodeJson, "0", DockLocation.BOTTOM, 0)
    );

    createPlot(index, apiData[index]);

    setShowSpinner(false);
  }

  return (
    <div className="content">

      <h1>FemtoNet GPD Model Plotting App</h1>
      <hr />

      <div className="container">
        <div className="form">
          <Card>
            <form>
              <FormGroup label="Select GPD:" labelFor="GPD">
                <HTMLSelect
                  options={gpdOptions}
                  name="GPD"
                  onChange={handleOptions}
                  required
                />
              </FormGroup>
              <FormGroup label="Select a model:" labelFor="model">
                <HTMLSelect
                  options={modelOptions}
                  name="model"
                  onChange={handleOptions}
                  required
                />
              </FormGroup>

              <h2>Kinematic Parameters</h2>

              <FormGroup label="xbj:" labelFor="xbj">
                <HTMLSelect
                  options={xbjOptions}
                  name="xbj"
                  onChange={handleOptions}
                  required
                />
              </FormGroup>

              <FormGroup label="t:" labelFor="t">
                <HTMLSelect
                  options={tOptions}
                  name="t"
                  onChange={handleOptions}
                  required
                />
              </FormGroup>

              <FormGroup label="q2:" labelFor="q2">
                <NumericInput
                  stepSize={0.1}
                  name="q2"
                  placeholder="Input a number"
                  onChange={handleOptions}
                  required
                />
              </FormGroup>

              <ButtonGroup>
                <Button
                  type="submit"
                  icon={"series-configuration"}
                  text="Plot"
                  onClick={handleSubmit}
                />
                <Button icon={"download"} text="Download as CSV" />
                {showSpinner && <Spinner size={20} />}
              </ButtonGroup>
            </form>
          </Card>
        </div>

        <Results data={apiData} config={config} />
      </div>
    </div>
  );
}

export default Home;
