import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a proper interface for the address object
interface Address {
    _id: string;
    // Add other address properties here, for example:
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    // ... other address fields
}

interface AddressState {
    addressData: Address[];
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
        addAddress: (state, action: PayloadAction<Address[]>) => {
            state.addressData = action.payload;
        },
        deleteAddressRedux: (state, action: PayloadAction<string>) => {
            state.addressData = state.addressData.filter(
                (address) => address._id !== action.payload
            );
        },
        setAddressId: (state, action: PayloadAction<string>) => {
            state.addressId = action.payload;
        },
        toggleCreateAddress: (state) => {
            state.isCreateAddress = !state.isCreateAddress;
        },
    },
});

export const {
    addAddress,
    setAddressId,
    toggleCreateAddress,
    deleteAddressRedux,
} = AddressSlice.actions;

export default AddressSlice.reducer;