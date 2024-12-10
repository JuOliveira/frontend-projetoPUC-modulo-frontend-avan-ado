import { configureStore } from "@reduxjs/toolkit"

import expensesReducer from './features/expenses/expensesSlice'
import budgetsReducer from './features/budgets/budgetsSlice'

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    budgets: budgetsReducer,
  },
})

export default store