import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ICredentials } from '@/types/api.types'
import type { TRootState } from '@/store/store.types'
import { loadFromStorage } from '@/utils/storage'

interface IAuthState {
  credentials: ICredentials | null
}

const initialState: IAuthState = {
  credentials: loadFromStorage<ICredentials>('credentials') ?? null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn(state, action: PayloadAction<ICredentials>) {
      state.credentials = action.payload
    },
    loggedOut(state) {
      state.credentials = null
    },
  },
})

export const { loggedIn, loggedOut } = authSlice.actions

export const selectCredentials = (state: TRootState) => state.auth.credentials

export default authSlice.reducer
