import { configureStore } from '@reduxjs/toolkit'
import { fileTreeSlice } from './features/fileTreeSlice'
import { chatMessageSlice } from './features/ChatMessage'

const store = configureStore({
  reducer: {
    tree: fileTreeSlice.reducer,
    chat: chatMessageSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store