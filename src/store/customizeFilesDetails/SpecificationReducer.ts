import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SpecificationState } from '../types';

const initialState: SpecificationState = {
    colors: [],
    materials: [],
    technologies: [],
};

export const DataSlice = createSlice({
    name: 'imageData',
    initialState,
    reducers: {
       addDataSpec: (state, action: PayloadAction<SpecificationState>) => {
        state.colors = action.payload.colors;
        state.materials = action.payload.materials;
        state.technologies = action.payload.technologies;

    },
}});

export const {
    addDataSpec
} = DataSlice.actions;

export default DataSlice.reducer;
