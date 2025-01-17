import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeliveryState {
    deliveryData: any[]; 
    selectedServiceType: string | null; 
}

const initialState: DeliveryState = {
    deliveryData: [],
    selectedServiceType: "",
};

export const DeliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {
        addDeliveryData: (state, action: PayloadAction<any[]>) => {
            state.deliveryData = action.payload; 
        },
        selectDeliveryPlan: (state, action: PayloadAction<string>) => {
            state.selectedServiceType = action.payload; 
        },
        clearSelectedServiceType: (state) => {
            state.selectedServiceType = null; 
        },
        resetDeliveryState: () => initialState,
    },
});

export const { addDeliveryData, selectDeliveryPlan, clearSelectedServiceType, resetDeliveryState } = DeliverySlice.actions;

export default DeliverySlice.reducer;
