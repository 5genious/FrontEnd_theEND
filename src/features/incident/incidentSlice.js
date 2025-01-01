import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import {
  hideLoading,
  importAllIncidents,
  importIncidents,
  importIncidentsOfTech,
  showLoading,
  paginationIncident,
} from "./incidentsSlice";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { importUserIdsByRole } from "../user/userSlice";
import { createNotification } from "../Notifications/notificationSlice";

const initialState = {
  isLoading: false,
  incident: null,
  userId: getUserFromLocalStorage()?.userId || null,
};

export const deleteIncident = createAsyncThunk(
  "incident/deleteIncident",
  async (id, thunkAPI) => {
    let url = `/api/incidents/delete?id=${id}`;
    thunkAPI.dispatch(showLoading());
    try {
      const resp = await customFetch.delete(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(paginationIncident({ page: 1 }));

      toast.success(resp.data);
      return resp.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      console.log("Erreur lors de la suppression :", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || "Failed to delete incident"
      );
    }
  }
);
export const updateIncident = createAsyncThunk(
  "incident/updateIncident",
  async (updatedData, thunkAPI) => {
    let url = `/api/incidents/update?id=${updatedData.id}`;
    console.log(updatedData);
    thunkAPI.dispatch(showLoading());
    try {
      const resp = await customFetch.patch(url, updatedData, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(paginationIncident({ page: 1 }));
      toast.success("modification avec succés");
      return resp.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      console.log("Erreur lors de la modification :", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || "Failed to update incident"
      );
    }
  }
);
//*Add Incident hna */
// export const addIncident = createAsyncThunk(
//   "incident/addIncident",
//   async ({ id, description }, thunkAPI) => {
//     console.log("-->" + id + description);
//     // Destructure l'objet ici
//     const token = thunkAPI.getState().user.user.token;

//     return addIncidentThunk(
//       `/api/incidents/save?id=${id}`,
//       { description }, // Passer le corps avec { description }
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//   }
// );
export const createIncident = createAsyncThunk(
  "incident/createIncident",
  async (data, thunkAPI) => {
    let url = `/api/incidents/save?id=${thunkAPI.getState().user.user.userId}`;
    try {
      const resp = await customFetch.post(url, data, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });

      thunkAPI.dispatch(paginationIncident({ page: 1, limite: 5 }));

      const roleName = "ADMIN"; // Remplace cela par le rôle que tu veux
      console.log("Rôle envoyé :", roleName); // Afficher le rôle envoyé
      const idsResponse = await thunkAPI
        .dispatch(importUserIdsByRole(roleName))
        .unwrap();

      console.log("Réponse des IDs des utilisateurs :", idsResponse);

      // Vérifier si idsResponse est valide et contient les IDs
      if (!Array.isArray(idsResponse)) {
        return thunkAPI.rejectWithValue(
          "La réponse des utilisateurs n'est pas un tableau"
        );
      }

      // Assumons que la réponse contient les IDs des utilisateurs
      const recipientIds = idsResponse.map((user) => user.id);
      console.log("IDs des destinataires :", recipientIds); // Afficher les IDs des destinataires

      const userState = thunkAPI.getState().user.user;

      // Dispatch de l'importation des incidents
      //thunkAPI.dispatch(paginationAllIncident({ page: 1, limite: 5 }))

      // Dispatch de la notification pour chaque destinataire
      recipientIds.forEach((recipientId) => {
        thunkAPI.dispatch(
          createNotification({
            senderId: userState.userId,
            recipientId: recipientId,
            contenu: `${userState.nom} a ajouté un incident`,
            type: "incident",
          })
        );
      });

      toast.success("Ajout avec succès");
      return resp.data;
    } catch (error) {
      console.error("Erreur lors de la création de l'incident :", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || "Failed to create incident"
      );
    }
  }
);

const incidentSlice = createSlice({
  name: "incident",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteIncident.rejected, (state, { payload }) => {
        console.log("Échec de la suppression :", payload);
        toast.error(payload);
      })
      .addCase(deleteIncident.fulfilled, (state, { payload }) => {
        console.log("akram hada " + payload);
      })
      .addCase(createIncident.fulfilled, (state, action) => {
        state.incident = action.payload;
        console.log("added");
      })
      .addCase(createIncident.rejected, (state, action) => {
        console.log("Échec de l'ajout :", action);
      })
      .addCase(updateIncident.fulfilled, (state, action) => {
        state.incident = action.payload;
      })
      .addCase(updateIncident.rejected, (state, action) => {
        console.log(state);
      });
  },
});

export default incidentSlice.reducer;
