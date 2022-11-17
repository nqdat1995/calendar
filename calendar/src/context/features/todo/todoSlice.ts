import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum TodoStatus {
  Todo,
  Started,
  Processing,
  Complete
}

export interface Todo {
  name: string,
  startDate: Date,
  duration: number,
  status: TodoStatus
}

const initialState: Todo[] = []

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload)
    }
  }
})

export const { add } = todoSlice.actions

export default todoSlice.reducer