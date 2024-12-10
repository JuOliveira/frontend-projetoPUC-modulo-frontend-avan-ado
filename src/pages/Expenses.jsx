import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid2'
import dayjs from 'dayjs'

import HeaderContainer from "../components/HeaderContainer"
import CustomButton from "../components/CustomButton"
import CustomDatePicker from '../components/CustomDatePicker'
import CustomTable from '../components/CustomTable'
import IconSelector from '../components/IconSelector'
import ModalContainer from '../components/ModalContainer'
import { deleteExpense } from '../features/expenses/expensesSlice'
import { editBudget } from '../features/budgets/budgetsSlice'

function Expenses() {
  const [monthExpenseData, setMonthExpenseData] = useState(null)
  const [dateValue, setDateValue] = useState(dayjs())
  const [confirmModal, setConfirmModal] = useState({open: false, id: null})
  const [resultModal, setResultModal] = useState(false)
  const [error, setError] = useState(false)
  const expenseData = useSelector((state) => state.expenses.data)
  const budgetData = useSelector ((state) => state.budgets.data)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    handleCloseConfirmModal()

    const expenseDeleted = monthExpenseData.filter((item) => item.id === id)
    const monthBudgets = budgetData.filter((data) => data.month === (dayjs(dateValue).month() + 1) && data.year === dayjs(dateValue).year())
    const expenseBudget = monthBudgets.filter((item) => item.name === expenseDeleted[0].category)

    dispatch(editBudget({
      id: expenseBudget[0].id,
      item: {
        usedValue: expenseBudget[0].usedValue - expenseDeleted[0].value
      }
    }))
    

    dispatch(deleteExpense(id))

    //if an error occurs in the operation here the result Modal would show an error
    //setError(true)
    setResultModal(true)
  }

  const handleOpenConfirmModal = (id) => {
    setConfirmModal({open: true, id: id})
  }

  const handleCloseConfirmModal = () => {
    setConfirmModal({open: false})
  }

  const handleCloseResultModal = () => {
    setResultModal(false)
    setError(false)
  }
  
  const renderDeleteBtn = (params) => {
    return (
      <CustomButton text="Excluir" onClickFunction={() => handleOpenConfirmModal(params.row.id)}/>
    )
  }

  const renderCategoryCell = (params) => {
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
      const monthData = expenseData.filter((data) => data.month === (dayjs(dateValue).month() + 1) && data.year === dayjs(dateValue).year())
      setMonthExpenseData(monthData)
  }, [dateValue, expenseData])
  
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
            rows={monthExpenseData} 
            columns={columns}
            rowSelection={false}
            hideFooter={false}
            initialSorting={[{field: 'date', sort: 'asc'}]}
          />
        </Grid>
      </Grid>
      <ModalContainer
        open={confirmModal.open}
        handleClose={handleCloseConfirmModal}
        title="Excluir Despesa?"
        icon="ErrorCircleRounded"
      >
        <div>
          <p>Tem certeza que deseja excluir a despesa? Esta operação não pode ser revertida</p>
          <CustomButton text="Excluir" onClickFunction={() => handleDelete(confirmModal.id)}/>
          <CustomButton text="Cancelar" onClickFunction={handleCloseConfirmModal}/>
        </div>
      </ModalContainer>
      <ModalContainer
        open={resultModal}
        handleClose={handleCloseResultModal}
        title={error ? "Ocorreu um erro e a operação não pôde ser realizada" : "Operação realizada com sucesso!"}
        icon={error ? "Cancel" : "CheckCircle"}
      >
        <CustomButton text="OK" onClickFunction={handleCloseResultModal}/>
      </ModalContainer>
    </div>
  )
}

export default Expenses