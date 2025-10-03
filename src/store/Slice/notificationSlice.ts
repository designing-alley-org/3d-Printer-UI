import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { fetchNotifications, markAsRead } from '../../services/notification';
import { NotificationState } from '../types';



// Async thunk for fetching notifications
export const getNotifications = createAsyncThunk(
  'notifications/getNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchNotifications();
      return response.data;
    } catch (error: any) {
      toast.error('Failed to fetch notifications');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications');
    }
  }
);

// Async thunk for marking a notification as read
export const markNotificationAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async ({ messageId, conversationId }: { messageId: string; conversationId: string }, { rejectWithValue }) => {
    try {
      const data = await markAsRead({ messageId, conversationId });
      return { messageId, conversationId };
    } catch (error: any) {
      toast.error('Failed to mark notification as read');
      return rejectWithValue(error.response?.data?.message || 'Failed to mark notification as read');
    }
  }
);

const initialState : NotificationState = {
    notifications: [],
    pagination: null,
    length: 0,
    loading: false,
    error: null
}

// Notification slice
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications;
        state.length = action.payload.length;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const { messageId } = action.payload;
        state.notifications = state.notifications.map(n =>
          n.messageId === messageId ? { ...n, isRead: true } : n
        );
        state.length = Math.max(0, state.length - 1);
      });
  }
});

export default notificationSlice.reducer;