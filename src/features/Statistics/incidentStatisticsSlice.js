import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";

const incidentsStatistics = {
  isLoading: false,
  stats: {
    incidentsMensuels: 0,
    incidentsMensuelsEA: 0,
    incidentsMensuelsEC: 0,
    incidentsMensuelsT: 0,
    incidentsMensuelsAnn: 0,
    incidentsAnnuels: [],
    incidentsAnnuelsByTypes: [],
    incidentsTraitesParTech: [],
  },
};

export const getStatistics = createAsyncThunk(
  "incidentStatistics/getStatistics",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const response = await customFetch("/api/incidents/statistics", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      toast.error("Error in fetching incidents statistics");
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const incidentsStatisticsSlice = createSlice({
  name: "incidentStatistics",
  initialState: incidentsStatistics,
  extraReducers: (builder) => {
    builder
      .addCase(getStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStatistics.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
        state.stats.incidentsMensuels = payload.incidentMensuels;
        state.stats.incidentsMensuelsEA = payload.incidentsMensuelsEA;
        state.stats.incidentsMensuelsEC = payload.incidentsMensuelsEC;
        state.stats.incidentsMensuelsT = payload.incidentsMensuelsT;
        state.stats.incidentsMensuelsAnn = payload.incidentsMensuelsAnn;
        state.stats.incidentsAnnuels = payload.incidentsAnnuels;
        state.stats.incidentsTraitesParTech = payload.incidentsTraitesParTech;
        state.stats.incidentsAnnuelsByTypes = payload.incidentsAnnuelsByTypes;
      })
      .addCase(getStatistics.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default incidentsStatisticsSlice.reducer;
