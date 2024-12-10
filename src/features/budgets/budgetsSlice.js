import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  data: []
}

const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    addBudgetsData: (state, action) => {
      state.data = action.payload
    },
    addBudget: (state, action) => {
      state.data.push({
        id: dayjs().valueOf(),
        ...action.payload,
      })
    },
    editBudget: (state, action) =>{
      const { id, item } = action.payload
      const indexToChange = state.data.findIndex(item => item.id === id)
      
      state.data[indexToChange] = {
        ...state.data[indexToChange],
        ...item
      }
    },
    deleteBudget: (state, action) => {
      state.data = state.data.filter(budget => budget.id !== action.payload)
    }
  }
})

export const { addBudgetsData, addBudget, deleteBudget, editBudget } = budgetsSlice.actions

export default budgetsSlice.reducer