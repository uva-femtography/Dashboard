import Results from "./Results";


function Tabs() {
  return (
    <div className="content">
      <div className="title">
        <h1>FemtoNet GPD Model Plotting App</h1>
        <div className="break"></div>
        <hr />
      </div>
      <div className="tabs">
        <Results />
      </div>
    </div>
  );

}

export default Tabs;
