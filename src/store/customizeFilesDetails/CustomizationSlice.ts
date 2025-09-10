import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  FileDataDB, Weight } from '../../types/uploadFiles';
import { FileDetailsState } from '../types';
import { stat } from 'fs';



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
      state.reverseDimensions = action.payload.map(file => ({
        _id: file._id,
        unit: file.unit,
        dimensions: file.dimensions
      }));
      state.activeFileId = action.payload.length > 0 ? action.payload[0]._id : null;
    },

    setFileDimension: (state, action: PayloadAction<{ id: string; key:string; value:number }>) => {
      const fileIndex = state.files.findIndex((file) => file._id === action.payload.id);
      if (fileIndex !== -1) {
        // Create a new dimensions object with the updated value
        const updatedDimensions = {
          ...state.files[fileIndex].dimensions,
          [action.payload.key]: action.payload.value
        };
        // Update the file with new dimensions
        state.files[fileIndex] = {
          ...state.files[fileIndex],
          dimensions: updatedDimensions
        };
      }
    },

    setRevertDimensions: (state, action: PayloadAction<{ _id: string; }>) => {
      const fileIndex = state.files.findIndex((file) => file._id === action.payload._id);
      const originalData = state.reverseDimensions.find((dim) => dim._id === action.payload._id);
      
      if (fileIndex !== -1 && originalData) {
        state.files[fileIndex] = {
          ...state.files[fileIndex],
          dimensions: originalData.dimensions,
          unit: originalData.unit
        };
      }
    },

    UpdateValueById: (state, action: PayloadAction<{ id: string; data: Partial<FileDataDB> }>) => {
      const fileIndex = state.files.findIndex((file) => file._id === action.payload.id);
      if (fileIndex !== -1) {
        state.files[fileIndex] = {
          ...state.files[fileIndex],
          ...action.payload.data
        };
      }
    },



    updateWeight: (state, action: PayloadAction<{ id: string; weight: number }>) => {
      const file = state.files.find((file) => file._id === action.payload.id);
      if (file) {
        file.weight = {
          value: action.payload.weight,
          unit: 'gm'
        };
      }
      state.files = [...state.files];
      
    },
  },
});

export const {
  setActiveFileId,
  setFiles,
  updateWeight,
  setFileDimension,
  setRevertDimensions,
  UpdateValueById
} = CustomizationSlice.actions;

export default CustomizationSlice.reducer;
