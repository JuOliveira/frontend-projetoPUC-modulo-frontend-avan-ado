import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid2'
import dayjs from 'dayjs'

import HeaderContainer from "../components/HeaderContainer"
import CustomButton from "../components/CustomButton"
import CustomDatePicker from '../components/CustomDatePicker'
import CustomTable from '../components/CustomTable'
import data from '../data/expensesData.json'
import IconSelector from '../components/IconSelector'

function Expenses() {
  const [expenseData, setExpenseData] = useState(null)
  const [dateValue, setDateValue] = useState(dayjs())
  const navigate = useNavigate()

  const deleteExpense = (id) => {
    const filteredExpenses = expenseData.filter((expense) => expense.id !== id)

    setExpenseData(filteredExpenses)
  }
  
  const renderDeleteBtn = (params) => {
    return (
      <CustomButton text="Excluir" onClickFunction={() => deleteExpense(params.row.id)}/>
    )
  }

  const renderCategoryCell = (params) => {
    //console.log("params", params)
    return (
      <div>
        <IconSelector svg={params.row.icon} classname="iconTable"/>
        {params.row.category}
      </div>
    )
  }

  const columns = [
    { field: 'date', 
      headerName: 'Data',
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Despesa',
      flex: 1
    },
    {
      field: 'value',
      headerName: 'Valor',
      flex: 1
    },
    {
      field: 'category',
      headerName: 'Categoria',
      renderCell: renderCategoryCell,
      flex: 1
    },
    {
      field: 'delete',
      headerName: '',
      renderCell: renderDeleteBtn,
      flex: 1
    }
  ];

  useEffect(() => {
    const monthData = data.expenses.filter((data) => data.month === (dayjs(dateValue).month() + 1) && data.year === dayjs(dateValue).year())
    setExpenseData(monthData)
  }, [dateValue])
  
  return (
    <div className="tempContainer">
      <Grid container spacing={2.4}>
        <Grid size={12}>
          <HeaderContainer title="Despesas">
            <CustomDatePicker 
              views={['month', 'year']}
              value={dateValue}
              setDateValue={setDateValue}
            />
            <CustomButton text="Nova despesa" onClickFunction={() => navigate('/addexpense')}/>
          </HeaderContainer>
        </Grid>
        <Grid size={12}>
          <CustomTable 
            rows={expenseData} 
            columns={columns}
            rowSelection={false}
            hideFooter={false}
            initialSorting={[{field: 'date', sort: 'asc'}]}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Expenses