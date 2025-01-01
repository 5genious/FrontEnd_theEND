import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import {
  hideLoading,
  importAllDemandes,
  importDemandes,
  showLoading,
} from './demandesSlice'

const initialState = {
  isLoading: false,
  demande: null,
}

export const deleteDemande = createAsyncThunk(
  'demande/deleteDemande',
  async (id, thunkAPI) => {
    let url = `/api/demandes/delete?id=${id}`
    thunkAPI.dispatch(showLoading())
    try {
      const resp = await customFetch.delete(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      if (thunkAPI.getState().user.user.roles.includes('USER')) {
        thunkAPI.dispatch(importDemandes())
      } else {
        thunkAPI.dispatch(importAllDemandes())
      }
      toast.success(resp.data)
      return resp.data
    } catch (error) {
      thunkAPI.dispatch(hideLoading())
      console.log('Erreur lors de la suppression :', error)
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || 'Failed to delete demande'
      )
    }
  }
)
export const updateDemande = createAsyncThunk(
  'demande/updateDemande',
  async (updatedData, thunkAPI) => {
    let url = `/api/demandes/update?id=${updatedData.id}`
    console.log(updatedData)
    thunkAPI.dispatch(showLoading())
    try {
      const resp = await customFetch.put(url, updatedData, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      if (thunkAPI.getState().user.user.roles.includes('USER')) {
        thunkAPI.dispatch(importDemandes())
      } else {
        thunkAPI.dispatch(importAllDemandes())
      }
      toast.success('modification avec succés')
      return resp.data
    } catch (error) {
      thunkAPI.dispatch(hideLoading())
      console.log('Erreur lors de la modification :', error)
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || 'Failed to update demande'
      )
    }
  }
)
export const createDemande = createAsyncThunk(
  'incident/createDemande',
  async (data, thunkAPI) => {
    let url = `/api/demandes/save?id=${thunkAPI.getState().user.user.userId}`
    // thunkAPI.dispatch(showLoading())
    try {
      const resp = await customFetch.post(url, data, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })

      thunkAPI.dispatch(importDemandes())
      toast.success('ajout avec succés')
      return resp.data
    } catch (error) {
      // thunkAPI.dispatch(hideLoading());
      console.log('Erreur lors de la création:', error)
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || 'Failed to create Demande'
      )
    }
  }
)

const demandeSlice = createSlice({
  name: 'demande',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteDemande.rejected, (state, { payload }) => {
        console.log('Échec de la suppression :', payload)
        toast.error(payload)
      })
      .addCase(createDemande.fulfilled, (state, action) => {
        state.incident = action.payload
        console.log('added')
      })
      .addCase(createDemande.rejected, (state, action) => {
        console.log("Échec de l'ajout :", action)
      })
  },
})

export default demandeSlice.reducer
