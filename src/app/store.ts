import { configureStore } from '@reduxjs/toolkit'
import { fileTreeSlice } from './features/fileTreeSlice'

const store = configureStore({
  reducer: {
    tree: fileTreeSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store