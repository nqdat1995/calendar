import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Calendar {
  now: Date,
  currDate: number,
  currMonth: number,
  currYear: number
};

const now = new Date();

const initialState: Calendar = {
  now: now,
  currDate: now.getDate(),
  currMonth: now.getMonth(),
  currYear: now.getFullYear()
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    updateDate: (state, action: PayloadAction<number>) => {
      state.currDate = action.payload;
    },
    updateMonth: (state, action: PayloadAction<number>) => {
      state.currMonth = action.payload;
    },
    updateYear: (state, action: PayloadAction<number>) => {
      state.currYear = action.payload;
    }
  }
})

export const { updateDate, updateMonth, updateYear } = calendarSlice.actions

export default calendarSlice.reducer