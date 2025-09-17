import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUserQueryService, HelpTicket } from '../../services/query';

// Async thunk for fetching all user queries
export const getAllUserQuery = createAsyncThunk(
  'query/getAllUserQuery',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllUserQueryService();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch help tickets');
    }
  }
);

interface QueryState {
  helpTickets: HelpTicket[];
  loading: boolean;
  error: string | null;
}

const initialState: QueryState = {
  helpTickets: [],
  loading: false,
  error: null,
};

export const QuerySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearHelpTickets: (state) => {
      state.helpTickets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUserQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.helpTickets = action.payload;
        state.error = null;
      })
      .addCase(getAllUserQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearHelpTickets } = QuerySlice.actions;

export default QuerySlice.reducer;