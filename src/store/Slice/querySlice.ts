import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createHelpService,
  getAllUserQueryService,
} from '../../services/query';
import { HelpFormData } from '../../validation/helpQuery';
import { HelpPayload } from '../../types/query';

// Async thunk for fetching all user queries
export const getAllUserQuery = createAsyncThunk(
  'query/getAllUserQuery',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllUserQueryService();
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch help tickets'
      );
    }
  }
);

export const createQuery = createAsyncThunk(
  'query/createQuery',
  async (payload: HelpFormData, { rejectWithValue }) => {
    try {
      const data = await createHelpService(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create help ticket'
      );
    }
  }
);

interface QueryState {
  helpTickets: HelpPayload[];
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
      })
      .addCase(createQuery.pending, (state) => {
        state.error = null;
      })
      .addCase(createQuery.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(createQuery.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearHelpTickets } = QuerySlice.actions;

export default QuerySlice.reducer;

// // "data": {
//         "_id": "68dfc6541100191de4d9a8d1",
//         "type": "Negotiation",
//         "subject": "Negotiation regarding",
//         "userId": "686ba3d42d905a26520b7193",
//         "status": "Open",
//         "createdAt": "2025-10-03T12:49:24.279Z",
//         "updatedAt": "2025-10-03T12:49:24.279Z",
//         "__v": 0,
//         "order_number": null
//     }
