import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid2'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import dayjs from 'dayjs'

import HeaderContainer from "../components/HeaderContainer"
import CustomButton from "../components/CustomButton"
import CustomTextInput from '../components/form/CustomTextInput'
import CustomCurrencyInput from '../components/form/CustomCurrencyInput'
import CustomSelectInput from '../components/form/CustomSelectInput'
import IconSelector from '../components/IconSelector'
import ModalContainer from '../components/ModalContainer'
import { addBudget } from '../features/budgets/budgetsSlice'

function AddBudget() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [categoryIconsOptions, setCategoriesIconsOptions] = useState([])
  const [resultModal, setResultModal] = useState(false)
  const [error, setError] = useState(false)

  const onFormSubmit = (values) => {
    const data = {
      ...values,
      usedValue: 0,
      month: dayjs().month() + 1,
      year: dayjs().year(),
    }

    dispatch(addBudget(data))
    setResultModal(true)
  }

  const handleCloseResultModal = () => {
    setResultModal(false)
    setError(false)
    navigate('/budgets')
  }

  useEffect(() => {
    let options = []
    Array.from({length: 22}, (_, index) => {
      const option = {
        id: index,
        value: "CategoryIcon"+`${index}`,
        label: <IconSelector svg={"CategoryIcon"+`${index}`} classname="icon-option"/>
      }

      options.push(option)
    })
    setCategoriesIconsOptions(options)
  },[])

  return (
    <div className="tempContainer">
      <Grid container spacing={2.4}>
        <Grid size={12}>
          <HeaderContainer title="Adicionar orçamento">
            <CustomButton text="Voltar" onClickFunction={() => navigate(-1)}/>
          </HeaderContainer>
        </Grid>
        <Grid size={12}>
          <p>Novo orçamento</p>
          <Formik
            initialValues={{
              name: '',
              maxValue: '',
              icon: '',
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
              setFieldValue
            }) => (
              <form onSubmit={handleSubmit}>
                <CustomTextInput
                  name="name"
                  label="Orçamento"
                  hasError={errors.name && touched.name}
                  value={values.name}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <CustomCurrencyInput
                  name="maxValue"
                  value={values.maxValue}
                  label="Valor máximo"
                  handleChange={setFieldValue}
                />
                <CustomSelectInput
                  name="icon"
                  label="Ícone"
                  value={values.icon}
                  placeholder="Selecione um ícone"
                  options={categoryIconsOptions}
                  handleChange={handleChange}
                />
                <CustomButton text="Adicionar" type='submit'/>
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

export default AddBudget