/* eslint-disable @typescript-eslint/no-explicit-any */
// reducer.ts
import { FileReducerState } from '../types';
import {
  ADD_FILE,
  REMOVE_FILE,
  UPDATE_FILE_PROGRESS,
  SET_ACTIVE_FILE,
} from './types';

const initialState: FileReducerState = {
  files: [],
  activeFileId: null,
};

const fileReducer = (state = initialState, action: any): FileReducerState => {
  switch (action.type) {
    case ADD_FILE:
      { const { file, id } = action.payload;
      return {
        ...state,
        files: [
          ...state.files,
          {
            id,
            file,
            name: file.name,
            size: `${file.size} bytes`,
            progress: 0,
          },
        ],
      }; }
    case REMOVE_FILE:
      return {
        ...state,
        files: state.files.filter((f) => f.id !== action.payload),
      };
    case UPDATE_FILE_PROGRESS:
      return {
        ...state,
        files: state.files.map((f) =>
          f.id === action.payload.id
            ? { ...f, progress: action.payload.progress }
            : f
        ),
      };
    case SET_ACTIVE_FILE:
      return {
        ...state,
        activeFileId: action.payload,
      };
    default:
      return state;
  }
};

export default fileReducer;
