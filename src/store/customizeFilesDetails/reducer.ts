import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Dimensions {
  height: number;
  length: number;
  width: number;
  weight?: number;
}

export interface FileDetail {
  _id: string;
  fileName: string;
  fileUrl: string;
  quantity: number;
  color: string;
  material: string;
  technology: string;
  printer: string;
  unit: string;
  dimensions: any;
  infill: number;
}

export interface FileDetailsState {
  files: FileDetail[];
  updateFiles: FileDetail[] ;
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

    addAllFiles: (state, action: PayloadAction<FileDetail[]>) => {
      state.files = action.payload;
      state.updateFiles = action.payload;
    },

    UpdateValueById: (state, action: PayloadAction<{ id: string; data:FileDetail }>) => {
      if (state.updateFiles) {
        const file = state.updateFiles.find((file) => file._id === action.payload.id);
        if (file) {
          Object.assign(file, action.payload.data);
        }
      }
    },

    updateWeight: (state, action: PayloadAction<{ id: string; weight: number }>) => {
      const file = state.updateFiles.find((file) => file._id === action.payload.id);
      if (file) {
        file.dimensions.weight = action.payload.weight;
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
