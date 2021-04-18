import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from './userAPI';

const initialState = {
  user:localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null,
  status: 'idle',
};


export const loginAsync = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const response = await login({ email, password });
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
        state.user = null;
        localStorage.removeItem("user");
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      });
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;


export default userSlice.reducer;
