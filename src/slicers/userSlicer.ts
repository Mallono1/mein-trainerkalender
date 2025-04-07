import { createSlice } from '@reduxjs/toolkit';

interface UserSlicer {
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  isUserOnline: boolean;
  viewUserID: string | number | null;
}

const initialState: UserSlicer = {
  userId: '',
  userName: '',
  userEmail: '',
  userRole: '',
  isUserOnline: false,
  viewUserID: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    setIsOnlineUser: (state, action) => {
      state.isUserOnline = action.payload;
    },
    setViewUserID: (state, action) => {
      state.viewUserID = action.payload;
    },
  },
});

export const {
  setUserId,
  setUserName,
  setUserEmail,
  setUserRole,
  setIsOnlineUser,
  setViewUserID,
} = userSlice.actions;
export default userSlice.reducer;
