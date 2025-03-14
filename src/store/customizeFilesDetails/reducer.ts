import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Dimensions {
  height: number;
  length: number;
  width: number;
  weight: number;
}

interface FileDetail {
  _id: string;
  fileName: string;
  fileUrl: string;
  quantity: number;
  color: string;
  material: string;
  technology: string;
  printer: string;
  unit: string;
  dimensions: Dimensions;
  infill: number;
}

interface FileDetailsState {
  files: FileDetail[];
}

const initialState: FileDetailsState = {
  files: [],
};

export const fileDetailsSlice = createSlice({
  name: 'fileDetails',
  initialState,
  reducers: {
    addFileDetails: (state, action: PayloadAction<FileDetail>) => {
      state.files = [...state.files, action.payload];
    },

    addAllFiles: (state, action: PayloadAction<FileDetail[]>) => {
      state.files = action.payload;
    },

    updateColor: (
      state,
      action: PayloadAction<{ id: string; color: string }>
    ) => {
      const { id, color } = action.payload;
      const file = state.files.find((file) => file._id === id);
      if (file) {
        file.color = color;
      }
    },

    updateTechnology: (
      state,
      action: PayloadAction<{ id: string; technology: string }>
    ) => {
      const { id, technology } = action.payload;
      const file = state.files.find((file) => file._id === id);
      if (file) {
        file.technology = technology;
      }
    },

    updateMaterial: (
      state,
      action: PayloadAction<{ id: string; material: string }>
    ) => {
      const { id, material } = action.payload;
      const file = state.files.find((file) => file._id === id);
      if (file) {
        file.material = material;
      }
    },
    updateWeight: (
      state,
      action: PayloadAction<{ id: string; weight: number }>
    ) => {
      const { id, weight } = action.payload;
      const file = state.files.find((file) => file._id === id);
      if (file) {
        file.dimensions.weight = weight;
      }
    },
    updateUnit: (
      state,
      action: PayloadAction<{ id: string; unit: string }>
    ) => {
      const { id, unit } = action.payload;
      const file = state.files.find((file) => file._id === id);
      if (file) {
        file.unit = unit;
      }
    },
    updatePrinter: (
      state,
      action: PayloadAction<{ id: string; printer: string }>
    ) => {
      const { id, printer } = action.payload;
      const file = state.files.find((file) => file._id === id);
      if (file) {
        file.printer = printer;
      }
    },
    updateInfill: (
      state,
      action: PayloadAction<{ id: string; infill: number }>
    ) => {
      const { id, infill } = action.payload;
      const file = state.files.find((file) => file._id === id);
      if (file) {
        file.infill = infill;
      }
    },
  },
});

export const {
  addFileDetails,
  updateColor,
  updateWeight,
  updateTechnology,
  updateMaterial,
  updatePrinter,
  addAllFiles,
  updateUnit,
  updateInfill,
} = fileDetailsSlice.actions;

export default fileDetailsSlice.reducer;
