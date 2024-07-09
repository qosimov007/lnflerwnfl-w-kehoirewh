import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  user: null,
  authReady: false,
};

const userSlice = createSlice({
  name: "currentUser",
  initialState: defaultState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    isAuthReady: (state, { payload }) => {
      state.authReady = payload;
    },
    clear: (state) => {
      state.user = "";
    },
  },
});

export const { login, clear, isAuthReady } = userSlice.actions;
export default userSlice.reducer;
