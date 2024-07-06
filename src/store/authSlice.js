import { createSlice, Tuple } from "@reduxjs/toolkit";

const initialState = {
  authStatus: false,
  userData: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authStatus = true;
      state.userData = action.payload.userData;
    },
    logout: (state, action) => {
      state.authStatus = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
