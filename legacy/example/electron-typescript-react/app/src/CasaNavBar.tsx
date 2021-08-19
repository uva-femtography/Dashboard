import * as React from "react";
import { 
    Alignment,
    Button,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
} from "@blueprintjs/core";
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';

export class CasaNavBar extends React.PureComponent{
    public render(){        
        return (
            <Navbar className="bp3-dark">
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>FemtoNET</NavbarHeading>
                    <NavbarDivider />
                    <Button className="bp3-minimal bp3-dark" icon="home" text="Home" />
                    <Button className="bp3-minimal bp3-dark" icon="document" text="Tools" />
                </NavbarGroup>
            </Navbar>
        );
    }
}