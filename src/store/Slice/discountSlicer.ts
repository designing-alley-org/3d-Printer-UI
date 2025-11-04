import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { acceptDiscountApi } from '../../services/discount';

interface DiscountState {
  loading: boolean;
  error: string | null;
}

const initialState: DiscountState = {
  loading: false,
  error: null,
};


// Async thunk for accepting a discount
export const acceptDiscount = createAsyncThunk(
  'discount/acceptDiscount',
    async (discountId: string, { rejectWithValue }) => {
    try {
      const data = await acceptDiscountApi(discountId);
      return data;
    } catch (error: any) {
      toast.error('Failed to accept discount');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to accept discount'
      );
    }
    }
);





// Discount slice
const discountSlice = createSlice({
  name: 'discount',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(acceptDiscount.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(acceptDiscount.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(acceptDiscount.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    }
});


export default discountSlice.reducer;