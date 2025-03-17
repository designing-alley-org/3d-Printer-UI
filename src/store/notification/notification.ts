import { createSlice } from '@reduxjs/toolkit';

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notification: [],
  },
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    addNotification: (state, action) => {
      state.notification.push(action.payload);
    },
    deleteNotification: (state, action) => {
      state.notification = state.notification.filter((n) => n._id !== action.payload);
    }
  },
});

export const { setNotification, addNotification, deleteNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;