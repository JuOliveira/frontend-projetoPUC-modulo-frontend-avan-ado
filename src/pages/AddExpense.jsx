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

    console.log('values', values)

    const monthBudgets = budgetData.filter((data) => data.month === (dayjs(values.date).month() + 1) && data.year === dayjs(values.date).year())
    console.log('monthBudgets', monthBudgets)
    const expenseBudget = monthBudgets.filter((item) => item.name === values.category)

    console.log('expenseBudget', expenseBudget)

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
        label: <span><IconSelector svg={category.icon} classname="option-icon"/>{category.name}</span>,
        icon: category.icon,
      }

      options.push(option)
    })

    setCategoriesOptions(options)
  },[categories])

  return (
    <div className="tempContainer">
      <Grid container spacing={2.4}>
        <Grid size={12}>
          <HeaderContainer title="Adicionar Despesa">
            <CustomButton text="Voltar" onClickFunction={() => navigate(-1)}/>
          </HeaderContainer>
        </Grid>
        <Grid size={12}>
          <p>Nova Despesa</p>
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
              isSubmitting,
              setFieldValue,

            }) => (
              <form onSubmit={handleSubmit}>
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
                  handleChange={handleChange}
                  label="Categoria"
                  options={categoryOptions}
                  placeholder="Selecione a categoria"
                />
                <CustomButton text="Adicionar" disabled={isSubmitting} type='submit'/>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
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

export default AddExpense