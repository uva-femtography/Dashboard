import Results from "./Results";
import { Button, Drawer, DrawerSize, Position } from '@blueprintjs/core';
import { useState } from 'react';
import Options from "./Options";


function Tabs() {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  function open() {
    setIsOptionsOpen(true);
  }

  function close() {
    setIsOptionsOpen(false);
  }

  return (
    <div className="tabs">

      <Drawer
        isOpen={isOptionsOpen}
        title="Options"
        icon="settings"
        onClose={close}
        isCloseButtonShown
        canOutsideClickClose
        position={Position.LEFT}
        size={DrawerSize.SMALL}
      >
        <Options />
      </Drawer>

      <div className="content">
        <h1>FemtoNet GPD Model Plotting App</h1>
        <hr />
        <Button text="Options" icon='caret-right' id="open" onClick={open}/>
        <Results />
      </div>
    </div>
  );

}

export default Tabs;
