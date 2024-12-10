import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid2'
import dayjs from 'dayjs'

import HeaderContainer from "../components/HeaderContainer"
import CustomButton from "../components/CustomButton"
import CustomDatePicker from "../components/CustomDatePicker"
import BudgetList from '../components/BudgetList'
import ModalContainer from '../components/ModalContainer'
import { deleteBudget } from '../features/budgets/budgetsSlice'
import { deleteExpense } from '../features/expenses/expensesSlice'

function Budgets() {
  const navigate = useNavigate()
  const [monthBudgetData, setMonthBudgetData] = useState(null)
  const [confirmModal, setConfirmModal] = useState({open: false, id: null})
  const [resultModal, setResultModal] = useState(false)
  const [error, setError] = useState(false)
  const [dateValue, setDateValue] = useState(dayjs())
  const budgetsData = useSelector((state) => state.budgets.data)
  const expensesData = useSelector((state) => state.expenses.data)
  const dispatch = useDispatch()

  const handleDeleteBudget = (id) => {
    handleCloseConfirmModal()

    const budgetDeleted = monthBudgetData.filter((item) => item.id === id)
    const monthExpenses = expensesData.filter((data) => data.month === (dayjs(dateValue).month() + 1) && data.year === dayjs(dateValue).year())
    const budgetExpenses = monthExpenses.filter((item) =>item.category === budgetDeleted[0].name)

    budgetExpenses.forEach((item) => {
      dispatch(deleteExpense(item.id))
    })

    dispatch(deleteBudget(id))

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
  

  useEffect(() => {
    const monthData = budgetsData.filter((data) => data.month === (dayjs(dateValue).month() + 1) && data.year === dayjs(dateValue).year())
    setMonthBudgetData(monthData)
  }, [dateValue, budgetsData])

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
            items={monthBudgetData}
            itemsPerPage={10}
            hasDelBtn={true}
            delFunction={handleOpenConfirmModal}
          />
        </Grid>
      </Grid>
      <ModalContainer
        open={confirmModal.open}
        handleClose={handleCloseConfirmModal}
        title="Excluir Orçamento?"
        icon="ErrorCircleRounded"
      >
        <div>
          <p>Tem certeza que deseja excluir o orçamento? Esta operação não pode ser revertida. Atenção: todas as despesas associadas a este orçamento
            também serão excluídas!
          </p>
          <CustomButton text="Excluir" onClickFunction={() => handleDeleteBudget(confirmModal.id)}/>
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

export default Budgets