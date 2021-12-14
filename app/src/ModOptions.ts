import { ObjectFlags } from "typescript";
import { Point } from "./Options";

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

const baseUrl = "http://femtography.uvadcos.io/";

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
        return "bkm";
    return "uva";
}

export async function getData(model: string, gpd: string, xbj: number, t: number, q2: number){
    let modelName = getModelName(model);
    let url = `${baseUrl}api/${modelName}/${gpd}/${xbj}/${toFloat(t)}/${toFloat(q2)}`;
    
    let response = await fetch(url);
    if(response.ok){
        return response.json();
    }
    return Promise.reject(response);

}

/**
 * Helper function required because the API takes in floats
 * as inputs, not integers. This converts an integer input into 
 * a float if necessary. Note that the parameters can be both a number and a string
 * because Javascript interprets dropdown inputs as strings, but Typescript as numbers.
 * @param num The number to convert
 * @returns The original number if no conversion needed, a float if the input is an int
 */

function toFloat(num: number | string){
    let float: number = 0;
    //At runtime, Javascript interprets q2 and t values as strings
    if(typeof num === "string"){
        //If the input is an integer, convert into float
        float = Number.parseFloat(num);
        if(float === Number.parseInt(num)){
            //If it is an integer, add .0 to it for the API
            return float.toFixed(1);
        }
        return float;
    }
    else if(typeof num === "number"){
        float = Number.parseFloat(num.toString());
        if(float === Number.parseInt(num.toString())){
            return float.toFixed(1);
        }
    }
    return num;
}

export function extractVar(data: Point[]){
    let keys:string[] = Object.keys(data[0]);
    return keys.slice(1); //Excludes x
    
}