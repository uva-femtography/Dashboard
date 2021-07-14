import { Navbar, Alignment, Button } from "@blueprintjs/core";

function Navigation(){
    return(
        <Navbar className="bp3-dark">
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>FemtoNet</Navbar.Heading>
                <Button className="bp3-minimal" text="Home"/>
                <Button className="bp3-minimal" text="Result" />
                <Button className="bp3-minimal" text="Contact" />
                <Button className="bp3-minimal" text="Simonetta Liuti" />
            </Navbar.Group>
        </Navbar>
    )
}

export default Navigation;