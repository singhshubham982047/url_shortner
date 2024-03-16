import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUrls = createAsyncThunk(
  "getUrls",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/url/all-urls/${id}`,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

const allUrlsSlice = configureStore({
  name: "allUrl",
  initialState: {
    isLoading: false,
    allUrls: [],
    error: null,
  },
  reducers: {},
});
