import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import { universityApi } from "./universityApi";

export default configureStore({
  reducer: {
    profile: profileReducer,
    [universityApi.reducerPath]: universityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(universityApi.middleware),
});
