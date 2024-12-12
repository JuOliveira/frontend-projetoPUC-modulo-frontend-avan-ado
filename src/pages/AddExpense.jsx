import Grid from '@mui/material/Grid2'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'

import HeaderContainer from "../components/HeaderContainer"
import CustomButton from "../components/CustomButton"
import CustomTextInput from '../components/form/CustomTextInput'
import CustomDatePickerInput from '../components/form/CustomDatePickerInput'
import CustomSelectInput from '../components/form/CustomSelectInput'
import CustomCurrencyInput from '../components/form/CustomCurrencyInput'
import IconSelector from '../components/IconSelector'
import ModalContainer from '../components/ModalContainer'
import Card from '../components/Card'
import { addExpense } from '../features/expenses/expensesSlice'
import { editBudget } from '../features/budgets/budgetsSlice'

function AddExpense() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [categoryOptions, setCategoriesOptions] = useState([])
  const [resultModal, setResultModal] = useState(false)
  const [error, setError] = useState(false)
  const categories = useSelector((state) => state.budgets.data)
  const budgetData = useSelector ((state) => state.budgets.data)

  const onFormSubmit = (values) => {
    const categoryIcon = categoryOptions.filter(option => option.value === values.category)

    const monthBudgets = budgetData.filter((data) => data.month === (dayjs(values.date).month() + 1) && data.year === dayjs(values.date).year())
    const expenseBudget = monthBudgets.filter((item) => item.name === values.category)

    dispatch(editBudget({
      id: expenseBudget[0].id,
      item: {
        usedValue: expenseBudget[0].usedValue + values.value
      }
    }))


    const data = {
      ...values,
      date: dayjs(values.date).format('YYYY-MM-DD'),
      month: dayjs(values.date).month() + 1,
      year: dayjs(values.date).year(),
      icon: categoryIcon[0].icon,
    }

    dispatch(addExpense(data))
    setResultModal(true)
  }

  const handleCloseResultModal = () => {
    setResultModal(false)
    setError(false)
    navigate('/expenses')
  }

  useEffect(() => {
    const monthData = categories.filter((data) => data.month === (dayjs().month() + 1) && data.year === dayjs().year())
    let options = []
    monthData.forEach((category) => {
      const option = {
        id: category.id,
        value: category.name,
        label: <span className="select-option"><IconSelector svg={category.icon} classname="option-icon"/>{category.name}</span>,
        icon: category.icon,
      }

      options.push(option)
    })

    setCategoriesOptions(options)
  },[categories])

  return (
    <div className="content-container">
      <Grid container rowSpacing={2} columnSpacing={3}>
        <Grid size={12}>
          <HeaderContainer title="Adicionar Despesa" hasBackButton={true}/>
        </Grid>
        <Grid size={12}>
          <Card
            cardClassname="card-container card-full card-center-align"
          >
            <h2>Nova Despesa</h2>
            <Formik
              initialValues={{
                name: '',
                date: dayjs(),
                value: '',
                category: '',
              }}
              onSubmit={(values) => onFormSubmit(values)}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,

              }) => (
                <form onSubmit={handleSubmit} className="form-container">
                  <CustomTextInput
                    name="name"
                    isRequired={true}
                    hasError={errors.name && touched.name}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    label="Despesa"
                    value={values.name}
                    placeholder="Digite o nome da despesa"
                    validationMsg={errors.name}
                  />
                  <CustomDatePickerInput
                    name="date"
                    label="Data"
                    views={['day','month', 'year']}
                    value={values.date}
                    handleChange={handleChange}
                  />
                  <CustomCurrencyInput
                    name="value"
                    label="Valor da Despesa"
                    isRequired={true}
                    value={values.value}
                    handleChange={setFieldValue}
                  />
                  <CustomSelectInput
                    name="category"
                    value={values.category}
                    isRequired={true}
                    handleChange={handleChange}
                    label="Categoria"
                    options={categoryOptions}
                    placeholder="Selecione a categoria"
                  />
                  <CustomButton 
                    text="Adicionar" 
                    type='submit'
                    btnClassname="button-primary button-primary--medium button-align-center"
                  />
                </form>
              )}
            </Formik>
          </Card>
        </Grid>
      </Grid>
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

export default AddExpense