import { BaseSyntheticEvent, useState, useEffect } from 'react';
import { Card, FormGroup, HTMLSelect, NumericInput, Button, ButtonGroup } from '@blueprintjs/core';
import Results from './Results';
import Instructions from './Instructions';

export interface Options {
    //Line 6 allows for strings to be used as indexes
    [index: number]: string;
    gpd: string;
    model: string;
    xbj: number;
    t: number;
    q2: number;
}


function Home() {
    let gpdOptions: string[] = ["GPD_E", "GPD_H"];
    let modelOptions: string[] = ["BKM Model", "UVA Model"];
    let xbjOptions: number[] = [0.0001, 0.0002, 0.0004, 0.0006, 0.0008, 0.001, 0.002, 0.004, 0.006, 0.008, 0.01, 0.02, 0.04, 0.06, 0.08, 0.1, 0.2, 0.4, 0.6];
    let tOptions: number[] = [...Array(19).keys()].map(n => -(n + 1) / 10);

    const [options, setOptions] = useState<Options>({ gpd: "GPD_E", model: "BKM Model", xbj: 0.001, t: -0.1, q2: 0.1 })
    //data will hold data from the API
    const [data, setData] = useState([{ x: 0, u: 0, d: 0, xu: 0, xd: 0 }]);
    //boolean that specifies whether or not to show instructions for the web app
    const [showInstructions, setShowInstructions] = useState(true);

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
        const baseURL = "http://localhost:5000/"
        let model: string;
        if (options.model === "BKM Model") {
            model = "bkm";
        }
        else {
            model = "uva";
        }

        //REMOVE: Currently hardcoded to UVA because BKM is not working
        const url = `${baseURL}api/uva/${options.gpd}/${options.xbj}/${options.t}/${options.q2}`

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data);
                localStorage.setItem('data', JSON.stringify(data));
            });
        
        
        setShowInstructions(false);

        //stop reloading
        event.preventDefault();
    }

    useEffect(() => {
        let data = localStorage.getItem('data');
        if (data != null) {
            setShowInstructions(false);
            //Will turn string back into JSON
            setData(JSON.parse(data));
        }
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
                                <HTMLSelect options={gpdOptions} name="GPD" onChange={handleOptions} required />
                            </FormGroup>
                            <FormGroup label="Select a model:" labelFor="model">
                                <HTMLSelect options={modelOptions} name="model" onChange={handleOptions} required />
                            </FormGroup>

                            <h2>Kinematic Parameters</h2>

                            <FormGroup label="xbj:" labelFor="xbj">
                                <HTMLSelect options={xbjOptions} name="xbj" onChange={handleOptions} required />
                            </FormGroup>

                            <FormGroup label="t:" labelFor="t">
                                <HTMLSelect options={tOptions} name="t" onChange={handleOptions} required />
                            </FormGroup>

                            <FormGroup label="q2:" labelFor="q2">
                                <NumericInput stepSize={0.1} name="q2" placeholder="Input a number" onChange={handleOptions} required />
                            </FormGroup>

                            <ButtonGroup>
                                <Button type="submit" icon={"series-configuration"} text="Plot" onClick={handleSubmit} />
                                <Button icon={"download"} text="Download as CSV" />
                            </ButtonGroup>
                        </form>
                    </Card>
                </div>

                {/*If there isn't any data found in local storage, instructions will show.
                Otherwise, Results will show */}
                {showInstructions && (<Instructions />)}
                {!showInstructions && (<Results data={data} />)}

            </div>
        </div>

    );

}

export default Home;
