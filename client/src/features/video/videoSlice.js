import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from "../../helpers/api";

const initialState = {
    videoList: [],
    current: {},
    status: 'idle',
    errorMessage: '',
};


export const getVideos = createAsyncThunk(
  'video/getVideos',
  async ( _, {rejectWithValue}) => {
      try{
        const response = await api.get("/media/all");
        return response.data;
      }catch(err){
        return rejectWithValue(err)
      }

  }
);

export const getPatientVideo = createAsyncThunk(
  'video/getPatientVideo',
  async ( {id, userId}, {rejectWithValue}) => {
    console.log(id, userId)
      try{
        const response = await api.get(`/media/video/${id}/${userId}`);
        return response.data;
      }catch(err){
        return rejectWithValue(err)
      }

  }
);

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setCurrentVideo: (state, action) => {
      console.log(state.videoList.find((item) => item._id === action.payload))
      state.current = state.videoList.find((item) => item._id === action.payload)
    },
    addVideo: (state, action) => {
      state.videoList.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVideos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getVideos.fulfilled, (state, { payload }) => {
        console.log("done")
        state.videoList = payload;
        state.current = payload[0];
        getPatientVideo()
      })
      .addCase(getVideos.rejected, (state, { payload }) => {
        console.log("reject")
        state.errorMessage = payload.message;
      })
      .addCase(getPatientVideo.fulfilled, (state, { payload }) => {
        console.log("done")
        state.current.patient = payload[0];
      })
  },
});

export const { setCurrentVideo, addVideo } = videoSlice.actions

export const videoListSelector = (state) => state.video.videoList || [];
export const videoListStatus = (state) => state.video.status;
export const currentVideo = (state) => state.video.current || {};

export default videoSlice.reducer;
