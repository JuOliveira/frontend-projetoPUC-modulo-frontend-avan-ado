import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid2'
import dayjs from 'dayjs'

import HeaderContainer from "../components/HeaderContainer"
import CustomButton from "../components/CustomButton"
import CustomDatePicker from "../components/CustomDatePicker"
import BudgetList from '../components/BudgetList'
import data from '../data/budgetData.json'

function Budgets() {
  const navigate = useNavigate()
  const [budgetData, setBudgetData] = useState(null)
  const [dateValue, setDateValue] = useState(dayjs())

  const deleteBudget = (id) => {
    const filteredBudgets = budgetData.filter((data) => data.id !== id)

    setBudgetData(filteredBudgets)
  }

  useEffect(() => {
    const monthData = data.budgets.filter((data) => data.month === (dayjs(dateValue).month() + 1) && data.year === dayjs(dateValue).year())
    setBudgetData(monthData)
  }, [dateValue])

  return (
    <div className="tempContainer">
      <Grid container spacing={2.4}>
        <Grid size={12}>
          <HeaderContainer title="Orçamentos">
            <CustomDatePicker 
              views={['month', 'year']}
              value={dateValue}
              setDateValue={setDateValue}
            />
            <CustomButton 
              text="Novo orçamento"
              onClickFunction={() => navigate('/addbudget')}
            />
          </HeaderContainer>
        </Grid>
        <Grid size={12}>
          <BudgetList
            items={budgetData}
            itemsPerPage={10}
            hasDelBtn={true}
            delFunction={deleteBudget}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Budgets