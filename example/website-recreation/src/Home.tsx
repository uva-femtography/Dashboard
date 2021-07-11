import { Card, FormGroup, HTMLSelect, NumericInput, Button, ButtonGroup } from '@blueprintjs/core';


function Home(){
    let gpdOptions:string[] = ["GPD_E", "GPD_H"];
    let modelOptions:string[] = ["BKM Model", "UVA Model"];
    let xbjOptions:number[] = [0.0001, 0.0002, 0.0004, 0.0006, 0.0008, 0.001, 0.002, 0.004, 0.006, 0.008, 0.01, 0.02, 0.04, 0.06, 0.08, 0.1, 0.2, 0.4, 0.6]
    let tOptions:number[] = [-0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.8, -0.9, -1.0, -1.1, -1.2, -1.3, -1.4, -1.5, -1.6, -1.7, -1.8, -1.9]



    return(
        <div className="content">
            <h1>FemtoNet GPD Model Plotting App</h1>
            <hr />
            <div className="form">
                <Card>
                    <form>
                        <FormGroup label="Select GPD:" labelFor="GPD">
                            <HTMLSelect options={gpdOptions} name="GPD" />
                        </FormGroup>
                        <FormGroup label="Select a model:" labelFor="model">
                            <HTMLSelect options={modelOptions} name="model"/>
                        </FormGroup>

                        <h2>Kinematic Parameters</h2>

                        <FormGroup label="xbj:" labelFor="xbj">
                            <HTMLSelect options={xbjOptions} name="xbj" />
                        </FormGroup>

                        <FormGroup label="t:" labelFor="t">
                            <HTMLSelect options={tOptions} name="t"/>
                         </FormGroup>
                        
                        <FormGroup label="q2:" labelFor="q2">
                            <NumericInput stepSize={0.1} name="q2" placeholder="Input a number"/>
                        </FormGroup>

                        <ButtonGroup>
                            <Button icon={"series-configuration"} text="Plot" />
                            <Button icon={"download"} text="Download as CSV" />
                        </ButtonGroup>
                    </form>
                </Card>
            </div>

            <div className="instructions">
                <h2>Instructions</h2>
                <ul>
                    <li>Pick the GPD of interest from the dropdown menu.</li>
                    <li>Pick the theoretical model.</li>
                </ul>

                <h2>Explanation of Grid Parameters</h2>
                <ul>
                    <li>Choose kinematical parameters from the dropdown boxes. These are auto generated according to the gird points.</li>
                    <li>Choose Q2 values to estimate.</li>
                    <li>To download the results grid pick 'Download model as CSV' or press plot to generate interactive plot of the up(down) quark GPD versus x.</li>
                </ul>

            </div>
            

        </div>
    );
    
}

export default Home;