import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import chatReducer from './chatSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    chat: chatReducer,
  },
})