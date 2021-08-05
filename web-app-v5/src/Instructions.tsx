function Instructions() {
    return (
        <div className="instructions" >
            <h2>Instructions</h2>
            <ul>
                <li>Pick the GPD of interest from the dropdown menu.</li>
                <li>Pick the theoretical model.</li>
            </ul>

            <h2>Explanation of Grid Parameters</h2>
            <ul>
                <li>Choose kinematical parameters from the dropdown boxes. These are auto generated according to the gird points.</li>
                <li>Choose Q2 values to estimate.</li>
                <li>To download the results grid pick 'Download model as CSV' or press plot to generate interactive plot of the up(down) quark GPD versus x.</li>
            </ul>
        </div>
    );
}

export default Instructions;