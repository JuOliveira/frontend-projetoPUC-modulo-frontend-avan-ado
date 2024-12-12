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
import Card from '../components/Card'
import { deleteExpense } from '../features/expenses/expensesSlice'
import { editBudget } from '../features/budgets/budgetsSlice'
import { formatTableData } from '../utils/dataFormatters'

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
      <CustomButton 
        text={<span className="button-text"><IconSelector svg="DeleteForever" classname="button-icon"/>Excluir</span>}
        type="button"
        btnClassname="button-primary button-primary--small"
        onClickFunction={() => handleOpenConfirmModal(params.row.id)}
      />
    )
  }

  const renderCategoryCell = (params) => {
    return (
      <div className="table-categoryCell-container">
        <IconSelector svg={params.row.icon} classname="table-category-icon"/>
        {params.row.category}
      </div>
    )
  }

  const columns = [
    { field: 'date', 
      headerName: 'Data',
      headerClassName: 'table-header',
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Despesa',
      headerClassName: 'table-header',
      flex: 1
    },
    {
      field: 'value',
      headerName: 'Valor',
      headerClassName: 'table-header',
      flex: 1
    },
    {
      field: 'category',
      headerName: 'Categoria',
      headerClassName: 'table-header',
      renderCell: renderCategoryCell,
      flex: 1
    },
    {
      field: 'delete',
      headerName: '',
      headerClassName: 'table-header',
      sortable: false,
      renderCell: renderDeleteBtn,
      flex: 1
    }
  ];

  useEffect(() => {
      const monthData = expenseData.filter((data) => data.month === (dayjs(dateValue).month() + 1) && data.year === dayjs(dateValue).year())
      setMonthExpenseData(monthData)
  }, [dateValue, expenseData])
  
  return (
    <div className="content-container">
      <Grid container rowSpacing={2} columnSpacing={3}>
        <Grid size={12}>
          <HeaderContainer title="Despesas" hasBackButton={false}>
            <div className="header-buttons-container">
              <CustomDatePicker 
                views={['month', 'year']}
                value={dateValue}
                setDateValue={setDateValue}
              />
              <CustomButton 
                text={<span className="button-text"><IconSelector svg="AddCard" classname="button-icon"/>Nova Despesa</span>}
                type="button"
                btnClassname="button-primary button-primary--small"
                onClickFunction={() => navigate('/addexpense')}
              />
            </div>
          </HeaderContainer>
        </Grid>
        <Grid size={12}>
          <Card
            cardClassname="card-container card-full"
          >
            <CustomTable 
              rows={formatTableData(monthExpenseData)} 
              columns={columns}
              rowSelection={false}
              hideFooter={false}
              initialSorting={[{field: 'date', sort: 'desc'}]}
              initialPageSize={10}
            />
          </Card>
        </Grid>
      </Grid>
      <ModalContainer
        open={confirmModal.open}
        handleClose={handleCloseConfirmModal}
        title="Excluir Despesa?"
        icon="ErrorCircleRounded"
      >
        <p className="modal-text">Tem certeza que deseja excluir a despesa? Esta operação não pode ser revertida</p>
        <div className="modal-btns-container">
          <CustomButton 
            text="Excluir"
            type="button"
            onClickFunction={() => handleDelete(confirmModal.id)} 
            btnClassname="button-primary button-primary--small button-primary--fullWidth"
          />
          <CustomButton 
            text="Cancelar"
            type="button"
            onClickFunction={handleCloseConfirmModal}
            btnClassname="button-secondary button-secondary--small button-secondary--fullWidth button-margin-top"
          />
        </div>
      </ModalContainer>
      <ModalContainer
        open={resultModal}
        handleClose={handleCloseResultModal}
        title={error ? "Ocorreu um erro e a operação não pôde ser realizada" : "Operação realizada com sucesso!"}
        icon={error ? "Cancel" : "CheckCircle"}
      >
        <div className="modal-btns-container">
          <CustomButton 
            text="OK"
            type="button"
            onClickFunction={handleCloseResultModal}
            btnClassname="button-primary button-primary--small button-primary--fullWidth button-marginTop"
          />
        </div>
      </ModalContainer>
    </div>
  )
}

export default Expenses