import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Quote {
  isClosed: boolean;
  // Add more fields based on your actual quote structure
}

interface QuoteState {
  quoteData: Quote[];
  quoteClosed: boolean;
}

const initialState: QuoteState = {
  quoteData: [],
  quoteClosed: false,
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setQuoteData: (state, action: PayloadAction<Quote[]>) => {
      state.quoteData = action.payload;
      const length = action.payload.length;
      state.quoteClosed =
        length > 0 &&
        action.payload[length - 1].isClosed;
    },
    setFalseQuoteData: (state) => {
      state.quoteClosed = false;
    }
  },
});

export const {
  setQuoteData,
  setFalseQuoteData,
} = quoteSlice.actions;

export default quoteSlice.reducer;
