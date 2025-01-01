import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'

const initialState = {
  isLoading: false,
  demandes: [],
}

export const importAllDemandes = createAsyncThunk(
  'demandes/getAllDemandes',
  async (_, thunkAPI) => {
    let url = '/api/demandes/all'
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.msg || 'Failed to fetch demandes'
      )
    }
  }
)
export const importDemandesByPriorite = createAsyncThunk(
  'demandes/getDemandesByPriorite',
  async (priorite, thunkAPI) => {
    let url = `/api/demandes/DemandeByPriorite?priorite=${priorite}`
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.msg || 'Failed to fetch demandes'
      )
    }
  }
)

export const importDemandes = createAsyncThunk(
  'demandes/getDemandes',
  async (_, thunkAPI) => {
    let url = `api/demandes/demandesOfUser?id=${
      thunkAPI.getState().user.user.userId
    }`
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.msg || 'Failed to fetch demandes of User'
      )
    }
  }
)

const demandesSlice = createSlice({
  name: 'demandes',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(importAllDemandes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(importAllDemandes.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.demandes = payload
      })
      .addCase(importAllDemandes.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(importDemandes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(importDemandes.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.demandes = payload
      })
      .addCase(importDemandes.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(importDemandesByPriorite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(importDemandesByPriorite.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.demandes = payload
      })
      .addCase(importDemandesByPriorite.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})
export const { showLoading, hideLoading } = demandesSlice.actions
export default demandesSlice.reducer
