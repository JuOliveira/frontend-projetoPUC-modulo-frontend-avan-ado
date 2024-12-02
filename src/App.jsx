import { Routes, Route } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material/styles'
import Root from './pages/Root'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Budgets from './pages/Budgets'
import AddExpense from './pages/AddExpense'
import AddBudget from './pages/AddBudget'
import './styles/style.scss'

function App() {  
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
