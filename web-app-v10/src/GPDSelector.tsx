import { MultiSelect, ItemRenderer } from "@blueprintjs/select";
import { MenuItem } from "@blueprintjs/core";
import { useState } from "react";

type GPD = {
    name: string,
    creator: string,
}

const GPDSelect = MultiSelect.ofType<GPD>();

//TO DO: Receieve props for handling on change

function GPDSelector() {
    const [gpdList, setGPDList] = useState<GPD[]>([{ name: "GPD_E", creator: "UVA" }, { name: "GPD_H", creator: "UVA" }]);

    const [selected, setSelected] = useState<GPD[]>([]);

    let itemRenderer: ItemRenderer<GPD> = (value, { handleClick, modifiers }) => {
        return (
            <MenuItem
                active={modifiers.active}
                text={value.name}
                label={value.creator}
                onClick={handleClick}
            />
        )
    }

    function handleSelect(value: GPD) {
        selected.push(value);
        let deleted = gpdList.filter((model: GPD) => model.name !== value.name);
        setGPDList(deleted);

    }

    function tagRenderer(model: GPD) {
        return model.name;
    }

    function handleRemove(value: GPD, index: number) {
        let deleted = selected.filter((model: GPD) => model.name !== value.name);
        setSelected(deleted);
        gpdList.push(value);
    }

    return (
        <GPDSelect
            items={gpdList}
            itemRenderer={itemRenderer}
            onItemSelect={handleSelect}
            selectedItems={selected}
            tagRenderer={tagRenderer}
            onRemove={handleRemove}
            noResults={<p>No GPDs</p>}
            placeholder={"Select GPD"}
        />)


}

export default GPDSelector;