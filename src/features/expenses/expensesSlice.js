import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  data: []
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpensesData: (state, action) => {
      state.data = action.payload
    },
    addExpense: (state, action) => {
      state.data.push({
        id: dayjs().valueOf(),
        ...action.payload,
      })
    },
    deleteExpense: (state, action) => {
      state.data = state.data.filter(expense => expense.id !== action.payload)
    }
  }
})

export const { addExpensesData, addExpense, deleteExpense } = expensesSlice.actions

export default expensesSlice.reducer