import { BaseSyntheticEvent, useState } from 'react';

export interface Options {
    //Line 6 allows for strings to be used as indexes
    [index: number]: string;
    gpd: string;
    model: string;
    xbj: number;
    t: number;
    q2: number;
}

function Options() {
    let gpdOptions: string[] = ["GPD_E", "GPD_H"];
    let modelOptions: string[] = ["BKM Model", "UVA Model"];
    let xbjOptions: number[] = [0.0001, 0.0002, 0.0004, 0.0006, 0.0008, 0.001, 0.002, 0.004, 0.006, 0.008, 0.01, 0.02, 0.04, 0.06, 0.08, 0.1, 0.2, 0.4, 0.6];
    let tOptions: number[] = [...Array(19).keys()].map(n => -(n + 1) / 10);

    const [options, setOptions] = useState<Options>({ gpd: "GPD_E", model: "BKM Model", xbj: 0.001, t: -0.1, q2: 0.1 });
}

export default Options;