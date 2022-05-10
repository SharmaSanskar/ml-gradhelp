import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userProfile: null,
  },
  reducers: {
    updateProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
