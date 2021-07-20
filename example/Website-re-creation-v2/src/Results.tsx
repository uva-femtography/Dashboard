import FlexLayout, { TabNode , Model} from "flexlayout-react";
import 'flexlayout-react/style/light.css';
import Table from './Table';
import Instructions from './Instructions';
import {APIData} from './Home';



type ResultsProps = {
  data: Array<APIData>;
  config: Model;
}


function Results({data, config}: ResultsProps) {

  function factory(node: TabNode) {
    let component = node.getComponent();
    if (component === "Instructions") {
      return <Instructions />;
    }
    else{
      let name = node.getName();
      let i = parseInt(name.charAt(name.length - 1));
      return <Table data={data[i]} />
    }
  }

  return (
    <div className="results">
      <FlexLayout.Layout model={config} factory={factory} />
    </div>
  );
}

export default Results;

