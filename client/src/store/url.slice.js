import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createUrl = createAsyncThunk(
  "createUrl",
  async (urlData, { rejectWithValue }) => {
    try {
      const { url } = urlData;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        "http://localhost:3000/url/create",
        { url },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
export const getHistory = createAsyncThunk(
  "getHistory",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/url/${id}`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUrl = createAsyncThunk(
  "deleteUrl",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/url/delete/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const urlSlice = createSlice({
  name: "url",
  initialState: {
    isLoading: false,
    newUrl: [{}],
    urls: [{}],
    error: null,
    history: [{}],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUrl.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newUrl = action.payload.newUrl;
      })
      .addCase(createUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.newUrl = "";
        state.error = action.payload;
      })
      .addCase(getAllUrls.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUrls.fulfilled, (state, action) => {
        state.isLoading = false;
        state.urls = action.payload.urls;
        state.error = null;
      })
      .addCase(getAllUrls.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.urls = [];
      })
      .addCase(getHistory.pending, (state) => {
        state.isLoading = true;
        (state.error = null), (state.history = []);
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.history = action.payload.entry;
        state.error = null;
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.history = [];
        state.error = action.payload;
      })
      .addCase(deleteUrl.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.urls = state.urls.filter((url) => url._id !== action.payload);
      })
      .addCase(deleteUrl.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.payload);
      });
  },
});

export default urlSlice.reducer;
