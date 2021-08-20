import { BaseSyntheticEvent, useState } from "react";
import {
    FormGroup,
    HTMLSelect,
    NumericInput,
    Button,
    ButtonGroup,
    Spinner,
} from "@blueprintjs/core";
import createPlot from "./CreatePlot";
import modModel, { modT, modXbj, getModelName, getData, getMultiData } from "./ModOptions";
import { getTabSelected, showError } from "./ManageTab";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import GPDMultiSelect from './GPDMultiSelect';

/**
 * NOTE: This version of Options is incomplete. The options will not change based
 * on GPD
 */

/*REMOVE*/
import GPDSelector from "./GPDSelector";


export interface Options {
    //Line 6 allows for strings to be used as indexes
    [key: string]: string | number;
    gpd: string;
    model: string;
    xbj: number;
    t: number;
    q2: number;
}

export interface OptionsV2 {
    [key: string]: string | number | string[];
    gpd: string[];
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

export type APIData = {
    data: Array<DataPoint>;
    options: { gpd: string, xbj: number, t: number, q2: number };
};

function Options() {
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

    const [optionsV2, setOptionsV2] = useState<OptionsV2>({
        gpd: [],
        model: "BKM Model",
        xbj: 0.001,
        t: -0.1,
        q2: 0.1,
    })

    /**
     * ApiData will hold data from the API for plottingAPI Data is an array of arrays. 
     * Each element of the outermost array represent the data that is meant to be 
     * graphed in one tab.
     */
    const [apiData, setApiData] = useState<APIData[][]>([[]]);
    

    /**
     * 
     * downloadData holds data from the API for downloading into a CSV filedownloadData is different from apiData because it only is concerned with one
     * set of data points retrieved from the API, whereas apiData has to hold data
     * for multiple plots and tabs.
    */
    const [downloadData, setDownloadData] = useState([{}]);
    const [downloadLink, showDownloadLink] = useState(false);

    //Whether to show the spinner or not
    const [showSpinner, setShowSpinner] = useState(false);

    /**
     * handleSelect is called when the user selects a GDP from the list.
     * handleSelect adds the GPD into the MultiSelect box and removes it from
     * the list of options avaliable
     * @param value The GPD selected
     */
    function handleSelect(value: string) {
        //Add to selected state to display in box
        selected.push(value);
        optionsV2["gpd"] = selected;
        //Remove GPD option from avaliable list
        let deleted = gpdList.filter((gpd: string) => gpd !== value);
        setGPDList(deleted);
    }

    /**
     * handleRemove is called when the user removes something from the MultiSelect box
     * @param value The value of the item being removed
     * @param index The index in the list of items selected
     */
    function handleRemove(value: string, index: number) {
        //Delete the item from select based on whether the name of the GPD is equivalent
        let deleted = selected.filter((gpd: string) => gpd !== value);
        setSelected(deleted);
        optionsV2["gpd"] = deleted;
        console.log(options);
        //Add this back to the list of options
        gpdList.push(value);
    }


    /**
     * State variable to set the GPD options for MultiSelect
     *   
     */
    const [gpdList, setGPDList] = useState<string[]>(["GPD_E", "GPD_H"]);

    //Holds the GPDs that are selected and are displayed as tags in the MultiSelect box
    const [selected, setSelected] = useState<string[]>([]);


    /**
     * This function is used for the q2 form fields. It updates the state with
     * the name of the field and the respective user input.
     */
    function handleQ2(value: number, valueAsString: string) {
        setOptionValues("q2", value.toString());
    }

    /**
     * This is a helper function that updates the state variable optionValues for
     * each of the form fields
     * @param name The name of the option
     * @param value The value that the user selected
     */
    function setOptionValues(name: string, value: string) {
        let newOptions = options;
        newOptions[name] = value;
        setOptions(newOptions);
        optionsV2[name] = value;
    }

    /**
     * This function handles the two dropdowns Model and GPD
     * Called whenever the user makes a change to these two dropdowns
     * The function calls modModel which will update the dropdown values
     * for xbj, t, and q2 to reflect the model and GPD chosen by the user
     * @param event When the user changes the model or the GPD
     */
    function handleModelGpd(event: BaseSyntheticEvent) {
        //Updates option values for t
        setOptionValues(event.target.name, event.target.value);
        let model = getModelName(options.model);
        //Updates xbj, t, q2 model values
        //REMOVE: TEMPORARY GDP option for MultiSelect
        modModel(model, "GPD_E").then((data) => {
            setXbj(data.xbj);
            setT(data.t);
        });
    }

    /**
     * handleT is called whenever the user makes a change to the t dropdown
     * The function will update xbj and q2 values based on the t value selected
     * @param event When the user changes the t selected
     */
    function handleT(event: BaseSyntheticEvent) {
        //Updates option values for t
        setOptionValues(event.target.name, event.target.value);
        //Ensures that t is a number when function is called
        //Necessary because Javascript converts t into a string
        if (typeof options.t !== "number") {
            options.t = parseFloat(options.t);
        }
        //Updates xbj and q2 based on t value
        modT(getModelName(options.model), options.gpd, options.t)
            .then((data) => {
                setXbj(data.xbj);
                if (options.xbj > data.xbj[0]) {
                    options.xbj = data.xbj[0];
                }
                setQ2(`${data.q2MinMax[0]} to ${data.q2MinMax[1]}`)
            });
    }

    /**
     * handleXbj() updates T and Q2 options based on the Xbj that was
     * selected by the user. It uses modXbj which calls an API to get these
     * values.
     * @param event When the user changes the Xbj selected
     */
    function handleXbj(event: BaseSyntheticEvent) {
        //Setting the options
        setOptionValues(event.target.name, event.target.value);
        //Call API to get new T and Q2 values
        modXbj(getModelName(options.model), options.gpd, options.xbj)
            .then((data) => {
                setT(data.t);
                if (options.t > data.t[0]) {
                    options.t = data.t[0];
                }
                //Sets Q2 Range
                setQ2(`${data.q2MinMax[0]} to ${data.q2MinMax[1]}`);
            });
    }

    /**
     * handleSubmit() runs when the user clicks the plot button. The function
     * gets the tab currently selected by the user. Then, handleSubmit() gets the data
     * using the getData() function. The returned value will then be added to the apiData
     * state. Finally, using apiData, the function will call the addPlot() function which will
     * add a plot to the tab selected.
     * @param event When the user clicks the plot button
     * @returns void to stop execution if there is an error
     */
    function handleSubmit(event: BaseSyntheticEvent) {
        //Prevents page from reloading
        event.preventDefault();

        //If tab selected was invalid, stop executing
        const tabSelected = getTabSelected();
        if (tabSelected == null) {
            return;
        } else if (tabSelected >= apiData.length) {
            //This runs if there needs to be another array to hold data for another tab
            createArrays(apiData.length, tabSelected + 1);
        }
        //Show loading spinner
        setShowSpinner(true);

        getData(options.model, options.gpd, options.xbj, options.t, options.q2)
            .then((data) => {
                let updatedData = apiData.slice();
                let newData: APIData = {
                    data: data,
                    options: { gpd: options.gpd, xbj: options.xbj, t: options.t, q2: options.q2 },
                };
                //Add the data to the index of the tab that was selected
                updatedData[tabSelected].push(newData);
                setApiData(updatedData);
                addPlot(tabSelected);
            })
            .catch((error) => {
                console.log(error);
                showError("Error: Data not found");
                setShowSpinner(false);
                return;
            });
    }

    function handleSubmitV2(event: BaseSyntheticEvent) {
        //Prevents page from reloading
        event.preventDefault();

        //If tab selected was invalid, stop executing
        const tabSelected = getTabSelected();
        if (tabSelected === null) {
            return;
        } else if (tabSelected >= apiData.length) {
            //This runs if there needs to be another array to hold data for another tab
            createArrays(apiData.length, tabSelected + 1);
        }

        //Show loading spinner
        setShowSpinner(true);

        getMultiData(optionsV2.model, optionsV2.gpd, optionsV2.xbj, optionsV2.t, optionsV2.q2)
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    let newData: APIData = {
                        data: data[i],
                        options: { 
                            gpd: optionsV2.gpd[i], 
                            xbj: optionsV2.xbj, 
                            t: optionsV2.t, 
                            q2: optionsV2.q2 }
                    };
                    //Add the data to the index of the tab that was selected
                    apiData[tabSelected].push(newData);
                }
                localStorage.setItem("data", JSON.stringify(apiData));
                addPlot(tabSelected);
            })
            .catch((error) => {
                console.log(error);
                showError("Error: Data not found");
                setShowSpinner(false);
                return;
            });
    }



    /**
     * Helper function to add more arrays to apiData when
     * the Plot button is clicked. The helper function adds new
     * arrays for new tabs that are created
     * @param current The current number of arrays within apiData
     * @param target The target amount of arrays corresponding to the number of tabs
     */

    function createArrays(current: number, target: number) {
        let amount = target - current;
        for (let i = 0; i < amount; i++) {
            apiData.push([])
        }
    }

    /**
     * Adds a new plot to the selected tab. If the tab already has a plot on it, the
     * addPlot function will graph overtop of the original plot 
     * @param tabSelected 
     */
    function addPlot(tabSelected: number) {
        createPlot(tabSelected, apiData[tabSelected]);
        setShowSpinner(false);
    }

    /**
     * handleDownload() generates a csv for the user to download when
     * the user clicks the Download button on the UI. The download function
     * uses getData() like the handleSubmit() function, except it does not 
     * add the data to apiData and instead adds it to downloadData instead.
     * 
     */
    function handleDownload() {
        setShowSpinner(true);
        getData(options.model, options.gpd, options.xbj, options.t, options.q2)
            .then((data) => {
                setDownloadData(data);
                showDownloadLink(true);
                let link = document.getElementById("download");
                if (link != null) {
                    link.click();
                }
                setShowSpinner(false);
                showDownloadLink(false);
            })
            .catch(() => {
                showError("Error: Data not found");
                setShowSpinner(false);
            });
    }

    /**
     * The state variable q2 is a string that serves to 
     * tell the user the minimum and maximum values of q2 that they can enter
     * into the form. The function below uses this string and converts it
     * into an array of numbers, allowing it to be passed in as props for 
     * the min and max of the numeric input.
     * @returns An array of numbers, with element 0 as the min and element 1 as the max
     */

    function getQ2Range() {
        if (q2 !== "") {
            //Creates an array where each word is an element
            //Should be in the form of ["<Q2 Min>", "to", "<Q2 Max>"]
            let minMax = q2.split(" ");
            return [parseFloat(minMax[0]), parseFloat(minMax[2])];
        }
        else {
            //If q2 is empty
            return [undefined, undefined];
        }
    }


    useEffect(() => {
        modModel("bkm", "GPD_E").then((data) => {
            setXbj(data.xbj);
            setT(data.t);
        });
        let rawData = localStorage.getItem("data");
        //setState is asynchronous that's why this isn't working
        if(rawData !== null){
            setApiData(JSON.parse(rawData));
        }
    }, [])

    return (
        <div className="form">
            <form>
                {/*<FormGroup label="Select GPD:" labelFor="GPD">
                    <HTMLSelect
                        options={gpdOptions}
                        name="GPD"
                        onChange={handleModelGpd}
                        required
                    />
                </FormGroup>*/}

                <FormGroup label="Select GPDs:" labelFor="gpd-multiselect">
                    <GPDMultiSelect
                        options={gpdList}
                        selected={selected}
                        onSelect={handleSelect}
                        onRemove={handleRemove}
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
                        onValueChange={handleQ2}
                        min={getQ2Range()[0]}
                        max={getQ2Range()[1]}
                        required
                    />
                </FormGroup>

                <ButtonGroup>
                    <Button
                        type="submit"
                        icon={"series-configuration"}
                        text="Plot"
                        onClick={handleSubmitV2}
                    />

                    {!downloadLink && <Button icon={"download"} text="Download" onClick={handleDownload} />}
                    {downloadLink && <CSVLink data={downloadData} id={"download"} filename="model.csv">
                        <Button icon={"download"} text="Download" />
                    </CSVLink>}
                    {showSpinner && <Spinner size={20} />}
                </ButtonGroup>
            </form>


        </div>
    );
}

export default Options;
