import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { jwtDecode } from "jwt-decode";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  isFinalUser: getUserFromLocalStorage()?.roles?.includes("USER") || false,
  user: getUserFromLocalStorage(),
  users: [],
  userInfo: [],
  // userInfos: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const importUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkAPI) => {
    let url = "/api/users";
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.msg || "Failed to fetch users"
      );
    }
  }
);

// get one user

export const getUserInfo = createAsyncThunk(
  "incidents/getUserInfo",
  async (_, thunkAPI) => {
    const url = `/api/users/getUserInfo?id=${
      thunkAPI.getState().user.user.userId
    }`;
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.msg || "Failed to get user informations"
      );
    }
  }
);
export const importUserIdsByRole = createAsyncThunk(
  "user/getUserIdsByRole",
  async (roleName, thunkAPI) => {
    const url = `/api/users/role/${roleName}`;
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });

      console.log("Réponse de l'API:", resp.data);
      if (!Array.isArray(resp.data)) {
        return thunkAPI.rejectWithValue(
          "La réponse de l'API n'est pas un tableau"
        );
      }

      return resp.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des utilisateurs par rôle:",
        error
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg ||
          "Failed to fetch users with role " + roleName
      );
    }
  }
);

export const addEnseignant = createAsyncThunk(
  "user/RegisterEnseignant",
  async (user, thunkAPI) => {
    let url = "/api/users/saveEnseignant";
    console.log(user);
    try {
      const resp = await customFetch.post(url, user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(importUsers());
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const addEtudiant = createAsyncThunk(
  "user/RegisterUser",
  async (user, thunkAPI) => {
    let url = "/api/users/saveEtudiant";
    console.log(user);
    try {
      const resp = await customFetch.post(url, user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(importUsers());
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const uploadExcel = createAsyncThunk(
  "user/uploadExcel",
  async (formData, thunkAPI) => {
    let url = "/api/users/upload";
    try {
      console.log("FormData content:", Array.from(formData.entries()));
      const resp = await customFetch.post(url, formData, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      toast.success("Fichier importé avec succès !");
      thunkAPI.dispatch(importUsers());
      return resp.data;
    } catch (error) {
      toast.error(
        error.response?.data || "Erreur lors de l'importation du fichier"
      );
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const addTechnicien = createAsyncThunk(
  "user/addTechnicien",
  async (user, thunkAPI) => {
    let url = "/api/users/saveTechnicien";
    console.log(user);
    try {
      const resp = await customFetch.post(url, user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(importUsers());
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "demande/deleteUser",
  async (id, thunkAPI) => {
    let url = `/api/users/delete?id=${id}`;
    try {
      const resp = await customFetch.delete(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      toast.success(resp.data);
      thunkAPI.dispatch(importUsers());
      return resp.data;
    } catch (error) {
      toast.error("l'utisateur contient des incidents ou des demandes");
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || "Failed to delete demande"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userData }, thunkAPI) => {
    const url = `/api/users/updateUserInformations?idUser=${
      thunkAPI.getState().user.user.userId
    }`;
    console.log(userData);
    // Transformez `userData` en FormData
    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });

    // console.log("FormData envoyéee :", formData); // Debugging

    try {
      const resp = await customFetch.patch(url, formData, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      // Gestion des erreurs
      console.error("Error during update:", error);
      const errorMessage = error.response?.data?.msg || "Failed to update user";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { accessToken } = payload;
        const decodedToken = jwtDecode(accessToken);
        state.isLoading = false;
        state.user = {
          nom: decodedToken.sub,
          roles: decodedToken.scope,
          userId: decodedToken.userId,
          token: accessToken,
        };
        addUserToLocalStorage(state.user);
        toast.success(`Welcome Back ${state.user.nom}`);
        // Mettre à jour isFinalUser en fonction du rôle
        state.isFinalUser = state.user.roles.includes("USER");
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        toast.error("Invalid credentials");
      })
      .addCase(importUserIdsByRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importUserIdsByRole.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(importUserIdsByRole.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload || "Failed to fetch users2");
      })
      .addCase(importUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload;
      })
      .addCase(importUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(addEnseignant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEnseignant.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(addEnseignant.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(addEtudiant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEtudiant.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(addEtudiant.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(uploadExcel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadExcel.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(uploadExcel.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(addTechnicien.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTechnicien.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(addTechnicien.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getUserInfo.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getUserInfo.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userInfo = payload.data;
        // toast.success("good to see you");
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // console.log("pauload hadi");
        // console.log(payload);
        toast.success("User informations updated!");
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload); // Affichage du message d'erreur
      });
  },
});
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
