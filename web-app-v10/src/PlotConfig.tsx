import GPDMultiSelect from "./GPDMultiSelect";
import { FormGroup, Button } from "@blueprintjs/core";
import { useState } from "react";
import { getTabSelected } from "./ManageTab";
import { APIPoints } from "./Options";
import { createPlot } from "./CreatePlot";

type PlotConfigProps = {
    optionList: string[];
    data: APIPoints[][];
}

function PlotConfig({optionList, data}: PlotConfigProps) {

    /**
     * handleSelect is called when the user selects a GDP from the list.
     * handleSelect adds the GPD into the MultiSelect box and removes it from
     * the list of options avaliable
     * @param value The GPD selected
     */
    function handleSelect(value: string) {
        //Add to selected state to display in box
        selected.push(value);
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
        //Add this back to the list of options
        gpdList.push(value);
    }


    //Holds the GPDs that are selected and are displayed as tags in the MultiSelect box
    const [selected, setSelected] = useState<string[]>([]);
    const [gpdList, setGPDList] = useState<string[]>(optionList);

    /**
     * Adds a new plot to the selected tab. If the tab already has a plot on it, the
     * addPlot function will graph overtop of the original plot 
     * @param tabSelected 
     */
     function addPlot() {
        let tabSelected = getTabSelected();
        if(tabSelected != null){
            createPlot(tabSelected, data[tabSelected], selected);
        }
    }

    return (
        <div className="plot-options">
            <h2>Plot options</h2>
            <FormGroup label="Select quark GPDs to plot">
                <GPDMultiSelect
                    options={gpdList}
                    selected={selected}
                    onSelect={handleSelect}
                    onRemove={handleRemove}
                />
            </FormGroup>
            <Button icon="chart" text="Plot Selected" onClick={addPlot} />
        </div>
    )

}

export default PlotConfig;