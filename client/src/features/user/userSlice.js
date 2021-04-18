import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, signup } from './userAPI';

const initialState = {
    name: '',
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
};


export const loginAsync = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const response = await login({ email, password });
    return response.data;
  }
);

export const signupUser = createAsyncThunk(
    'user/signupUser',
    async ({ name, email, password }, {rejectWithValue}) => {
        try{
            const response = await signup({ name, email, password });
            console.log(response)
            return response.data;
        }catch(err){
            rejectWithValue(err)
        }
    }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
        state.user = null;
        localStorage.removeItem("user");
      },
    clearState: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isFetching = false;
  
        //return state;
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
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.email = action.payload.email;
        state.name = action.payload.name;
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      }) 
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
  },
});

export const { logout, clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
export const selectStatus = (state) => state.user.status;


export default userSlice.reducer;
