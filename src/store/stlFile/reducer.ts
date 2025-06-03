// reducer.ts
import { FileReducerState, FileActionTypes } from '../types';
import {  ADD_FILE, REMOVE_FILE, UPDATE_FILE_PROGRESS, SET_ACTIVE_FILE } from './action_types';


const initialState: FileReducerState = {
  files: [],
  activeFileId: null,
};




const fileReducer = ( state = initialState,action: FileActionTypes): FileReducerState => {
  switch (action.type) {
    case ADD_FILE: {
      const { file, id } = action.payload;
        // Check for duplicate files
        if (state.files.some(f => f.name === file.name)) {
          console.warn('File already exists');
          return state;
        }

      // Create a new file entry with required properties
      const newFile = {
        id,
        file,
        name: file.name,
        size: `${file.size} bytes`,
        progress: 0,
      };

      return {
        ...state,
        files: [...state.files, newFile], // Immutable update
      };
    
    }
   
     
    case REMOVE_FILE: {
      const newFiles = state.files.filter((f) => f.id !== action.payload);
      return {
        ...state,
        files: newFiles,
        // Reset activeFileId if we're removing the active file
        activeFileId: state.activeFileId === action.payload ? 
          (newFiles.length > 0 ? newFiles[0].id : null) : 
          state.activeFileId,
      };
    }

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
