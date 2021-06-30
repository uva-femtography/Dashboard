import * as React from "react";
import {
    ControlGroup,  
    NumericInput,
    Intent,
    INumericInputProps,
} from "@blueprintjs/core";


export class CasaMenuGroup extends React.PureComponent <INumericInputProps>{
    public state: INumericInputProps = {
        allowNumericCharactersOnly: true,
        buttonPosition: "right",
        disabled: false,
        fill: true,
        intent: Intent.NONE,
        large: false,
        majorStepSize: 10,
        max: 50,
        min: 0,
        minorStepSize: 0.1,
        selectAllOnFocus: false,
        selectAllOnIncrement: false,
        stepSize: 0.1,
        value: "",
    };

    public render(){
        return (
            <div className="bp3-dark">
                <ControlGroup fill={true} vertical={false}>
                    <NumericInput placeholder="Enter value..." 
                    onValueChange={this.props.onValueChange} fill={true}/>
                </ControlGroup>
            </div>
        );
    }

}