import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "login",
  async (userData, { rejectWithValue }) => {
    try {
      const { email, password } = userData;
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        "http://localhost:3000/user/login",
        { email, password },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("http://localhost:3000/user/logout", {
        withCredentials: true,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "register",
  async (userData, { rejectWithValue }) => {
    try {
      const { email, password, fullname } = userData;
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        "http://localhost:3000/user/register",
        { email, password, fullname },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: {},
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.newUser;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.error = action.payload;
      });
  },
});

export const clearError = userSlice.actions.clearError;
export default userSlice.reducer;
