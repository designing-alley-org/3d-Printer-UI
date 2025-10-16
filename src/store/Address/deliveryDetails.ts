import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeliveryState {
  deliveryData: any[];
  selectedServiceType: string | null;
  selectedDeliveryData?: any[];
}

const initialState: DeliveryState = {
  deliveryData: [],
  selectedServiceType: '',
  selectedDeliveryData: undefined,
};

export const DeliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    addDeliveryData: (state, action: PayloadAction<any[]>) => {
      state.deliveryData = action.payload;
    },
    selectDeliveryData: (state, action: PayloadAction<any[]>) => {
      state.selectedDeliveryData = action.payload;
    },
    selectDeliveryPlan: (state, action: PayloadAction<string>) => {
      state.selectedServiceType = action.payload;
    },
    clearSelectedServiceType: (state) => {
      state.selectedServiceType = null;
    },
    resetDeliveryState: (state) => {
      state.deliveryData = [];
      state.selectedServiceType = null;
      state.selectedDeliveryData = undefined;
    },
  },
});

export const {
  addDeliveryData,
  selectDeliveryPlan,
  clearSelectedServiceType,
  resetDeliveryState,
  selectDeliveryData,
} = DeliverySlice.actions;

export default DeliverySlice.reducer;
