import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileDataDB } from '../../types/uploadFiles';
import { FileDetailsState } from '../types';

const initialState: FileDetailsState = {
  files: [],
  reverseDimensions: [],
  activeFileId: null,
};

export const CustomizationSlice = createSlice({
  name: 'fileDetails',
  initialState,
  reducers: {
    setActiveFileId: (state, action: PayloadAction<string>) => {
      state.activeFileId = action.payload || null;
    },

    setFiles: (state, action: PayloadAction<FileDataDB[]>) => {
      state.files = action.payload;
      state.reverseDimensions = action.payload.map((file) => ({
        _id: file._id,
        unit: file.unit,
        dimensions: file.dimensions,
        scalingFactor: file.scalingFactor || 1,
      }));

      state.activeFileId =
        action.payload.length > 0 ? action.payload[0]._id : null;
    },

    setFileDimension: (
      state,
      action: PayloadAction<{ id: string; key: string; value: number }>
    ) => {
      const fileIndex = state.files.findIndex(
        (file) => file._id === action.payload.id
      );
      if (fileIndex !== -1) {
        // Create a new dimensions object with the updated value
        const updatedDimensions = {
          ...state.files[fileIndex].dimensions,
          [action.payload.key]: action.payload.value,
        };
        // Update the file with new dimensions
        state.files[fileIndex] = {
          ...state.files[fileIndex],
          dimensions: updatedDimensions,
        };
      }
    },

    setRevertDimensions: (state, action: PayloadAction<{ _id: string }>) => {
      const { _id } = action.payload;
      const fileIndex = state.files.findIndex((file) => file._id === _id);
      if (fileIndex === -1) return; // file not found

      const originalData = state.reverseDimensions.find(
        (dim) => dim._id === _id
      );
      if (!originalData || !originalData.dimensions) return; // no backup found

      const file = state.files[fileIndex];


      // Revert only what's safe to restore
      state.files[fileIndex] = {
        ...file,
        dimensions: { ...originalData.dimensions },
        unit: originalData.unit,
        scalingFactor: originalData.scalingFactor, // revert to original scaling factor
      };
    },

    UpdateValueById: (
      state,
      action: PayloadAction<{ id?: string; data: Partial<FileDataDB> }>
    ) => {
      const fileIndex = state.files.findIndex(
        (file) => file._id === action.payload.id
      );
      if (fileIndex !== -1) {
        state.files[fileIndex] = {
          ...state.files[fileIndex],
          ...action.payload.data,
        };
      }
    },

    updateDimensionsValue: (
      state,
      action: PayloadAction<{ id: string; key: string; value: number }>
    ) => {
      const file = state.files.find((file) => file._id === action.payload.id);
      if (file) {
        file.dimensions = {
          ...file.dimensions,
          [action.payload.key]: action.payload.value,
        };
      }
      state.files = [...state.files];
    },

    updateUnit: (
      state,
      action: PayloadAction<{ id: string; unit: string }>
    ) => {
      const file = state.files.find((file) => file._id === action.payload.id);
      if (!file || file.unit === action.payload.unit) {
        return;
      }

      let convertedDimensions = { ...file.dimensions };

      if (file.unit === 'mm' && action.payload.unit === 'inch') {
        const conversionFactor = 0.0393701;
        convertedDimensions = {
          height: convertedDimensions.height * conversionFactor,
          width: convertedDimensions.width * conversionFactor,
          length: convertedDimensions.length * conversionFactor,
        };
      } else if (file.unit === 'inch' && action.payload.unit === 'mm') {
        const conversionFactor = 25.4;
        convertedDimensions = {
          height: convertedDimensions.height * conversionFactor,
          width: convertedDimensions.width * conversionFactor,
          length: convertedDimensions.length * conversionFactor,
        };
      }

      file.unit = action.payload.unit;
      file.dimensions = convertedDimensions;
      state.files = [...state.files];
    },

    updateWeight: (
      state,
      action: PayloadAction<{ id: string; weight: number }>
    ) => {
      const file = state.files.find((file) => file._id === action.payload.id);
      if (file) {
        file.weight = {
          value: action.payload.weight,
          unit: 'gm',
        };
      }
      state.files = [...state.files];
    },

    updateThumbnail: (
      state,
      action: PayloadAction<{ id: string; thumbnailUrl: string }>
    ) => {
      const file = state.files.find((file) => file._id === action.payload.id);
      if (file) {
        file.thumbnailUrl = action.payload.thumbnailUrl;
        file.isCustomized = true;
      }
      state.files = [...state.files];
    },

    setScalingFactor: (
      state,
      action: PayloadAction<{ id: string; scalingFactor: number }>
    ) => {
      const { id, scalingFactor } = action.payload;
      const file = state.files.find((f) => f._id === id);

      if (!file) return; // no file found, exit early

      const {  dimensions } = file;
      const previousScalingFactor = file.scalingFactor ?? 1;

      // Avoid 0 or negative scale (sanity check)
      if (scalingFactor <= 0) return;

      // Compute relative scaling (new vs old)
      const relativeScale = scalingFactor / previousScalingFactor;

      // Convert dimensions only for mm unit (extendable for others)
      if (dimensions) {
        file.dimensions = {
          height: dimensions.height * relativeScale,
          width: dimensions.width * relativeScale,
          length: dimensions.length * relativeScale,
        };
      }

      // Always update scaling factor at the end
      file.scalingFactor = scalingFactor;
    },
  },
});

export const {
  setActiveFileId,
  setFiles,
  updateWeight,
  setFileDimension,
  setRevertDimensions,
  updateDimensionsValue,
  UpdateValueById,
  updateUnit,
  updateThumbnail,
  setScalingFactor,
} = CustomizationSlice.actions;

export default CustomizationSlice.reducer;
