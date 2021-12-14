import { MultiSelect, ItemRenderer } from "@blueprintjs/select";
import { MenuItem } from "@blueprintjs/core";



type GPDProps = {
    options: string[];
    selected: string[];
    onSelect: (value: string) => void;
    onRemove: (value: string, index: number) => void;
}

const GPDSelect = MultiSelect.ofType<string>();

//TO DO: Receieve props for handling on change

function GPDMultiSelect({ options, selected, onSelect, onRemove }: GPDProps) {

    let itemRenderer: ItemRenderer<string> = (value, { handleClick, modifiers }) => {
        return (
            <MenuItem
                active={modifiers.active}
                text={value}
                onClick={handleClick}
            />
        )
    }

    

    function tagRenderer(value: string) {
        return value;
    }

    return (
        <GPDSelect
            items={options}
            itemRenderer={itemRenderer}
            onItemSelect={onSelect}
            selectedItems={selected}
            tagRenderer={tagRenderer}
            onRemove={onRemove}
            noResults={<p>No GPDs</p>}
            placeholder={"Select GPD"}
        />)


}

export default GPDMultiSelect;