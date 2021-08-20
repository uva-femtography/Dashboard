import { HTMLSelect, FormGroup } from "@blueprintjs/core";
import {BaseSyntheticEvent, useState} from 'react';

function Help() {
    let model = ['BKM Model', 'UVA Model'];
    
    //REPLACE with actual model descriptions
    let bkmInfo = `BKM Model Info`;
    let uvaInfo = `UVA Model Info`;

    const [ info, setInfo ] = useState<String>(bkmInfo);

    /**
     * Shows model information based on selection by the user
     * @param event When the user changes the value of the dropdown
     */
    function handleSelect(event: BaseSyntheticEvent){
        let modelName = event.target.value;
        if(modelName === 'BKM Model'){
            setInfo(bkmInfo);
        }
        else if(modelName === "UVA Model"){
            setInfo(uvaInfo);
        }
    }

    return (
        <div className="help">
            <h2>Help</h2>
            <FormGroup label="Select to view model information" labelFor="model">
                <HTMLSelect
                    options={model}
                    name="model"
                    onChange={handleSelect}
                />
            </FormGroup>
            <div className="model-info">
                <h3>Model Information</h3>
                <p>
                    {info}
                </p>
            </div>
        </div>
    )

}

export default Help;