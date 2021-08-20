import * as React from "react";
import {
    HTMLSelect, 
    IHTMLSelectProps,
} from "@blueprintjs/core";

export class NumericalSelect extends React.PureComponent<IHTMLSelectProps> {
    public state: IHTMLSelectProps = {
        disabled: false,
        fill: true,
        large: false,
        minimal: false,
        value: "",
        onChange: undefined,
        options:undefined,
    };

    public render(){
        return(
            <HTMLSelect onChange ={this.props.onChange} options={this.props.options} />
        );
    }
}