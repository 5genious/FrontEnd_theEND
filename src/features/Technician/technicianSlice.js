import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import customFetch from "../../utils/axios";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  technicians: [],
  SelectedTechnicianId: 0,
};

export const getTechnicians = createAsyncThunk(
  "technicians/getAll",
  async (_, thunkAPI) => {
    let url = "/api/techniciens/all";
    try {
      const resp = await customFetch(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.msg || "Failed to fetch technicians"
      );
    }
  }
);
const technicianSlice = createSlice({
  name: "technician",
  initialState: initialState,

  reducers: {
    setSelectedTechnician: (state, action) => {
      state.SelectedTechnicianId = action.payload;
    },
  },

  extraReducers: (builder) => {
    return builder
      .addCase(getTechnicians.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTechnicians.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.technicians = payload;
      })
      .addCase(getTechnicians.rejected, (state) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export const { setSelectedTechnician } = technicianSlice.actions;
export default technicianSlice.reducer;
