import { createSlice } from '@reduxjs/toolkit';
export const UserDetailsSlice = createSlice({
  name: 'snackbar',
  initialState: {
    user: {
      _id: '',
      email: '',
      role: '',
      createdAt: '',
      updatedAt: '',
    },
  },
  reducers: {
    addUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addUserDetails } = UserDetailsSlice.actions;

export default UserDetailsSlice.reducer;
