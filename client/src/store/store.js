import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import userSlice from "./user.slice";
import urlSlice from "./url.slice";

const store = configureStore({
  reducer: {
    user: userSlice,
    urls: urlSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
