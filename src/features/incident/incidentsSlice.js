import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { importUserIdsByRole } from "../user/userSlice";
import { createNotification } from "../Notifications/notificationSlice";

const initialState = {
  isLoading: false,
  incidents: [],
  incidentTotal: [],
};
export const importAllIncidents = createAsyncThunk(
  "incidents/getAllIncidents",
  async ({ page }, thunkAPI) => {
    let url = `/api/incidents/incidentPagination?page=${page}`;

    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      await thunkAPI.dispatch(importAllIncidentNombreTotal());
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.msg || "Failed to fetch incidents"
      );
    }
  }
);
//bach n fetcher total
export const importAllIncidentNombreTotal = createAsyncThunk(
  "incidents/getAllIncidentTotal",
  async (_, thunkAPI) => {
    let url = "/api/incidents/all";
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.msg || "Failed to fetch incidents"
      );
    }
  }
);
export const importIncidentsByPriorite = createAsyncThunk(
  "incidents/getIncidentsByPriorite",
  async (priorite, thunkAPI) => {
    let url = `/api/incidents/IncidentByPriorite?priorite=${priorite}`;

    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.msg || "Failed to fetch incidents"
      );
    }
  }
);
export const importIncidentsByFilters = createAsyncThunk(
  "incidents/getIncidentsByFilters",
  async ({ value1, value2, value3 }, thunkAPI) => {
    let url = `/api/incidents/IncidentByFilters?priorite=${value1}&status=${value2}&typeIncident=${value3}`;
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.msg || "Failed to fetch incidents"
      );
    }
  }
);
/*
export const importIncidentsByCriteria = createAsyncThunk(
  'incidents/getIncidentsByCriteria',
  async ({ search, selectedValue }, thunkAPI) => {
    let url = `/api/incidents/IncidentByCriteria/${selectedValue}?keyword=${search}`

    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.msg || "Failed to fetch incidents"
      );
    }
  }
);

)
*/
export const importIncidents = createAsyncThunk(
  "incidents/getIncidents",
  async (_, thunkAPI) => {
    let url = `/api/incidents/incidentsOfUser?id=${
      thunkAPI.getState().user.user.userId
    }`;
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.msg || "Failed to fetch incidents of user"
      );
    }
  }
);

export const importIncidentsOfTech = createAsyncThunk(
  "incidents/getIncidentsOfTech",
  async (_, thunkAPI) => {
    let url = `/api/incidents/incidentsOfTechnicien?id=${
      thunkAPI.getState().user.user.userId
    }`;
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.msg || "Failed to fetch incidents of Technicien"
      );
    }
  }
);
export const affectIncidentsToTechnician = createAsyncThunk(
  "incidents/affect",
  async ({ selectedRows, SelectedTechnicianId }, thunkAPI) => {
    console.log(selectedRows + SelectedTechnicianId);
    const url = `api/incidents/addIncidentsToTechnicien?idincidents=${selectedRows.join(
      ","
    )}&idTechnicien=${SelectedTechnicianId}`;
    try {
      const resp = await customFetch.post(
        url,
        {},
        {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        }
      );
      thunkAPI.dispatch(paginationIncident({ page: 1 }));
      console.log("Réponse après affectation :", resp);

      // Met à jour les incidents assignés au technicien
      console.log("Incidents du technicien mis à jour k");

      // Crée une notification
      const userState = thunkAPI.getState().user.user;
      await thunkAPI.dispatch(
        createNotification({
          senderId: userState.userId,
          recipientId: SelectedTechnicianId,
          contenu: `Vous avez un incident à traiter`,
          type: "incident",
        })
      );

      return resp;
    } catch (error) {
      console.error("Erreur lors de l'affectation des incidents :", error);
      return thunkAPI.rejectWithValue(
        error.response.data.msg || "Failed to affect incidents to Technician"
      );
    }
  }
);
// pagination des incidents
export const paginationIncident = createAsyncThunk(
  "incidents/pagination",
  async ({ page }, thunkAPI) => {
    const url = `/api/incidents/incidentsOfUserPaginated?idUser=${
      thunkAPI.getState().user.user.userId
    }&page=${page}`;
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      await thunkAPI.dispatch(importIncidents());
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.msg || "Failed to affect incidents to Technician"
      );
    }
  }
);

const incidentsSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(importAllIncidents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importAllIncidents.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.incidents = payload;
      })
      .addCase(importAllIncidents.rejected, (state, { payload }) => {
        state.isLoading = false;

        toast.error(payload);
      })
      .addCase(importAllIncidentNombreTotal.fulfilled, (state, { payload }) => {
        console.log("akram hada");
        state.incidentTotal = payload;
      })

      .addCase(importIncidents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importIncidents.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.incidentTotal = payload;
      })
      .addCase(importIncidents.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(importIncidentsOfTech.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importIncidentsOfTech.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.incidents = payload;
      })
      .addCase(importIncidentsOfTech.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(importIncidentsByPriorite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importIncidentsByPriorite.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.incidents = payload;
      })

      .addCase(importIncidentsByFilters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importIncidentsByFilters.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.incidents = payload;
      })
      .addCase(importIncidentsByFilters.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(affectIncidentsToTechnician.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(affectIncidentsToTechnician.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.incidents = payload;
      })
      .addCase(affectIncidentsToTechnician.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(paginationIncident.rejected, (state, { payload }) => {
        state.isLoading = false;
        //console.log("error" + payload);
      })
      .addCase(paginationIncident.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.incidents = payload.data;
        // state.incidentTotal = payload.total;
        console.log(payload);
      });
  },
});
export const { showLoading, hideLoading } = incidentsSlice.actions;
export default incidentsSlice.reducer;
