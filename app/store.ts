import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import backendReducer from '../features/backend/backendSlice'

export function makeStore() {
    return configureStore({
        reducer: {
            auth: authReducer,
            backend: backendReducer,
        },
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store