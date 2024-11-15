/* eslint-disable @typescript-eslint/no-explicit-any */
// import { IPrinterDetails} from "../types";
// import { IPrinterDetails } from '../types';
import {
  GET_PRINTER,
  GET_PRINTER_FAILURE,
  GET_PRINTER_SUCCESS,
} from './action_types';
// import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./action_types";

// const initialState: IPrinterDetails = {
//   printerName: '',
//   Model: '',
//   technologyType: '',
//   buildVolume: '',
//   layerResolution: '',
//   materialCompatibility: '',
//   nozzleSize: '',
//   printSpeed: '',
//   extruders: 0,
//   maxBedHeat: '',
//   heatSinkSize: '',
// };
const initialState = {
    // initial values
    // loading: false,
    // error: null,
    printerDetails: [],
};

export const printerReducer = (state = initialState, action: any) => {
    console.log(action.payload);
  switch (action.type) {
    case GET_PRINTER:
      return {
        ...state,
      };
    case GET_PRINTER_SUCCESS:
      return {
        ...state,
        // loading: false,
        printerDetails: action.payload,
      };
    case GET_PRINTER_FAILURE:
      return initialState;
    default:
      return state;
  }
};
