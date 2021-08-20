import * as React from "react";

import {
    HTMLSelect, 
    IHTMLSelectProps,
} from "@blueprintjs/core";



export class ModelSelect extends React.PureComponent<IHTMLSelectProps> {
    public state: IHTMLSelectProps = {
        disabled: false,
        fill: true,
        large: false,
        minimal: false,
        value: "",
        onChange: undefined,
    };


    public render(){
        return(
            <HTMLSelect className="bp3-dark" onChange ={this.props.onChange} options={this.props.options} />
        );
    }
}