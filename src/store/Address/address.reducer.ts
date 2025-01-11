import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddressState {
    addressData: any[];
    isCreateAddress: boolean;
    addressId: string;
}

const initialState: AddressState = {
    addressData: [],
    isCreateAddress: false,
    addressId: '',
};

export const AddressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        addAddress: (state, action: PayloadAction<any[]>) => {
            state.addressData = action.payload;
        },
        setAddressId: (state, action: PayloadAction<string>) => {
            state.addressId = action.payload;
        },
        toggleCreateAddress: (state) => {
            state.isCreateAddress = !state.isCreateAddress;
        },
    },
});

export const { addAddress, setAddressId, toggleCreateAddress } = AddressSlice.actions;

export default AddressSlice.reducer;
