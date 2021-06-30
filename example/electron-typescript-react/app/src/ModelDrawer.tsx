import * as React from "react";

import {
    Drawer,
    Position,
    Classes,
    Button,
    IDrawerProps,
} from "@blueprintjs/core";

export class ModelDrawer extends React.PureComponent<IDrawerProps> {
    public state: IDrawerProps = {
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        enforceFocus: true,
        hasBackdrop: true,
        isOpen: false,
        position: Position.RIGHT,
        size: Drawer.SIZE_SMALL,
        usePortal: true,
    };

    private handleOpen = () => this.setState({ isOpen: true });
    private handleClose = () => this.setState({ isOpen: false });

    public render(){
        return (
            <>
            <Button icon="database" onClick={this.handleOpen}/>
            <Drawer className="bp3-dark" icon="info-sign" onClose={this.handleClose} title="Model Information" {...this.state} >
    
                <div className={Classes.DRAWER_BODY}>
                    <div className={Classes.DIALOG_BODY}>
                    <p>
                        Model is based on work by Brandon Kriesten and Simonetta Liuti, University of Virginia.
                        <strong>
                        <ul>
                            <li>Theory of Deeply Virtual Compton Scattering off Unpolarized Proton (2020), 2004.08890 [hep-ph]</li>
                            <li>Extraction of Generalized Parton Distribution Observables from Deeply Virtual Electron Proton Scattering Experiments, Phys.Rev.D 101 (2020) 5, 054021 1903.05742 [hep-ph]</li>
                        </ul>
                        </strong>
                    </p>
                    </div>
                </div>
                <div className={Classes.DRAWER_FOOTER}>Footer</div>
            </Drawer>
            </>
        );
    }
}