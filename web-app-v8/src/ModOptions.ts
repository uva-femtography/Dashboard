type Kinematics = {
    [key: string]: number;
    q2: number;
    t: number;
    xbj: number;
}

type MinMax = {
    max: number;
    min: number;
}

type Model = {
    name: string;
    t: MinMax;
    xbj: MinMax;
    q2: MinMax;
}

type ModelData = {
    kinematics: Kinematics[];
    model: Model[];
}

export type OptionConfig = {
    xbj: number[];
    t: number[];
    q2: number[];
    tMinMax: number[];
    xbjMinMax: number[];
    q2MinMax: number[];
}

const baseUrl = "http://localhost:5000/";

/**
 * Fetches data to the API to get new options once the user
 * has selected the model and the GPD
 * @param model The model chosen by the user
 * @param gpd The GPD as chosen by the user
 */

export default async function modModel(model: string, gpd: string) {
    let url = baseUrl + `api/${model}/${gpd}`;

    let response = await fetch(url);
    let data = await response.json();
    let separated = {
        xbj: extract("xbj", data),
        t: extract("t", data),
        q2: extract("q2", data),
        tMinMax: getTMinMax(data),
        xbjMinMax: getXbjMinMax(data)
    };
    return separated;

}

export async function modT(model: string, gpd: string, t: number){
    let url = baseUrl + `api/${model}/${gpd}/t/${t}`;
    if(t === -1 || t === -2){
        url = baseUrl + `api/${model}/${gpd}/t/${t.toFixed(1)}`;
    }
    let response = await fetch(url);
    let data = await response.json();
    let separated = {
        xbj: extract("xbj", data),
        q2MinMax: getq2MinMax(data),
    }
    return separated;
}

export async function modXbj(model: string, gpd: string, xbj: number){
    let url = baseUrl + `api/${model}/${gpd}/xbj/${xbj}`;
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    let separated = {
        t: extract("t", data),
        q2MinMax: getq2MinMax(data),
    }
    return separated;
}

/**
 * This function extracts a key from the data retrieved from the API
 * so it can easily be put into the dropdown menus
 * @param key The parameter chosen from the model e.g. xbj, q2, t
 * @param data The data fetched from the API
 * @returns An array with only the avaliable parameters
 */

function extract(key: string, data: ModelData) {
    let separated = [];

    //Iterates through the array and appends the values of the chosen key
    for (let i = 0; i < data.kinematics.length; i++) {
        let point = data.kinematics[i][key];
        if ( point != null) {
            separated.push(point);
        }
    }
    return separated;
}

/**
 * Gets the min and max for the t parameter
 * @param data The data fetched from the API
 * @returns An array with min as the zeroeth element, max as the first
 */
function getTMinMax(data: ModelData) {
    return [data.model[0].t.min, data.model[0].t.max];
}

/**
 * Gets the min and max for the xbj parameter
 * @param data The data fetched from the API
 * @returns An array with min as the zeroeth element, max as the first
 */
function getXbjMinMax(data: ModelData) {
    return [data.model[0].xbj.min, data.model[0].xbj.max];
}

/**
 * Gets the min and max for the q2 parameter
 * @param data The data fetched from the API
 * @returns An array with min as the zeroeth element, max as the first
 */
 function getq2MinMax(data: ModelData) {
    return [data.model[0].q2.min, data.model[0].q2.max];
}

export function getModelName(model: string): string {
    if (model === "BKM Model")
        return "fake";
    return "uva";
}

export async function getData(model: string, gpd: string, xbj: number, t: number, q2: number){
    let modelName = getModelName(model);
    let url = `${baseUrl}api/${modelName}/${gpd}/${xbj}/${t}/${q2}`;
    if(t === -1 || t === -2){
        url = `${baseUrl}api/${modelName}/${gpd}/${xbj}/${t.toFixed(1)}/${q2}`;
    }
    let response = await fetch(url);
    if(response.ok){
        return response.json();
    }
    return Promise.reject(response);

}
