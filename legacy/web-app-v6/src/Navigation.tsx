import { Navbar, Alignment, Button, Drawer } from "@blueprintjs/core";
import { useState } from 'react';
import Instructions from './Instructions';

function Navigation() {

    const [isOpen, setIsOpen] = useState(false);

    function handleHelpButton() {
        setIsOpen(true);
    }

    function handleClose() {
        setIsOpen(false);
    }

    return (
        <div className="navigation">
            <div className="navbar">
                <Navbar className="bp3-dark">
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>FemtoNet</Navbar.Heading>
                        <Button className="bp3-minimal" text="Home" />
                        <Button className="bp3-minimal" text="Contact" />
                        <Button className="bp3-minimal" text="Simonetta Liuti" />
                        <Button className="bp3-minimal" text="Help" onClick={handleHelpButton} />
                    </Navbar.Group>
                </Navbar>
            </div>

            <div className="drawer">
                <Drawer
                    isOpen={isOpen}
                    title="Help"
                    icon="info-sign"
                    onClose={handleClose}
                    isCloseButtonShown
                    canOutsideClickClose
                >
                    <Instructions />
                </Drawer>
            </div>
        </div>
    )
}

export default Navigation;