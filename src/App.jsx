import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material/styles'
import { useDispatch } from 'react-redux'

import Root from './pages/Root'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Budgets from './pages/Budgets'
import AddExpense from './pages/AddExpense'
import AddBudget from './pages/AddBudget'
import expensesDataJSON from './data/expensesData.json'
import budgetsDataJSON from './data/budgetData.json'
import { addExpensesData } from './features/expenses/expensesSlice'
import { addBudgetsData } from './features/budgets/budgetsSlice'
import './styles/style.scss'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(addExpensesData(expensesDataJSON.expenses))
    dispatch(addBudgetsData(budgetsDataJSON.budgets))
  },[dispatch])

  return (
    <StyledEngineProvider injectFirst>
      <Routes>
        <Route path='/' element={<Root/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='expenses' element={<Expenses/>} />
          <Route path='budgets' element={<Budgets/>} />
          <Route path='addexpense' element={<AddExpense/>} />
          <Route path='addbudget' element={<AddBudget/>} />
        </Route>
      </Routes>
    </StyledEngineProvider>
  )
}

export default App
