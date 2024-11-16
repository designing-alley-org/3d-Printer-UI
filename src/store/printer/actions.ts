import { IPrinterDetails } from '../types';
import {
  GET_PRINTER,
  GET_PRINTER_FAILURE,
  GET_PRINTER_SUCCESS,
} from './action_types';
import { Dispatch } from 'redux';
import api from '../../axiosConfig';

//   export const getPrinter = () => ({
//     type: GET_PRINTER,

//   });

//   export const updatePrinter = (id: string) => ({
//     type: REMOVE_FILE,
//     payload: id,
//   });

export const fetchPrinters = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_PRINTER });
  try {
    const response = await api.get<IPrinterDetails[]>('/printers');
    dispatch({
      type: GET_PRINTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRINTER_FAILURE,
      error: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

//   export const deletePrinter = (id: string, progress: number) => ({
//     type: UPDATE_FILE_PROGRESS,
//     payload: { id, progress },
//   });

//   export const setActiveFile = (id: string) => ({
//     type: SET_ACTIVE_FILE,
//     payload: id,
//   });
