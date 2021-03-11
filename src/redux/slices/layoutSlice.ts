import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  errorCode: null,
};

const layoutSlice = createSlice({
  name: "layoutData",
  initialState,

  reducers: {
    setLoadingRedux: (state, action) => {
      state.loading = action.payload;
    },

    consumeErrorCode: (state) => {
      state.errorCode = null;
    },

    setErrorCode: (state, action) => {
      state.errorCode = action.payload;
    },
  },
});

export const {
  setLoadingRedux,
  consumeErrorCode,
  setErrorCode,
} = layoutSlice.actions;

export default layoutSlice.reducer;
