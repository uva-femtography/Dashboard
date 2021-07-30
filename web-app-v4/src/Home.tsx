import { BaseSyntheticEvent, useState } from "react";
import {
  Card,
  FormGroup,
  HTMLSelect,
  NumericInput,
  Button,
  ButtonGroup,
  Spinner,
  Toaster,
  Position,
} from "@blueprintjs/core";
import Results from "./Results";
import createPlot from "./CreatePlot";

const AppToaster = Toaster.create({
  position: Position.TOP,
});

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
  const [apiData, setApiData] = useState<APIData[][]>([[]]);

  //Whether to show the spinner or not
  const [showSpinner, setShowSpinner] = useState(false);

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
    //Prevents page from reloading
    event.preventDefault();

    //If tab selected was invalid, stop executing
    const tabSelected = getTabSelected();
    if (tabSelected == null) {
      return;
    } else if (tabSelected === apiData.length) {
      let addTabData = apiData;
      addTabData.push([]);
    }

    setShowSpinner(true);

    const baseURL = "http://femtography.uvadcos.io/";
    let model: string;
    if (options.model === "BKM Model") {
      model = "bkm";
    } else {
      model = "uva";
    }

    //REMOVE: Currently hardcoded to UVA because BKM is not working
    const url = `${baseURL}api/${model}/${options.gpd}/${options.xbj}/${options.t}/${options.q2}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let updatedData = apiData;
        updatedData[tabSelected].push(data);
        setApiData(updatedData);
        console.log(apiData);
        handleButtonClick(tabSelected);
      })
      .catch((error) => {
        showError("Error: Data not found");
        setShowSpinner(false);
        return;
      });
  }

  function showError(message: string) {
    AppToaster.show({ message: message, intent: "danger" });
  }

  function getTabSelected() {
    let tabSelected = sessionStorage.getItem("tab");

    //If the tab selected is in valid, i.e. whether if the tab is null or if the
    //tab selected is instructions
    if (tabSelected === null) {
      showError("Error: No Tab Selected");
      return null;
    } else if (tabSelected === "instructions") {
      showError("Error: Cannot plot on instructions");
      return null;
    }

    let index = parseInt(tabSelected.charAt(tabSelected.length - 1));
    if (document.getElementById(`results-${index}`) === null) {
      AppToaster.show({ message: "Error: No Tab Selected", intent: "danger" });
      return null;
    }

    return index;
  }

  function handleButtonClick(tabSelected: number) {
    createPlot(tabSelected, apiData[tabSelected]);
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
                <Button icon={"download"} text="Download" />
                {showSpinner && <Spinner size={20} />}
              </ButtonGroup>
            </form>
          </Card>
        </div>

        <div className="break"></div>

        <Results />
      </div>
    </div>
  );
}

export default Home;
