import * as React from 'react';
import Plot from 'react-plotly.js'
import {
    Button,
    ControlGroup,
    ButtonGroup,
    NumericInput,
    Label,
    Divider,
  } from "@blueprintjs/core";

const getData = async() =>{
    const response = await fetch('http://localhost5000/channel/1');
    const data = await response.json();

    return data;
}

const ReactPlot = (props) => {
    const timeData = Array.from(Array(1000)).map(value=>Math.random());
    const fluxData = Array.from(Array(1000)).map(value=>Math.random());
    
    return (
        <div className="panel">
        <Plot
            data={[
          {
            x: timeData,
            y: fluxData,
            type: 'scatter',
            mode: 'markers',
            marker: {color: 'red'},
          },
          
        ]}
        layout={
            {
                title: props.channel,
                autosize: true,
                hovermode: 'closest',
                responsive: true,
                margin: {
                    t: 50, //top margin
                    l: 50, //left margin
                    r: 50, //right margin
                    b: 50 //bottom margin
                    },
            }
        }
        style={
            {
                width: '100%', 
                height: '100%'
            }
        }
        useResizeHandler={true}
      />
      <div className="toolbar">
        <ControlGroup fill={true} vertical={false}>
              <ButtonGroup>
                  <Button fill={false} icon='new-grid-item'></Button>
                  <Button fill={false} icon='eraser'></Button>
                  <Button fill={false} icon='play'></Button>
                  <Button fill={false} icon='step-forward'></Button>
                  <Button fill={false} icon='stop'></Button>
                  <Divider />
                  <label class="bp3-inline">
                  <NumericInput defaultValue={1}/>  
                  </label>
                </ButtonGroup>

          </ControlGroup> <br></br>
        </div>
    </div>
    );
}

export default ReactPlot;