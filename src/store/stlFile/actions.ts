// actions.ts
import {
  ADD_FILE,
  REMOVE_FILE,
  UPDATE_FILE_PROGRESS,
  SET_ACTIVE_FILE,
} from './action_types';
import  { FileActionTypes } from '../types';


export const addFile = (file: File) => {
  return {
    type: ADD_FILE,
    payload: {
      id: `${file.name}_${file.lastModified}`,
      file
    },
  };
};

export const removeFile = (id: string): FileActionTypes => ({
  type: REMOVE_FILE,
  payload: id,
});

export const updateFileProgress = (id: string, progress: number): FileActionTypes => ({
  type: UPDATE_FILE_PROGRESS,
  payload: { id, progress },
});

export const setActiveFile = (id: string): FileActionTypes => ({
  type: SET_ACTIVE_FILE,
  payload: id,
});