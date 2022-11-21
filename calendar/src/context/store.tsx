import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../context/features/todo/todoSlice'
import calendarReducer from '../context/features/calendar/calendarSlice'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    calendar: calendarReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch