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
      state.quoteClosed =
        action.payload.length > 1 &&
        action.payload.every((quote) => quote.isClosed);
    },
    setFalseQuoteData: (state) => {
      state.quoteClosed = false;
    },
    resetQuoteState: () => ({
      ...initialState,
    }),
  },
});

export const {
  setQuoteData,
  setFalseQuoteData,
  resetQuoteState,
} = quoteSlice.actions;

export default quoteSlice.reducer;
