import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MaterialWithMass {
    material_name: string;
    material_mass: number;
}

interface DataState {
    color: string[];
    material_with_mass: MaterialWithMass[];
    technologyType: string[];
}

const initialState: DataState = {
    color: [],
    material_with_mass: [],
    technologyType: [],
};

export const DataSlice = createSlice({
    name: 'imageData',
    initialState,
    reducers: {
       addDataSpec: (state, action: PayloadAction<DataState>) => {
        state.color = action.payload.color;
        state.material_with_mass = action.payload.material_with_mass;
        state.technologyType = action.payload.technologyType;
    
    },
}});

export const {
    addDataSpec
} = DataSlice.actions;

export default DataSlice.reducer;
