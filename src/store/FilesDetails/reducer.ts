import { createSlice } from '@reduxjs/toolkit';

export const FileDetailsSlice = createSlice({
    name: 'filedetails',
    initialState: [
        {
            FileDetails: {
                id: '',
                name: '',
                dimensions: {
                    height: 0,
                    width: 0,
                    length: 0,
                },
                quantity: 0,
                color: '',
                weight: 0,
                printer: '',
            },
        },
    ],
    reducers: {
        addFileDetails: (state, action) => {
            state.push({ FileDetails: action.payload });
        },
        updateDimensions: (state, action) => {
            const { id, dimensions } = action.payload;
            const file = state.find((item) => item.FileDetails.id === id);
            if (file) {
                file.FileDetails.dimensions = { ...file.FileDetails.dimensions, ...dimensions };
            }
        },
        updateColor: (state, action) => {
            const { id, color } = action.payload;
            const file = state.find((item) => item.FileDetails.id === id);
            if (file) {
                file.FileDetails.color = color;
            }
        },
        updateWeight: (state, action) => {
            const { id, weight } = action.payload;
            const file = state.find((item) => item.FileDetails.id === id);
            if (file) {
                file.FileDetails.weight = weight;
            }
        },
        updatePrinter: (state, action) => {
            const { id, printer } = action.payload;
            const file = state.find((item) => item.FileDetails.id === id);
            if (file) {
                file.FileDetails.printer = printer;
            }
        },

        getFileDetails: (state, action) => {
            const { id } = action.payload;
            const file = state.find((item) => item.FileDetails.id === id);
            if (file) {
                return file;
            }
            return null;

        }
    },
});

export const {
    addFileDetails,
    updateDimensions,
    updateColor,
    updateWeight,
    updatePrinter,
    getFileDetails,
} = FileDetailsSlice.actions;

export default FileDetailsSlice.reducer;
