import { BaseSyntheticEvent, useState } from "react";
import {
  Card,
  FormGroup,
  HTMLSelect,
  NumericInput,
  Button,
  ButtonGroup,
  Spinner,
} from "@blueprintjs/core";
import Results from "./Results";
import createPlot from "./CreatePlot";
import modModel, {modT, modXbj, getModelName} from "./ModOptions";
import { getTabSelected, showError } from "./ManageTab";
import { useEffect } from "react";

export interface Options {
  //Line 6 allows for strings to be used as indexes
  [key: string]: string | number;
  gpd: string;
  model: string;
  xbj: number;
  t: number;
  q2: number;
}

export type DataPoint = {
  [key: string]: number;
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

  const [xbj, setXbj] = useState(xbjOptions);
  const [t, setT] = useState(tOptions);
  const [q2, setQ2] = useState("");

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
    setOptionValues(event.target.name, event.target.value);
  }

  function setOptionValues(name: string, value: string) {
    let newOptions = options;
    newOptions[name] = value;
    setOptions(newOptions);
  }

  function handleModelGpd(event: BaseSyntheticEvent) {
    setOptionValues(event.target.name, event.target.value);
    let model = getModelName(options.model);
    modModel(model, options.gpd).then((data) => {
      setXbj(data.xbj);
      setT(data.t);
    });
  }

  function handleT(event: BaseSyntheticEvent) {
    setOptionValues(event.target.name, event.target.value);
    if(typeof options.t !== "number"){
      options.t = parseFloat(options.t);
    }
    modT(getModelName(options.model), options.gpd, options.t)
    .then((data) => {
      setXbj(data.xbj);
      setQ2(`(${data.q2MinMax[0]} to ${data.q2MinMax[1]})`)
    });
  }

  function handleXbj(event: BaseSyntheticEvent){
    setOptionValues(event.target.name, event.target.value);
    modXbj(getModelName(options.model), options.gpd, options.xbj)
    .then((data) => {
      setT(data.t);
      setQ2(`(${data.q2MinMax[0]} to ${data.q2MinMax[1]})`);
    });
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

    const baseURL = "http://localhost:5000/";
    let model = getModelName(options.model);
    let url = `${baseURL}api/${model}/${options.gpd}/${options.xbj}/${options.t}/${options.q2}`;
    if(options.t === -1 || options.t === -2){
      url = `${baseURL}api/${model}/${options.gpd}/${options.xbj}/${options.t.toFixed(1)}/${options.q2}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let updatedData = apiData;
        updatedData[tabSelected].push(data);
        setApiData(updatedData);
        addPlot(tabSelected);
      })
      .catch((error) => {
        showError("Error: Data not found");
        setShowSpinner(false);
        return;
      });
  }

  function addPlot(tabSelected: number) {
    createPlot(tabSelected, apiData[tabSelected]);
    setShowSpinner(false);
  }

  useEffect(() =>{
    modModel("fake", "GPD_E").then((data) => {
      setXbj(data.xbj);
      setT(data.t);
    });
  }, [])

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
                  onChange={handleModelGpd}
                  required
                />
              </FormGroup>
              <FormGroup label="Select a model:" labelFor="model">
                <HTMLSelect
                  options={modelOptions}
                  name="model"
                  onChange={handleModelGpd}
                  required
                />
              </FormGroup>

              <h2>Kinematic Parameters</h2>

              <FormGroup label="xbj:" labelFor="xbj">
                <HTMLSelect
                  options={xbj}
                  name="xbj"
                  onChange={handleXbj}
                  required
                />
              </FormGroup>

              <FormGroup label="t:" labelFor="t">
                <HTMLSelect
                  options={t}
                  name="t"
                  onChange={handleT}
                  required
                />
              </FormGroup>

              <FormGroup label="q2:" labelFor="q2" labelInfo={q2}>
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
