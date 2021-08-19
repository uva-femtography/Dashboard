/* eslint-disable no-useless-concat */
import logo from "./logo.svg";
import './App.css';
import {PlotCanvas} from "./PlotCanvas.js";
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import * as React from "react";
import {ChangeEvent} from "react";

import {
  ControlGroup,
  Button,
  Card, 
  Elevation,
  ButtonGroup,
} from "@blueprintjs/core";

//import {handleStringChange } from "@blueprintjs/docs-theme";

import { CasaNavBar } from "./CasaNavBar";
import { CasaMenuGroup } from "./CasaMenuGroup";
import { ModelSelect } from './ModelSelect';
import { NumericalSelect } from './NumericalSelect';
import { ModelDrawer } from "./ModelDrawer";

const bjorken_menu_options = [
  {name: "0.0001", value: 0.0001},
  {name: "0.0004", value: 0.0004},
  {name: "0.001", value: 0.001},
  {name: "0.004", value: 0.004},
  {name: "0.01", value: 0.01}
]

const momentum_menu_options = [
  {name: "-0.1", value: -0.1},
  {name: "-0.4", value: -0.4},
  {name: "-0.8", value: -0.8},
  {name: "-1.0", value: -1.0},
  {name: "-1.5", value: -1.5}
]

const model_menu_options = [
  {name: "uva", value: "uva"},
  {name: "random-model", value: "uva"},
  {name: "randomer-model", value: "uva"}
]

const gpd_menu_options = [
  {name: "GPD H", value: "GPD_H"},
  {name: "GPD E", value: "GPD_E"}
]

type State = {
  gpd: string;
  model: string;
  bjorken_value: number;
  momentum_value: number;
  momentum_transfer_value: number;
  x: Array<number>;
  y: Array<number>;
};

type Props = {
  property: string;
};

export class App extends React.PureComponent <Props, State>{  
  state: State = {
    gpd: "GPD_H",
    model: "uva",
    bjorken_value: 0.0001,  
    momentum_value: -0.1,
    momentum_transfer_value: 0.5,
    x: [],
    y: [],
  };

  private handleModelChange(event: ChangeEvent<HTMLSelectElement>){
    this.setState({model: event.target.value});
  }

  private handleGPDChange(event: ChangeEvent<HTMLSelectElement>){
    this.setState({gpd: event.target.value});
  }

  private handleBjorkenChange(event: any){
    this.setState({bjorken_value: event.target.value});
  }

  private handleMomentumChange(event: any){
    this.setState({momentum_value: event.target.value});
  }

  private handleMomentumTransferChange = (_valueAsNumber: number)=>{
    this.setState({momentum_transfer_value: _valueAsNumber});
  }

  private async getData(){
    var _x:Array<number> = [];
    var _y:Array<number> = [];

    const response = await fetch('http://femtography.uvadcos.io/api/' + 
    this.state.model + '/' + this.state.gpd + '/' 
    + this.state.bjorken_value + '/' 
    + this.state.momentum_value + '/' 
    + this.state.momentum_transfer_value);

    const data = await response.json();

    for(let d of data){
      _x.push(d.x);
      _y.push(d.xu);
    }

    //let x_copy = this.state.x.slice();
    let x_copy = this.state.x.slice();
    let y_copy = this.state.y.slice();

    x_copy = _x;
    y_copy = _y;

    this.setState({
      x: x_copy,
      y: y_copy
    });
  }

  private handleClick = () => {
    this.getData(); 

    console.log("data >> " + this.state.x);
    console.log("data >> " + this.state.y);

    PlotCanvas(this.state)
  };

  public render(){
    return (  
      <div className="App">
        <div className="bp3-dark">
         <CasaNavBar />
          <div className="Menu-panel">
          <Card interactive={true} elevation={Elevation.FOUR}>
            <ControlGroup fill={true} vertical={true}>
            <label className="bp3-label"> 
              GPD
              <ModelSelect onChange={event => this.handleGPDChange(event)} options={gpd_menu_options}/>
            </label>
            
            <label className="bp3-label"> 
              Model
              <ModelSelect onChange={event => this.handleModelChange(event)} options={model_menu_options}/> 
            </label>  

            <label className="bp3-label" > 
              Bjorken-x
              <NumericalSelect onChange={event => this.handleBjorkenChange(event)} options={bjorken_menu_options}/>
            </label>
            <label className="bp3-label"> 
              Momentum
              <NumericalSelect onChange={event => this.handleMomentumChange(event)} options={momentum_menu_options}/>
            </label>
            <label className="bp3-label"> 
              Q2
              <CasaMenuGroup onValueChange={this.handleMomentumTransferChange}/>
            </label>
            <label className="bp3-label">
              <p></p>
              <ButtonGroup fill={true}>
                <Button text="Plot" icon="scatter-plot" fill={true} onClick={this.handleClick} /> 
                <ModelDrawer isOpen={false}/>
              </ButtonGroup>
            </label>
            </ControlGroup>
            </Card>
          </div>
          <div className="Canvas" id="Canvas-id">
            <img src={logo} className="App-logo" alt="logo.png" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
