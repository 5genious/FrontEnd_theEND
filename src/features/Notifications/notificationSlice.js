import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'

const initialState = {
  isLoading: false,
  notificationCount: 0,
  notifications: [],
  error: null,
}
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, thunkAPI) => {
    let url = `/api/notifications/recipient/${
      thunkAPI.getState().user.user.userId
    }`
    try {
      const response = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      await thunkAPI.dispatch(
        countNotifications(thunkAPI.getState().user.user.userId)
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg ||
          'Erreur lors de la récupération des notifications'
      )
    }
  }
)
export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (notificationId, thunkAPI) => {
    const url = `/api/notifications/${notificationId}`
    try {
      await customFetch.delete(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      await thunkAPI.dispatch(
        fetchNotifications(thunkAPI.getState().user.user.userId)
      )
      return notificationId
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg ||
          'Erreur lors de la suppression de la notification'
      )
    }
  }
)

export const countNotifications = createAsyncThunk(
  'notifications/countNotifications',
  async (_, thunkAPI) => {
    let url = `/api/notifications/recipient/${
      thunkAPI.getState().user.user.userId
    }/count`

    try {
      const response = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg ||
          'Erreur lors de la récupération du nombre de notifications'
      )
    }
  }
)

export const markNotificationAsSeen = createAsyncThunk(
  'notifications/markNotificationAsSeen',
  async (notificationId, thunkAPI) => {
    let url = `/api/notifications/${notificationId}/markAsSeen`
    try {
      const response = await customFetch.put(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      console.log('a éte supprimé')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg ||
          'Erreur lors de la modification de la notification'
      )
    }
  }
)

export const createNotification = createAsyncThunk(
  'incident/createNotification',
  async (data, thunkAPI) => {
    let url = `/api/notifications`
    console.log(data)
    try {
      const resp = await customFetch.post(url, data, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      return resp.data
    } catch (error) {
      // thunkAPI.dispatch(hideLoading());
      console.log('Erreur lors de la création:', error)
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || 'Failed to create notification'
      )
    }
  }
)

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createNotification.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchNotifications.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.notifications = payload // Mise à jour de l'état avec les notifications
      })
      .addCase(fetchNotifications.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload // Gestion de l'erreur en cas d'échec
        toast.error(payload)
      })
      .addCase(createNotification.fulfilled, (state, { payload }) => {
        state.isLoading = false
      })

      .addCase(createNotification.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
      .addCase(countNotifications.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.notificationCount = payload
      })
      .addCase(countNotifications.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
        toast.error(payload)
      })
  },
})

export default notificationSlice.reducer
