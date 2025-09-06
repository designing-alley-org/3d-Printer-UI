import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileData, Weight } from '../../types/uploadFiles';

export interface FileDetailsState {
  files: FileData[];
  updateFiles: FileData[] ;
  activeFileId: string | null;
}

const initialState: FileDetailsState = {
  files: [],
  updateFiles: [],
  activeFileId: null,
};

export const fileDetailsSlice = createSlice({
  name: 'fileDetails',
  initialState,
  reducers: {

    setActiveFile: (state, action: PayloadAction<string>) => {
      state.activeFileId = action.payload || null;
    },

    addAllFiles: (state, action: PayloadAction<FileData[]>) => {
      state.files = action.payload;
      state.updateFiles = action.payload;
    },

    UpdateValueById: (state, action: PayloadAction<{ id: string; data:FileData }>) => {
      if (state.updateFiles) {
        const file = state.updateFiles.find((file) => file._id === action.payload.id);
        if (file) {
          Object.assign(file, action.payload.data);
        }
      }
    },

    updateWeight: (state, action: PayloadAction<{ id: string; weight: Weight }>) => {
      const file = state.updateFiles.find((file) => file._id === action.payload.id);
      if (file) {
        file.weight = action.payload.weight;
      }
    },
  },
});

export const {
  setActiveFile,
  addAllFiles,
  UpdateValueById,
  updateWeight

} = fileDetailsSlice.actions;

export default fileDetailsSlice.reducer;
