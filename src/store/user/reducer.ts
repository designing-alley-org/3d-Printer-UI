import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  googleId?: string;
}

export const UserDetailsSlice = createSlice({
  name: 'snackbar',
  initialState: {
    user: {
      _id: '',
      email: '',
      role: '',
      createdAt: '',
      updatedAt: '',
    } as UserState,
  },
  reducers: {
    addUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addUserDetails } = UserDetailsSlice.actions;

export default UserDetailsSlice.reducer;
